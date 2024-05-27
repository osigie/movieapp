


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using movie_app_api.Data;
using movie_app_api.Models;
using movie_app_api.Models.DTO;
using Newtonsoft.Json;

namespace movie_app_api.Services
{

    public class MovieService: IMovieService
{
    private readonly HttpClient _httpClient;
    private readonly MovieContext _context;

    public MovieService(HttpClient httpClient, MovieContext context)
    {
        _httpClient = httpClient;
        _context = context;
    }

    public async Task<Movie?> GetMovieByTitleAsync(string title)
    {    var apiKey = Environment.GetEnvironmentVariable("ApiKey");
        var response = await _httpClient.GetAsync($"http://www.omdbapi.com/?t={title}&apikey={apiKey}");
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();


            var tempResult = JsonConvert.DeserializeObject<dynamic>(content);

            if (tempResult?.Response == "False")
            {
                return null;
            }

            // Save search query
            await SaveQuery(title);


            var movie = JsonConvert.DeserializeObject<Movie>(content);

          
        if (movie == null) {
        return null;
           }
        
        // Check if movie already exists in the database by IMDb ID
        var existingMovie = await _context.Movie
            .Include(m => m.Ratings)
            .FirstOrDefaultAsync(m => m.ImdbID == movie.ImdbID);

        if (existingMovie != null)
        {
            return existingMovie;
        }

 movie.Ratings ??= [];

            var newMovie = new Movie(movie);
            _context.Movie.Add(newMovie);

            foreach (var rating in movie.Ratings)
            {
                rating.MovieId = newMovie.Id;
                _context.Rating.Add(rating);
            }
            await _context.SaveChangesAsync();

            return newMovie;

        }

    public async Task SaveQuery(string title)
    {
        var searchQuery = new SearchQuery { Query = title, Timestamp = DateTime.UtcNow };
        _context.SearchQuery.Add(searchQuery);
        await _context.SaveChangesAsync();
    }

    public async Task<Movie?> GetMovieById(int id)
        {
            var movie = await _context.Movie
                .Include(m => m.Ratings)
                .FirstOrDefaultAsync(m => m.Id == id);

            return movie;

        }

       

        public async Task<ActionResult<IEnumerable<SearchQuery>>> GetSearchQuery()
        {
            return  await _context.SearchQuery
            .OrderByDescending(s => s.Timestamp)
            .Take(5)
            .ToListAsync(); ;

           
        }


        public async Task<PaginatedResult<Movie>> GetMovies(int pageNumber, int pageSize)
        {
    
            
            
            var totalCount = await _context.Movie.CountAsync();

            var movies = await _context.Movie
                .Include(m => m.Ratings)
                .OrderByDescending(s => s.Timestamp)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = new PaginatedResult<Movie>
            {
                Data = movies,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            return result;

        }
    }
}

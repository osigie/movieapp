


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using movie_app_api.Models;
using movie_app_api.Repository;
using Newtonsoft.Json;

namespace movie_app_api.Services
{

    public class MovieService
{
    private readonly HttpClient _httpClient;
    private readonly MovieContext _context;

    public MovieService(HttpClient httpClient, MovieContext context)
    {
        _httpClient = httpClient;
        _context = context;
    }

    public async Task<Movie> GetMovieByTitleAsync(string title)
    {
        var response = await _httpClient.GetAsync($"http://www.omdbapi.com/?t={title}&apikey=be4316de");
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();


            var tempResult = JsonConvert.DeserializeObject<dynamic>(content);

            if (tempResult?.Response == "False")
            {
                return null;
            }


            // Save search query
            var searchQuery = new SearchQuery { Query = title, Timestamp = DateTime.UtcNow };
        _context.SearchQuery.Add(searchQuery);
        await _context.SaveChangesAsync();


        

            var movie = JsonConvert.DeserializeObject<Movie>(content);

          

            var newMovie = new Movie(movie);
            _context.Movie.Add(newMovie);

            foreach (var rating in movie.Ratings)
            {
                rating.MovieId = newMovie.Id;
                _context.Rating.Add(rating);
            }
            await _context.SaveChangesAsync();

            return movie;

        }

        public async Task<Movie> GetMovieById(int id)
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


        public async Task<ActionResult<IEnumerable<Movie>>> GetLastFiveMovies()
        {
            return await _context.Movie
                .Include( m => m.Ratings)
            .OrderByDescending(s => s.Timestamp)
            .Take(5)
            .ToListAsync(); ;

        }
    }
}

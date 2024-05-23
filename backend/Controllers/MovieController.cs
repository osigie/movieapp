using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using movie_app_api.Models;
using movie_app_api.Services;


[ApiController]
[Route("[controller]")]
public class MoviesController : ControllerBase
{
    private readonly MovieService _movieService;

    public MoviesController(MovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet("search")]
    public async Task<ActionResult<Movie>> GetMovie([FromQuery] string title)
    {
        var movie = await _movieService.GetMovieByTitleAsync(title);
          if (movie == null)
        {
            return NotFound();
        }
        return CreatedAtAction(nameof(GetMovieById), new { id = movie.Id }, movie);

    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Movie>> GetMovieById(int id)
    {
        var movie = await _movieService.GetMovieById(id);

        if (movie == null)
        {
            return NotFound();
        }
        return Ok(movie);
    }

    [HttpGet("recent-query")]
    public async Task<ActionResult<IEnumerable<SearchQuery>>> GetRecentSearches()
    {
        var searchQuery = await _movieService.GetSearchQuery();
        return Ok(searchQuery);

    }

    [HttpGet("search-movies")]
    public async Task<ActionResult<IEnumerable<Movie>>> GetSearchMovies()
    {
        var movies = await _movieService.GetLastFiveMovies();
        return Ok(movies);

    }
}

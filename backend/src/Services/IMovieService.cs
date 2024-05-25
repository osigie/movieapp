using Microsoft.AspNetCore.Mvc;
using movie_app_api.Models;

namespace movie_app_api.Services;

public interface IMovieService
{
    Task<Movie?> GetMovieByTitleAsync(string title);
    Task<Movie?> GetMovieById(int id);
    Task<ActionResult<IEnumerable<SearchQuery>>> GetSearchQuery();
    Task<ActionResult<IEnumerable<Movie>>> GetLastFiveMovies();

    Task SaveQuery(string title);
}

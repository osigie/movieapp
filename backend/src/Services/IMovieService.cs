using Microsoft.AspNetCore.Mvc;
using movie_app_api.Models;
using movie_app_api.Models.DTO;

namespace movie_app_api.Services;

public interface IMovieService
{
    Task<Movie?> GetMovieByTitleAsync(string title);
    Task<Movie?> GetMovieById(int id);
    Task<ActionResult<IEnumerable<SearchQuery>>> GetSearchQuery();
    Task<PaginatedResult<Movie>> GetMovies(int pageNumber, int pageSize);

    Task SaveQuery(string title);
}

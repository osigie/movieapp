using movie_app_api.Controllers;

namespace Movie.Api.Tests;

using Microsoft.AspNetCore.Mvc;
using Moq;
using movie_app_api.Models;
using movie_app_api.Services;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;

public class MoviesControllerTests
{
    private readonly Mock<IMovieService> _movieServiceMock;
    private readonly MoviesController _controller;

    public MoviesControllerTests()
    {
        _movieServiceMock = new Mock<IMovieService>();
        _controller = new MoviesController(_movieServiceMock.Object);
    }

    [Fact]
    public async Task GetMovie_ReturnsCreatedAtAction_WhenMovieFound()
    {
        // Arrange
        var movieTitle = "Inception";
        var movie = new Movie { Id = 1, Title = movieTitle };
        _movieServiceMock.Setup(service => service.GetMovieByTitleAsync(movieTitle))
            .ReturnsAsync(movie);

        // Act
        var result = await _controller.GetMovie(movieTitle);
        

        // Assert
        var actionResult = result.Result as CreatedAtActionResult;
        actionResult.Should().NotBeNull();
        actionResult.Value.Should().Be(movie);
        actionResult.ActionName.Should().Be(nameof(MoviesController.GetMovieById));
        actionResult.RouteValues["id"].Should().Be(movie.Id);
    }

    [Fact]
    public async Task GetMovie_ReturnsNotFound_WhenMovieNotFound()
    {
        // Arrange
        var movieTitle = "NonExistentMovie";
        _movieServiceMock.Setup(service => service.GetMovieByTitleAsync(movieTitle))
            .ReturnsAsync((Movie)null);

        // Act
        var result = await _controller.GetMovie(movieTitle);

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task GetMovieById_ReturnsOk_WhenMovieFound()
    {
        // Arrange
        var movieId = 1;
        var movie = new Movie { Id = movieId, Title = "Inception" };
        _movieServiceMock.Setup(service => service.GetMovieById(movieId))
            .ReturnsAsync(movie);

        // Act
        var result = await _controller.GetMovieById(movieId);

        // Assert
        var actionResult = result.Result as OkObjectResult;
        actionResult.Should().NotBeNull();
        actionResult.Value.Should().Be(movie);
    }

    [Fact]
    public async Task GetMovieById_ReturnsNotFound_WhenMovieNotFound()
    {
        // Arrange
        var movieId = 1;
        _movieServiceMock.Setup(service => service.GetMovieById(movieId))
            .ReturnsAsync((Movie)null);

        // Act
        var result = await _controller.GetMovieById(movieId);

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task GetRecentSearches_ReturnsOk_WithRecentSearches()
    {
        // Arrange
      
        _movieServiceMock.Setup(service => service.SaveQuery("Inception"));

        // Act
        var result = await _controller.GetRecentSearches();

        // Assert
        var actionResult = result.Result as OkObjectResult;
        actionResult.Should().NotBeNull();
    }

    [Fact]
    public async Task GetSearchMovies_ReturnsOk_WithRecentMovies()
    {
        // Arrange
        
        var movieTitle = "Inception";
        var movie = new Movie { Id = 1, Title = movieTitle };
        _movieServiceMock.Setup(service => service.GetMovieByTitleAsync(movieTitle))
            .ReturnsAsync(movie);

        // Act
        var result = await _controller.GetSearchMovies(1,1);

        // Assert
        var actionResult = result.Result as OkObjectResult;
        actionResult.Should().NotBeNull();
    }
}
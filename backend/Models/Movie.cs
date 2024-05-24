using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace movie_app_api.Models
{
    public class Movie
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? Year { get; set; }

        public string? Rated { get; set; }

        public string? Released { get; set; }

        public string? Runtime { get; set; }

        public string? Genre { get; set; }

        public string? Director { get; set; }

        public string? Writer { get; set; }

        public string? Actors { get; set; }

        public string? Plot { get; set; }

        public string? Language { get; set; }

        public string? Country { get; set; }

        public string? Awards { get; set; }

        public string? Poster { get; set; }

        public ICollection<Rating>? Ratings { get; set; } = new List<Rating>();

        public string? Metascore { get; set; }

        public string? ImdbRating { get; set; }

        public string? ImdbVotes { get; set; }

        public string? ImdbID { get; set; }

        public string? Type { get; set; }

        public string? DVD { get; set; }

        public string? BoxOffice { get; set; }

        public string? Production { get; set; }

        public string? Website { get; set; }

       
        public string? Response { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;





        public Movie(Movie movie)
        {
            Title = movie.Title;
            Year = movie.Year;
            Rated = movie.Rated;
            Released = movie.Released;
            Runtime = movie.Runtime;
            Genre = movie.Genre;
            Director = movie.Director;
            Writer = movie.Writer;
            Actors = movie.Actors;
            Plot = movie.Plot;
            Language = movie.Language;
            Country = movie.Country;
            Awards = movie.Awards;
            Poster = movie.Poster;
            Ratings = movie.Ratings != null ? new List<Rating>(movie.Ratings) : null;
            Metascore = movie.Metascore;
            ImdbRating = movie.ImdbRating;
            ImdbVotes = movie.ImdbVotes;
            ImdbID = movie.ImdbID;
            Type = movie.Type;
            DVD = movie.DVD;
            BoxOffice = movie.BoxOffice;
            Production = movie.Production;
            Website = movie.Website;
            Response = movie.Response;
            Timestamp = movie.Timestamp;
        }

        public Movie() { }

    }

   
}

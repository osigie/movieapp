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





        public Movie(Movie other)
        {
            Title = other.Title;
            Year = other.Year;
            Rated = other.Rated;
            Released = other.Released;
            Runtime = other.Runtime;
            Genre = other.Genre;
            Director = other.Director;
            Writer = other.Writer;
            Actors = other.Actors;
            Plot = other.Plot;
            Language = other.Language;
            Country = other.Country;
            Awards = other.Awards;
            Poster = other.Poster;
            Ratings = other.Ratings != null ? new List<Rating>(other.Ratings) : null;
            Metascore = other.Metascore;
            ImdbRating = other.ImdbRating;
            ImdbVotes = other.ImdbVotes;
            ImdbID = other.ImdbID;
            Type = other.Type;
            DVD = other.DVD;
            BoxOffice = other.BoxOffice;
            Production = other.Production;
            Website = other.Website;
            Response = other.Response;
            Timestamp = other.Timestamp;
        }

        public Movie() { }

    }

   
}

﻿namespace movie_app_api.Models
{
    public class SearchQuery
    {

        public int Id { get; set; }
        public required string Query { get; set; }
        public DateTime Timestamp { get; set; }
    }
}

using Newtonsoft.Json;

namespace movie_app_api.Models
{
    public class Rating
    {

        public int Id { get; set; }
        public string Source { get; set; }

        public string Value { get; set; }

        public int MovieId { get; set; }

    }
}

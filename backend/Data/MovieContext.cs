
using Microsoft.EntityFrameworkCore;
using movie_app_api.Models;

namespace movie_app_api.Repository
{
    public class MovieContext : DbContext
    {
        public MovieContext(DbContextOptions<MovieContext> options) : base(options)
        {
        }

        public DbSet<SearchQuery> SearchQuery { get; set; }
        public DbSet<Movie> Movie { get; set; }

        public DbSet<Rating> Rating { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>()
                .HasMany(e => e.Ratings)
                .WithOne()
                .HasForeignKey(e => e.MovieId)
                .IsRequired();

            base.OnModelCreating(modelBuilder);
        }

    }
}

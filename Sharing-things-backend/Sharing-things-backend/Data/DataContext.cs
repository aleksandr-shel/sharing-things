using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Sharing_things_backend.Domain;

namespace Sharing_things_backend.Data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Video> Videos { get; set; }
        public DbSet<UserFavorite> UserFavorites { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserFavorite>(x => x.HasKey( uf => new {uf.AppUserId, uf.VideoId}));
            builder.Entity<UserFavorite>()
                .HasOne(x => x.User)
                .WithMany(x => x.Favorites)
                .HasForeignKey(uf => uf.AppUserId);
            builder.Entity<UserFavorite>()
                .HasOne(x => x.Video)
                .WithMany(x => x.UsersLiked)
                .HasForeignKey(uf => uf.VideoId);

        }
    }
}

using Microsoft.AspNetCore.Identity;

namespace Sharing_things_backend.Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public ICollection<Video> Videos { get; set; }

        public ICollection<UserFavorite> Favorites { get; set; }

        public ICollection<UserFollowing> Followings { get; set; }
        public ICollection<UserFollowing> Followers { get; set; }
    }
}

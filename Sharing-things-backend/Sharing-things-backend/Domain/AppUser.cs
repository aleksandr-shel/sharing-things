using Microsoft.AspNetCore.Identity;

namespace Sharing_things_backend.Domain
{
    public class AppUser : IdentityUser
    {
        ICollection<Video> Videos { get; set; }
    }
}

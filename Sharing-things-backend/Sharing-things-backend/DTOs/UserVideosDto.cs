using Sharing_things_backend.Domain;

namespace Sharing_things_backend.DTOs
{
    public class UserVideosDto
    {
        public string Email { get; set; }
        public ICollection<Video> Videos { get; set; }
    }
}

using Sharing_things_backend.Domain;

namespace Sharing_things_backend.DTOs
{
    public class VideoDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string VideoUrl { get; set; }
        public ProfileDto Owner { get; set; }
    }
}

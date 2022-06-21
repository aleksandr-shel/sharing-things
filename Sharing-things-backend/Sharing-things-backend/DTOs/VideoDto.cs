using Sharing_things_backend.Domain;

namespace Sharing_things_backend.DTOs
{
    public class VideoDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string VideoUrl { get; set; }
        public string FileKey { get; set; }
        public OwnerDto Owner { get; set; }
    }

    public class OwnerDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
    }
}

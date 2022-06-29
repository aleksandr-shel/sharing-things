using Sharing_things_backend.DTOs;

namespace Sharing_things_backend.DynamoDB_Model
{
    public class Comment
    {
        public string Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Body { get; set; }
        public UserComment Author { get; set; }
    }
}

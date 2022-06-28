using Sharing_things_backend.DTOs;

namespace Sharing_things_backend.DynamoDB_Model
{
    public class Comment
    {
        public string Id { get; set; }
        public long CreatedAt { get; set; } = DateTime.UtcNow.Ticks;
        public string Body { get; set; }
        public UserComment Author { get; set; }
    }
}

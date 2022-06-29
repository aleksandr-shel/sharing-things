using Sharing_things_backend.DynamoDB_Model;

namespace Sharing_things_backend.DTOs
{
    public class CommentDto
    {
        public string VideoId { get; set; }
        public string Body { get; set; }
        //public UserComment Author { get; set; }
    }
}

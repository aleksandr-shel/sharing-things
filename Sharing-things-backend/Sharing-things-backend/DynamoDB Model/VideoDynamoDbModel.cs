using Amazon.DynamoDBv2.DataModel;

namespace Sharing_things_backend.DynamoDB_Model
{
    [DynamoDBTable("sharing-things-comments")]
    public class VideoDynamoDbModel
    {
        [DynamoDBHashKey]
        public string VideoId { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}

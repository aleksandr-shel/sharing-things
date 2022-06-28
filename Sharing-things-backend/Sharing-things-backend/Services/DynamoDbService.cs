using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.Model;
using Sharing_things_backend.DTOs;
using Sharing_things_backend.DynamoDB_Model;

namespace Sharing_things_backend.Services
{
    public class DynamoDbService : IDynamoDbService
    {
        //private readonly IAmazonDynamoDB _dynamoDB;
        private readonly string _tablename;
        private readonly DynamoDBContext _context;

        public DynamoDbService(IAmazonDynamoDB dynamoDB)
        {
            //_dynamoDB = dynamoDB;
            _context = new DynamoDBContext(dynamoDB);
        }

        public async Task<Comment> AddComment(CommentDto commentDto)
        {
            var videoDynamoDb = await _context.LoadAsync<VideoDynamoDbModel>(commentDto.VideoId);
            if (videoDynamoDb == null)
            {
                VideoDynamoDbModel newVideoDynamoDb = new VideoDynamoDbModel
                {
                    VideoId = commentDto.VideoId,
                };
                var comment = new Comment
                {
                    Body = commentDto.Body,
                    Author = commentDto.Author,
                    Id = Guid.NewGuid().ToString(),
                };
                newVideoDynamoDb.Comments.Add(comment);
                await _context.SaveAsync(newVideoDynamoDb);
                return comment;
            } else
            {
                var comment = new Comment
                {
                    Body = commentDto.Body,
                    Author = commentDto.Author,
                    Id = Guid.NewGuid().ToString(),
                };
                videoDynamoDb.Comments.Add(comment);
                await _context.SaveAsync(videoDynamoDb);
                return comment;
            }
        }

        public async Task<VideoDynamoDbModel> GetVideoDynamoDb(string videoId)
        {
            var videoDynamoDb = await _context.LoadAsync<VideoDynamoDbModel>(videoId);
            return videoDynamoDb;
        }

        public async Task<bool> DeleteCommentInVideo(string videoId, string commentId)
        {
            var videoDynamoDb = await _context.LoadAsync<VideoDynamoDbModel>(videoId);

            if (videoDynamoDb == null)
            {
                return false;
            }

            var comment = videoDynamoDb.Comments.FirstOrDefault(c => c.Id == commentId);

            if (comment == null)
            {
                return false;
            }

            videoDynamoDb.Comments.Remove(comment);

            await _context.SaveAsync(videoDynamoDb);

            return true;
        }
    }
}

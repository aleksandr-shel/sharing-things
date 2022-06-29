using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Microsoft.EntityFrameworkCore;
using Sharing_things_backend.Data;
using Sharing_things_backend.DTOs;
using Sharing_things_backend.DynamoDB_Model;
using System.Security.Claims;

namespace Sharing_things_backend.Services
{
    public class DynamoDbService : IDynamoDbService
    {
        //private readonly IAmazonDynamoDB _dynamoDB;
        private readonly DynamoDBContext _context;
        private readonly Table table;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContext;

        public DynamoDbService(IAmazonDynamoDB dynamoDB, DataContext dataContext, IHttpContextAccessor httpContext)
        {
            //_dynamoDB = dynamoDB;
            _context = new DynamoDBContext(dynamoDB);
            table = Table.LoadTable(dynamoDB, "sharing-things-comments");
            _dataContext = dataContext;
            _httpContext = httpContext;
        }

        public async Task<Comment> AddComment(CommentDto commentDto)
        {
            var videoDynamoDb = await _context.LoadAsync<VideoDynamoDbModel>(commentDto.VideoId);
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.Name));
            
            if (user == null) return null;
            
            UserComment userComment = new UserComment
            {
                Username = user.UserName,
                DisplayName = user.DisplayName
            };
            
            if (videoDynamoDb == null)
            {
                VideoDynamoDbModel newVideoDynamoDb = new VideoDynamoDbModel
                {
                    VideoId = commentDto.VideoId,
                };
                var comment = new Comment
                {
                    Body = commentDto.Body,
                    Author = userComment,
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
                    Author = userComment,
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
            if (videoDynamoDb == null)
            {
                return videoDynamoDb;
            }
            videoDynamoDb.Comments = videoDynamoDb.Comments.OrderByDescending(x => x.CreatedAt).ToList();
            return videoDynamoDb;
        }

        public async Task<bool> DeleteCommentInVideo(string videoId, string commentId)
        {
            var videoDynamoDb = await _context.LoadAsync<VideoDynamoDbModel>(videoId);

            if (videoDynamoDb == null)
            {
                return false;
            }

            var comment = videoDynamoDb.Comments
                .FirstOrDefault(c => c.Id == commentId);

            if (comment == null)
            {
                return false;
            }

            videoDynamoDb.Comments.Remove(comment);

            await _context.SaveAsync(videoDynamoDb);

            return true;
        }


        public async Task<List<Document>> GetAllVideosComments()
        {
            ScanFilter scanFilter = new ScanFilter();
            Search search =table.Scan(scanFilter);

            List<Document> documentList = new List<Document>();
            documentList = await search.GetNextSetAsync();

            return documentList;
        }
    }
}

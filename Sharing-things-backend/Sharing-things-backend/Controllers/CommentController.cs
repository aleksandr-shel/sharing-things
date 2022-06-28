using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sharing_things_backend.DTOs;
using Sharing_things_backend.Services;

namespace Sharing_things_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : BaseApiController
    {
        private readonly IDynamoDbService _dynamoDbService;

        public CommentController(IDynamoDbService dynamoDbService)
        {
            _dynamoDbService = dynamoDbService;
        }

        [HttpGet("{videoId}")]
        public async Task<IActionResult> GetVideoComments(string videoId)
        {
            return Ok(await _dynamoDbService.GetVideoDynamoDb(videoId));
        }
        [HttpPost]
        public async Task<IActionResult> AddComment(CommentDto commentDto)
        {
            return Ok(await _dynamoDbService.AddComment(commentDto));
        }

        [HttpDelete("{videoId}/{commentId}")]
        public async Task<IActionResult> DeleteComment(string videoId, string commentId)
        {
            bool res = await _dynamoDbService.DeleteCommentInVideo(videoId, commentId);
            if (!res)
            {
                return BadRequest("Error deleting comment");
            }
            return Ok();
        }
    }
}

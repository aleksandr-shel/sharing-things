using Microsoft.AspNetCore.SignalR;
using Sharing_things_backend.DTOs;
using Sharing_things_backend.Services;

namespace Sharing_things_backend.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IDynamoDbService _dynamoDbService;

        public ChatHub(IDynamoDbService dynamoDbService)
        {
            _dynamoDbService = dynamoDbService;
        }
        public async Task SendComment(CommentDto commentDto)
        {
            var comment = await _dynamoDbService.AddComment(commentDto);
            await Clients.Group(commentDto.VideoId)
                .SendAsync("ReceiveComment", comment);
        }

        public async Task DeleteComment(string videoId, string commentId)
        {
            var result = await _dynamoDbService.DeleteCommentInVideo(videoId, commentId);
            if (result)
            {
                await Clients.Group(videoId)
                    .SendAsync("DeleteComment", commentId);
            }
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var videoid = httpContext.Request.Query["videoId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, videoid);
            var result = await _dynamoDbService.GetVideoDynamoDb(videoid);
            if (result != null)
            {
                await Clients.Caller.SendAsync("LoadComments", result);
            }
        }
    }
}

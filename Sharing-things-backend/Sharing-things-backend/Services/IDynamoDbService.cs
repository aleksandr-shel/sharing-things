﻿using Amazon.DynamoDBv2.DocumentModel;
using Sharing_things_backend.DTOs;
using Sharing_things_backend.DynamoDB_Model;

namespace Sharing_things_backend.Services
{
    public interface IDynamoDbService
    {
        Task<VideoDynamoDbModel> GetVideoDynamoDb(string videoId);
        Task<Comment> AddComment(CommentDto commentDto);
        Task<bool> DeleteCommentInVideo(string videoId, string commentId);
        Task<List<Document>> GetAllVideosComments();
        Task DeleteVideoDynamoDb(string videoId);
    }
}

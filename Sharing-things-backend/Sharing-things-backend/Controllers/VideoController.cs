using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Sharing_things_backend.Data;
using Sharing_things_backend.Domain;
using Sharing_things_backend.DTOs;
using Sharing_things_backend.Services;
using System.Security.Claims;
using AutoMapper.QueryableExtensions;
using System.Text.Json;
using Sharing_things_backend.Core;
using Sharing_things_backend.Extensions;

namespace Sharing_things_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : BaseApiController
    {
        private readonly ILogger<VideoController> _logger;
        private readonly IMapper _mapper;
        private readonly IDynamoDbService _dynamoDbService;
        private readonly DataContext _context;
        private readonly IS3BucketService _iS3BucketService;

        public VideoController(DataContext context, IS3BucketService iS3BucketService, ILogger<VideoController> logger,
            IMapper mapper, IDynamoDbService dynamoDbService)
        {
            _logger = logger;
            _mapper = mapper;
            _dynamoDbService = dynamoDbService;
            _context = context;
            _iS3BucketService = iS3BucketService;
        }

        [HttpPost]
        [RequestSizeLimit(100000000)]
        public async Task<ActionResult<VideoDto>> PostVideo([FromForm] VideoUploadDto videoUploadDto)
        {

            var owner = await _context.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            if (owner == null) return Unauthorized();

            (string videoUrl, string fileKey) = await _iS3BucketService.UploadToBucket_TransferUtility(videoUploadDto.File);

            if (videoUrl == null) return BadRequest("Can't upload video");
            _logger.LogInformation(videoUrl + " " + fileKey);

            var video = new Video
            {
                VideoUrl = videoUrl,
                FileKey = fileKey,
                Title = videoUploadDto.Title,
                Owner = owner
            };

            var result = await _context.Videos.AddAsync(video);

            await _context.SaveChangesAsync();

            var videoRes = _mapper.Map<VideoDto>(result.Entity);

            return Ok(videoRes);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideo(Guid id)
        {

            var video = await _context.Videos.FindAsync(id);

            if (video == null) return NotFound();

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            if (video.Owner != user)
            {
                return Unauthorized();
            }

            bool isDeleted = await _iS3BucketService.DeleteFileFromBucket(video.FileKey);

            if (isDeleted)
            {
                _context.Videos.Remove(video);
                await _context.SaveChangesAsync();
                await _dynamoDbService.DeleteVideoDynamoDb(video.Id.ToString());
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("list")]
        [AllowAnonymous]
        public async Task<IActionResult> VideoList([FromQuery]PagingParams param)
        {
            var query = _context.Videos
                .OrderByDescending(x => x.AddedAt)
                .ProjectTo<VideoDto>(_mapper.ConfigurationProvider, new { currentUsername = User.FindFirstValue(ClaimTypes.Name) });

            return await HandlePagedList(query, param);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<VideoDto>> GetVideo(Guid id)
        {
            var video = await _context.Videos
                .ProjectTo<VideoDto>(_mapper.ConfigurationProvider, new { currentUsername = User.FindFirstValue(ClaimTypes.Name) })
                .FirstOrDefaultAsync(x => x.Id == id);
            return Ok(video);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVideoInfo(Guid id, VideoUpdateDto newVideo)
        {
            var video = await _context.Videos.FindAsync(id);

            if (video == null) return NotFound();

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            if (video.Owner != user)
            {
                return Unauthorized();
            }

            _mapper.Map(newVideo, video);

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return Ok();

            return BadRequest("Failed to update video info");
        }


        [HttpGet("current-user")]
        public async Task<IActionResult> GetUserVideos()
        {
            var currentUser = await _context.Users
                .ProjectTo<UserVideosDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            if (currentUser == null) return Unauthorized();

            var videos = currentUser.Videos;

            if (videos == null)
            {
                return NotFound();
            }

            return Ok(videos);
        }

        [HttpGet("subscriptions")]
        public async Task<IActionResult> GetSubscriVideo()
        {
            //var subscriptions = await (from uf in _context.UserFollowings
            //                    where uf.Observer.UserName == User.FindFirstValue(ClaimTypes.Email)
            //                    select uf.Observer).ToListAsync();
            //var videos = await (from v in _context.Videos
            //             where subscriptions.Contains(v.Owner)
            //             select v)
            //             .ProjectTo<VideoDto>(_mapper.ConfigurationProvider)
            //             .ToListAsync();


            //return Ok(videos);

            var videos = await (from v in _context.Videos
                                join u in _context.UserFollowings on v.Owner.UserName equals u.Target.UserName
                                where u.Observer.UserName == User.FindFirstValue(ClaimTypes.Name)
                                orderby v.AddedAt
                                select v)
                         .ProjectTo<VideoDto>(_mapper.ConfigurationProvider, new { currentUsername = User.FindFirstValue(ClaimTypes.Name) })
                         .ToListAsync();

            return Ok(videos);
        }
    }
}

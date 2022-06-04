using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sharing_things_backend.Domain;
using Sharing_things_backend.DTOs;
using Sharing_things_backend.Services;
using System.Text.Json;

namespace Sharing_things_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly ILogger<VideoController> _logger;
        private readonly IS3BucketService iS3BucketService;

        public VideoController(ILogger<VideoController> logger, IS3BucketService iS3BucketService)
        {
            _logger = logger;
            this.iS3BucketService = iS3BucketService;
        }

        [HttpPost]
        public async Task<IActionResult> PostVideo([FromForm] VideoUploadDto videoUploadDto)
        {
            string urlpath = await iS3BucketService.UploadToBucket_TransferUtility(videoUploadDto.File);

            _logger.LogInformation(urlpath);
            return Ok();
        }

        [HttpDelete("{fileKey}")]
        public async Task<IActionResult> DeleteVideo(string fileKey)
        {
            bool isDeleted = await iS3BucketService.DeleteFileFromBucket(fileKey);
            if (isDeleted)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("list")]
        public async Task<ActionResult> VideoList()
        {
            List<Video> videos = new List<Video>
            {
                new Video
                {
                    Id = Guid.NewGuid(),
                    VideoUrl = "test url",
                    Title = "Some title",
                    FileKey = "Some File key"
                },
                new Video
                {
                    Id = Guid.NewGuid(),
                    VideoUrl = "test url2",
                    Title = "Some title2",
                    FileKey = "Some File key2"
                },
                new Video
                {
                    Id = Guid.NewGuid(),
                    VideoUrl = "test url3",
                    Title = "Some title3",
                    FileKey = "Some File key3"
                },
            };
            return Ok(videos);
        }

    }
}

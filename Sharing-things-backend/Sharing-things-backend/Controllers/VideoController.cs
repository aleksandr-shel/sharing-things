﻿using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Sharing_things_backend.Data;
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
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IS3BucketService _iS3BucketService;

        public VideoController(DataContext context, IS3BucketService iS3BucketService, ILogger<VideoController> logger,
            IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _context = context;
            _iS3BucketService = iS3BucketService;
        }

        [HttpPost]
        public async Task<IActionResult> PostVideo([FromForm] VideoUploadDto videoUploadDto)
        {
            (string videoUrl, string fileKey) = await _iS3BucketService.UploadToBucket_TransferUtility(videoUploadDto.File);

            _logger.LogInformation(videoUrl + " " + fileKey);

            var video = new Video
            {
                VideoUrl = videoUrl,
                FileKey = fileKey,
                Title = videoUploadDto.Title,
            };

            await _context.Videos.AddAsync(video);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideo(Guid id)
        {

            var video = await _context.Videos.FindAsync(id);

            if (video == null) return NotFound();

            bool isDeleted = await _iS3BucketService.DeleteFileFromBucket(video.FileKey);

            if (isDeleted)
            {
                _context.Videos.Remove(video);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("list")]
        public async Task<ActionResult> VideoList()
        {
            var videos = await _context.Videos.ToListAsync();
            return Ok(videos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVideo(Guid id)
        {
            var video = await _context.Videos.FindAsync(id);
            return Ok(video);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVideoInfo(Guid id, VideoUpdateDto newVideo)
        {
            var video = await _context.Videos.FindAsync(id);

            if (video == null) return NotFound();

            _mapper.Map(newVideo, video);

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return Ok();

            return BadRequest("Failed to update video info");
        }
    }
}

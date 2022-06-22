using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sharing_things_backend.Data;
using Sharing_things_backend.Domain;
using Sharing_things_backend.DTOs;
using System.Security.Claims;

namespace Sharing_things_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public FavoriteController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("list")]
        public async Task<IActionResult> FavoriteList()
        {
            var list = await _context.UserFavorites
                .Where(x => x.User.UserName == User.FindFirstValue(ClaimTypes.Name))
                .Select(x => x.Video)
                .ProjectTo<VideoDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<bool>> IsFavorite(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));
            var userFavorite = await _context.UserFavorites.FindAsync(user.Id, id);
            if (userFavorite == null)
            {
                return Ok(false);
            }
            return Ok(true);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> ToggleFavorite(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));

            if (user == null) return BadRequest("Could not find user");

            var video = await _context.Videos.FindAsync(id);

            if (video == null) return BadRequest("Could not find video");

            var userFavorite = await _context.UserFavorites.FirstOrDefaultAsync(x => x.AppUserId == user.Id && x.VideoId == video.Id);

            if (userFavorite == null)
            {
                var newUserFavorite = new UserFavorite
                {
                    User = user,
                    Video = video
                };
                await _context.UserFavorites.AddAsync(newUserFavorite);
            } else
            {
                _context.UserFavorites.Remove(userFavorite);
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest("Failed to toggle favorite");
        }
    }
}

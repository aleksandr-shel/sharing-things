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
    public class FollowController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public FollowController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("{username}")]
        public async Task<IActionResult> ToggleFollow(string username)
        {
            //target is the one who we follow
            var target = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);

            if (target == null) return BadRequest("Target user not found");

            //observer is the current user who will follow or unfollow the target
            var observer = await _context.Users.FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));

            if (observer == null) return BadRequest("Observer user not found");

            if (observer == target) return BadRequest("You can't follow yourself");

            var following = await _context.UserFollowings.FindAsync(observer.Id, target.Id);

            if (following == null)
            {
                following = new UserFollowing
                {
                    Observer = observer,
                    Target = target,
                };

                _context.UserFollowings.Add(following);
            }
            else
            {
                _context.UserFollowings.Remove(following);
            }

            var success = await _context.SaveChangesAsync() > 0;

            if (success)
            {
                return Ok();
            }

            return BadRequest("Failed to update following");
        }


        [HttpGet("list")]
        public async Task<ActionResult<List<ProfileDto>>> List()
        {
            var following = await _context.UserFollowings
                .Where(x => x.Observer.UserName == User.FindFirstValue(ClaimTypes.Name))
                .Select(x => x.Target)
                .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider, new {currentUsername = User.FindFirstValue(ClaimTypes.Name) })
                .ToListAsync();
            
            return Ok(following);
        }
    }
}

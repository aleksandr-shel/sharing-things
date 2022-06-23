using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sharing_things_backend.Data;
using Sharing_things_backend.DTOs;
using System.Security.Claims;

namespace Sharing_things_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ProfileController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("list")]
        public async Task<ActionResult<List<ProfileDto>>> List()
        {
            var list = await _context.Users
                    .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider, new {currentUsername = User.FindFirstValue(ClaimTypes.Name)})
                    .ToListAsync();

            return Ok(list);
        }

        [HttpGet("list/{username}")]
        public async Task<ActionResult<ProfileDto>> Get(string username)
        {
            var profile = await _context.Users
                .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider, new { currentUsername = User.FindFirstValue(ClaimTypes.Name) })
                .FirstOrDefaultAsync(x => x.Username == username);
            return Ok(profile);
        }
    }
}

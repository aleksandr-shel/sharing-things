using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sharing_things_backend.Data;
using Sharing_things_backend.DTOs;

namespace Sharing_things_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuggestionController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public SuggestionController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet("{videoId}")]
        public async Task<IActionResult> List(Guid videoId)
        {
            var video = await _context.Videos
                .Include(x => x.Owner)
                .FirstOrDefaultAsync(x => x.Id == videoId);
            if (video == null) return NotFound();

            var suggestions = await _context.Videos
                .Include(x => x.Owner)
                .OrderByDescending(x => x.AddedAt)
                .Take(5)
                .Where(x => x.Owner.Id == video.Owner.Id)
                .ProjectTo<VideoDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return Ok(suggestions);
        }
    }
}

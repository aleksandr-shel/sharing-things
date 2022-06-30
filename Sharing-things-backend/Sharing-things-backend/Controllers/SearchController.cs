using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sharing_things_backend.Data;
using Sharing_things_backend.Domain;
using Sharing_things_backend.DTOs;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;

namespace Sharing_things_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class SearchController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ILogger<SearchController> _logger;
        private readonly IMapper _mapper;

        public SearchController(DataContext context, ILogger<SearchController> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Search(string q)
        {
            q = q.ToLower();
            _logger.LogInformation(q);
            string[] splited = q.Split(new [] {',',' '});
            for (int i = 0; i < splited.Length; i++)
            {
                _logger.LogInformation(splited[i]);
            }

            List<string> splitterList = splited.ToList();
            //later make a better search
            //for now leave it as it is
            //.Where(x => splited.Any(y => x.Title.Contains(y))) throws an error
            var querySearch = _context.Videos
                //.Where(x => splited.Any(y => x.Title.Contains(y)))
                .Where(x => x.Title.ToLower().Contains(q) || x.Title.ToLower().Equals(q)
                    || splited.Contains(x.Title.ToLower()) || x.Owner.DisplayName.ToLower().Contains(q)
                    || x.Owner.DisplayName.ToLower().Contains(splited[0]) || x.Title.ToLower().Contains(splited[0]))
                .ProjectTo<VideoDto>(_mapper.ConfigurationProvider)
                .Take(10)
                .AsQueryable();

            var userQuerySearch = _context.Users
                .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider, new {currentUsername = User.FindFirstValue(ClaimTypes.Name) })
                .Where(x => x.DisplayName.ToLower().Contains(q) || x.DisplayName.ToLower().Equals(q)
                    || x.DisplayName.ToLower().Contains(splited[0])
                    || splited.Contains(x.DisplayName.ToLower()))
                .Take(3)
                .AsQueryable();
            //dsadasd
            List<VideoDto> videosList = await querySearch.ToListAsync();
            List<ProfileDto> userList = await userQuerySearch.ToListAsync();

            ArrayList arrayList = new ArrayList(userList);
            arrayList.AddRange(videosList);


            return Ok(arrayList);
        }

        private bool ArrayContains(string[] array, string target)
        {
            for (int i = 0; i < array.Length; i++)
            {
                if (target.Contains(array[i]))
                {
                    return true;
                }
            }
            return false;
        }
    }
}

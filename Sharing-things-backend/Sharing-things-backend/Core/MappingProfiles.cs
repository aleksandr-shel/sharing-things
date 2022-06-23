using AutoMapper;
using Sharing_things_backend.Domain;
using Sharing_things_backend.DTOs;

namespace Sharing_things_backend.Core
{
    public class MappingProfiles : Profile
    {

        public MappingProfiles()
        {
            string currentUsername = null;

            CreateMap<VideoUpdateDto, Video>();
            CreateMap<AppUser, UserVideosDto>();
            CreateMap<Video, VideoDto>();
            CreateMap<AppUser, ProfileDto>()
                .ForMember(x => x.FollowersCount, d => d.MapFrom(s => s.Followers.Count))
                .ForMember(x => x.FollowingCount, d => d.MapFrom(s => s.Followings.Count))
                .ForMember(x => x.Following, d => d.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));

        }
    }
}

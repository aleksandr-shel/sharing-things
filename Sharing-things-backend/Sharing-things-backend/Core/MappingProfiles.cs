using AutoMapper;
using Sharing_things_backend.Domain;
using Sharing_things_backend.DTOs;

namespace Sharing_things_backend.Core
{
    public class MappingProfiles : Profile
    {

        public MappingProfiles()
        {
            CreateMap<VideoUpdateDto, Video>();
            CreateMap<AppUser, UserVideosDto>();
            CreateMap<Video, VideoDto>();
            CreateMap<AppUser, OwnerDto>();
        }
    }
}

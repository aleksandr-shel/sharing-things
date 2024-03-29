﻿using FluentValidation;
using Sharing_things_backend.CustomAttributes;

namespace Sharing_things_backend.DTOs
{
    public class VideoUploadDto
    {
        [AllowedExtensions(new string[] { ".mp4" })]
        [MaxFileSizeAttribute(300000000)]
        public IFormFile File { get; set; }

        public string Title { get; set; }
    }

    public class VideoUploadDtoValidator : AbstractValidator<VideoUploadDto>
    {
        public VideoUploadDtoValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.File).NotNull();
        }
    }
}

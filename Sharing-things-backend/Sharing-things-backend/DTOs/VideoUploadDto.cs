using Sharing_things_backend.CustomAttributes;

namespace Sharing_things_backend.DTOs
{
    public class VideoUploadDto
    {
        [AllowedExtensions(new string[] { ".mp4", ".mov" })]
        public IFormFile File { get; set; }
    }
}

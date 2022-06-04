namespace Sharing_things_backend.Domain
{
    public class Video
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string VideoUrl { get; set; }
        public string FileKey { get; set; }
    }
}

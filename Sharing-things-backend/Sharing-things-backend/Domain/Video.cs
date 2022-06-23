namespace Sharing_things_backend.Domain
{
    public class Video
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string VideoUrl { get; set; }
        public string FileKey { get; set; }
        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
        public AppUser Owner { get; set; }
        public ICollection<UserFavorite> UsersLiked { get; set; }
    }
}

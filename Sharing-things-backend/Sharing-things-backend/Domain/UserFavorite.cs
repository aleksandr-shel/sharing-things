namespace Sharing_things_backend.Domain
{
    public class UserFavorite
    {
        public string AppUserId { get; set; }
        public AppUser User { get; set; }
        public Guid VideoId { get; set; }
        public Video Video { get; set; }
    }
}

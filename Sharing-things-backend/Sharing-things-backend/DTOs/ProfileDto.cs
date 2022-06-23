namespace Sharing_things_backend.DTOs
{
    public class ProfileDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
        public bool Following { get; set; }
    }
}

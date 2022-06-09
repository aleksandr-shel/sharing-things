using Sharing_things_backend.Domain;

namespace Sharing_things_backend.Services
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}

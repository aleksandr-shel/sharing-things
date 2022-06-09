using Microsoft.AspNetCore.Identity;
using Sharing_things_backend.Data;
using Sharing_things_backend.Domain;
using Sharing_things_backend.Services;

namespace Sharing_things_backend.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
            })
                .AddEntityFrameworkStores<DataContext>()
                .AddSignInManager<SignInManager<AppUser>>();

            services.AddScoped<ITokenService, TokenService>();
            
            return services;
        }
    }
}

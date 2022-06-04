using Amazon.S3;
using Sharing_things_backend.Services;

namespace Sharing_things_backend.Extensions
{
    public static class ApplicationServicesExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSingleton<IAmazonS3>(_=> new AmazonS3Client());
            services.AddSingleton<IS3BucketService>(provider => new S3BucketService(provider.GetRequiredService<IAmazonS3>(), provider.GetRequiredService<ILogger<S3BucketService>>()));
            return services;
        }
    }
}

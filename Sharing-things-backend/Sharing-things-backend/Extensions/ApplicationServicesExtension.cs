using Amazon.DynamoDBv2;
using Amazon.S3;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Sharing_things_backend.Core;
using Sharing_things_backend.Data;
using Sharing_things_backend.Services;

namespace Sharing_things_backend.Extensions
{
    public static class ApplicationServicesExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            //added s3
            services.AddSingleton<IAmazonS3>(_=> new AmazonS3Client());
            services.AddSingleton<IS3BucketService>(provider => new S3BucketService(provider.GetRequiredService<IAmazonS3>(), provider.GetRequiredService<ILogger<S3BucketService>>()));

            //added dynamoDb
            services.AddSingleton<IAmazonDynamoDB>(_=> new AmazonDynamoDBClient());
            services.AddScoped<IDynamoDbService>(provider =>
                new DynamoDbService(provider.GetRequiredService<IAmazonDynamoDB>(),
                    provider.GetRequiredService<DataContext>(), provider.GetRequiredService<IHttpContextAccessor>()));

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000");
                });
            });


            var mapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfiles());
            }).CreateMapper();

            services.AddSingleton(mapper);
            //SignalR
            services.AddSignalR();

            return services;
        }
    }
}

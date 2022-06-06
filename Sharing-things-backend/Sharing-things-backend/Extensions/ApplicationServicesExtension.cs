﻿using Amazon.S3;
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
            services.AddSingleton<IAmazonS3>(_=> new AmazonS3Client());
            services.AddSingleton<IS3BucketService>(provider => new S3BucketService(provider.GetRequiredService<IAmazonS3>(), provider.GetRequiredService<ILogger<S3BucketService>>()));

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                });
            });


            var mapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfiles());
            }).CreateMapper();

            services.AddSingleton(mapper);

            return services;
        }
    }
}

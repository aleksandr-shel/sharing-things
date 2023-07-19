using Amazon;
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
            services.AddSingleton<IAmazonS3>(_=> new AmazonS3Client(config.GetValue<string>("AWSCredentials:AccessKeyID"), config.GetValue<string>("AWSCredentials:SecretAccessKey"), RegionEndpoint.CACentral1));
            services.AddSingleton<IS3BucketService>(provider => new S3BucketService(provider.GetRequiredService<IAmazonS3>(), provider.GetRequiredService<ILogger<S3BucketService>>()));

            //added dynamoDb
            services.AddSingleton<IAmazonDynamoDB>(_=> new AmazonDynamoDBClient(config.GetValue<string>("AWSCredentials:AccessKeyID"), config.GetValue<string>("AWSCredentials:SecretAccessKey"), RegionEndpoint.CACentral1));
            services.AddScoped<IDynamoDbService>(provider =>
                new DynamoDbService(provider.GetRequiredService<IAmazonDynamoDB>(),
                    provider.GetRequiredService<DataContext>(), provider.GetRequiredService<IHttpContextAccessor>()));

            services.AddDbContext<DataContext>(opt =>
            {
                //var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                //string connStr;

                //// Depending on if in development or production, use either Heroku-provided
                //// connection string, or development connection string from env var.
                //if (env == "Development")
                //{
                //    // Use connection string from file.
                //    connStr = config.GetConnectionString("DefaultConnection");
                //}
                //else
                //{
                //    // Use connection string provided at runtime by Heroku.
                //    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                //    // Parse connection URL to connection string for Npgsql
                //    connUrl = connUrl.Replace("postgres://", string.Empty);
                //    var pgUserPass = connUrl.Split("@")[0];
                //    var pgHostPortDb = connUrl.Split("@")[1];
                //    var pgHostPort = pgHostPortDb.Split("/")[0];
                //    var pgDb = pgHostPortDb.Split("/")[1];
                //    var pgUser = pgUserPass.Split(":")[0];
                //    var pgPass = pgUserPass.Split(":")[1];
                //    var pgHost = pgHostPort.Split(":")[0];
                //    var pgPort = pgHostPort.Split(":")[1];

                //    connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
                //}

                //// Whether the connection string came from the local development configuration file
                //// or from the environment variable from Heroku, use it to set up your DbContext.
                //opt.UseNpgsql(connStr);

                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
                //opt.UseMySql(config.GetConnectionString("DefaultConnection-mysql"), ServerVersion.AutoDetect(config.GetConnectionString("DefaultConnection-mysql")));

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

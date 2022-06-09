using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Sharing_things_backend.Domain;

namespace Sharing_things_backend.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() || !context.Videos.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Alex",
                        UserName = "alex",
                        Email = "shelukheev@gmail.com"
                    },
                    new AppUser
                    {
                        DisplayName = "John Connor",
                        UserName = "connor",
                        Email = "connor@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var videos = new List<Video>
                {
                    new Video {
                        Title = "Clouds",
                        VideoUrl = "Clouds.mp4",
                        FileKey = "blablaClouds.mp4",
                        Owner = users[0]
                    },
                    new Video {
                        Title = "Candle",
                        VideoUrl = "Candle.mp4",
                        FileKey = "blablaCandle.mp4",
                        Owner = users[0]
                    },
                    new Video {
                        Title = "Red Pastel",
                        VideoUrl = "Red_Pastel.mp4",
                        FileKey = "blablaRed_Pastel.mp4",
                        Owner = users[1]
                    },
                    new Video {
                        Title = "Rabbit",
                        VideoUrl = "Rabbit.mp4",
                        FileKey = "blablaRabbit.mp4",
                        Owner = users[1]
                    }
                };

                await context.Videos.AddRangeAsync(videos);
                await context.SaveChangesAsync();
            }
        }
    }
}

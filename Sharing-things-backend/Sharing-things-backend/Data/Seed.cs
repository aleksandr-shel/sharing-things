using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Sharing_things_backend.Domain;

namespace Sharing_things_backend.Data
{
    public class Seed
    {
        private readonly static string _bucketName = "sharing-things";
        private readonly static string _region = "ca-central-1";
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
                    },
                    new AppUser
                    {
                        DisplayName = "Jack Shephard",
                        UserName = "shephard",
                        Email = "shephard@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var keys = new string[]
                {
                    "1eb0264c-0592-4061-86dc-58d1a79fe08d_Newsflash.mp4",
                    "3236d829-a0c7-49f4-b090-e319f160abc9_Countdown_Yellow.mp4",
                    "3ceca93a-b093-44bd-a270-e5a71e6ef39c_videoplayback.mp4",
                    "8c302137-cd24-4e2f-b451-9b5c13db3b1b_Clouds.mp4",
                    "4ad32f81-94d9-456b-a7b6-d5e66d0bc5b6_Spotlight.mp4",
                    "8508fd13-856a-4c48-93c3-f6453fe66559_Candle.mp4"
                };

                var videos = new List<Video>
                {
                    new Video {
                        Title = "News Flash",
                        VideoUrl = $"https://{_bucketName}.s3.{_region}.amazonaws.com/{keys[0]}",
                        FileKey = keys[0],
                        Owner = users[0],
                        AddedAt = DateTime.Now.AddMonths(-1)
                    },
                    new Video {
                        Title = "Countdown Yellow",
                        VideoUrl = $"https://{_bucketName}.s3.{_region}.amazonaws.com/{keys[1]}",
                        FileKey = keys[1],
                        Owner = users[0],
                        AddedAt = DateTime.Now.AddDays(-20)
                    },
                    new Video {
                        Title = "AFRAID | Short Film (AWARD-WINNING)",
                        VideoUrl = $"https://{_bucketName}.s3.{_region}.amazonaws.com/{keys[2]}",
                        FileKey = keys[2],
                        Owner = users[1],
                        AddedAt = DateTime.Now.AddDays(-15)
                    },
                    new Video {
                        Title = "Clouds",
                        VideoUrl = $"https://{_bucketName}.s3.{_region}.amazonaws.com/{keys[3]}",
                        FileKey = keys[3],
                        Owner = users[1],
                        AddedAt = DateTime.Now.AddDays(-25)
                    },
                    new Video {
                        Title = "Spotlight",
                        VideoUrl = $"https://{_bucketName}.s3.{_region}.amazonaws.com/{keys[4]}",
                        FileKey = keys[4],
                        Owner = users[2],
                        AddedAt = DateTime.Now.AddDays(-10)
                    },
                    new Video {
                        Title = "Candle",
                        VideoUrl = $"https://{_bucketName}.s3.{_region}.amazonaws.com/{keys[5]}",
                        FileKey = keys[5],
                        Owner = users[2],
                        AddedAt = DateTime.Now.AddDays(-5)
                    }
                };

                await context.Videos.AddRangeAsync(videos);
                await context.SaveChangesAsync();
            }
        }
    }
}

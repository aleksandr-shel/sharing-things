using Sharing_things_backend.Domain;

namespace Sharing_things_backend.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.Videos.Any())
            {
                var videos = new List<Video>
                {
                    new Video {
                        Title = "Clouds",
                        VideoUrl = "Clouds.mp4",
                        FileKey = "blablaClouds.mp4"
                    },
                    new Video {
                        Title = "Candle",
                        VideoUrl = "Candle.mp4",
                        FileKey = "blablaCandle.mp4"
                    },
                    new Video {
                        Title = "Red Pastel",
                        VideoUrl = "Red_Pastel.mp4",
                        FileKey = "blablaRed_Pastel.mp4"
                    },
                    new Video {
                        Title = "Rabbit",
                        VideoUrl = "Rabbit.mp4",
                        FileKey = "blablaRabbit.mp4"
                    }
                };

                await context.Videos.AddRangeAsync(videos);
                await context.SaveChangesAsync();
            }
        }
    }
}

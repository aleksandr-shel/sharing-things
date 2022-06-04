using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;

namespace Sharing_things_backend.Services
{
    public class S3BucketService : IS3BucketService
    {
        private readonly IAmazonS3 _client;
        private readonly ILogger<S3BucketService> _logger;
        private readonly string _bucketName = "sharing-things";
        public S3BucketService(IAmazonS3 client, ILogger<S3BucketService> logger)
        {
            _client = client;
            _logger = logger;
        }

        public async Task<bool> DeleteFileFromBucket(string fileKey)
        {
            try
            {

                var deleteObjectRequest = new DeleteObjectRequest
                {
                    BucketName = _bucketName,
                    Key = fileKey
                };

                var response = await _client.DeleteObjectAsync(deleteObjectRequest);
                if (response.HttpStatusCode == System.Net.HttpStatusCode.NoContent)
                {
                    return true;
                }

            }catch(AmazonS3Exception e)
            {
                _logger.LogError(e.Message);
            }catch(Exception e)
            {
                _logger.LogError(e.Message, e);
            }
            return false;
        }

        public Task<bool> UploadToBucket_LowLevel(IFormFile file)
        {
            throw new NotImplementedException();
        }

        public async Task<string> UploadToBucket_TransferUtility(IFormFile file)
        {
            try
            {
                if (file.Length > 0)
                {
                    await using var stream = file.OpenReadStream();
                    var key = Guid.NewGuid().ToString() + file.FileName;
                    var uploadRequest = new TransferUtilityUploadRequest
                    {
                        InputStream = stream,
                        Key = key,
                        BucketName = _bucketName,
                        ContentType = file.ContentType
                        //CannedACL = S3CannedACL.PublicRead
                    };

                    uploadRequest.UploadProgressEvent +=
                        new EventHandler<UploadProgressArgs>
                            (uploadRequest_UploadPartProgressEvent);

                    var fileTransferUtility = new TransferUtility(_client);
                    await fileTransferUtility.UploadAsync(uploadRequest);

                    return $"https://{_bucketName}.s3.ca-central-1.amazonaws.com/{key}";
                }
            }catch(AmazonS3Exception e)
            {
                _logger.LogError(e.Message, e);
            }catch(Exception e)
            {
                _logger.LogError(e.Message, e);
            }
            return null;
        }

        void uploadRequest_UploadPartProgressEvent(object sender, UploadProgressArgs e)
        {
            // Process event.
            _logger.LogInformation($"{e.TransferredBytes}/ {e.TotalBytes}");
        }
    }
}

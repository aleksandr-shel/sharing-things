namespace Sharing_things_backend.Services
{
    public interface IS3BucketService
    {
        Task<string> UploadToBucket_TransferUtility(IFormFile file);

        Task<bool> DeleteFileFromBucket(string fileKey);

        Task<bool> UploadToBucket_LowLevel(IFormFile file);
    }
}

using System.ComponentModel.DataAnnotations;

namespace Sharing_things_backend.CustomAttributes
{
    public class MinFileSizeAttribute : ValidationAttribute
    {
        private readonly int _minFileSize;
        public MinFileSizeAttribute(int minFileSize)
        {
            _minFileSize = minFileSize;
        }

        protected override ValidationResult IsValid(
        object value, ValidationContext validationContext)
        {
            var file = value as IFormFile;
            if (file == null)
            {
                return new ValidationResult(GetErrorMessage());
            }
            if (file != null)
            {
                if (file.Length < _minFileSize)
                {
                    return new ValidationResult(GetErrorMessage());
                }
            }

            return ValidationResult.Success;
        }

        public string GetErrorMessage()
        {
            return $"Maximum allowed file size is { _minFileSize} bytes.";
        }
    }
}

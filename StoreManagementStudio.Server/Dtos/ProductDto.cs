using System.ComponentModel.DataAnnotations;

namespace StoreManagementStudio.Server.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Product name is required")]
        [StringLength(50, ErrorMessage = "Product name cannot exceed 50 characters")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "Price is required")]
        [Range(0.0, double.MaxValue, ErrorMessage = "Price must be a positive value")]
        public decimal Price { get; set; }
    }
}

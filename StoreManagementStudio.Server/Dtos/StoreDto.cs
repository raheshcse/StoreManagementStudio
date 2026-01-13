using System.ComponentModel.DataAnnotations;

namespace StoreManagementStudio.Server.Dtos
{
    public class StoreDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Store name is required")]
        [StringLength(100, ErrorMessage = "Store name cannot exceed 100 characters")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "Store address is required")]
        [StringLength(200, ErrorMessage = "Store address cannot exceed 200 characters")]
        public string Address { get; set; } = null!;
    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace StoreManagementStudio.Server.Dtos
{
    public class SaleDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "ProductId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "ProductId must be a valid value")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "CustomerId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "CustomerId must be a valid value")]
        public int CustomerId { get; set; }

        [Required(ErrorMessage = "StoreId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "StoreId must be a valid value")]
        public int StoreId { get; set; }

        public string? ProductName { get; set; }
        public string? CustomerName { get; set; }
        public string? StoreName { get; set; }

        public DateTime DateSold { get; set; } = DateTime.Now;
    }
}
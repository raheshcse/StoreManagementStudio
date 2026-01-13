using System;
using System.ComponentModel.DataAnnotations; // for [Required]
using StoreManagementStudio.Server.Models;

namespace StoreManagementStudio.Server.Models
{
    public partial class Sales
    {
        public int Id { get; set; }

        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }

        [Required]
        public DateTime DateSold { get; set; }

        [Required] 
        public virtual Product Product { get; set; } = null!;

        [Required] 
        public virtual Customer Customer { get; set; } = null!;

        [Required] 
        public virtual Store Store { get; set; } = null!;
    }
}

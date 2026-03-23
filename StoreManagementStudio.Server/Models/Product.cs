using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StoreManagementStudio.Server.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public decimal Price { get; set; }

        public int Stock { get; set; }

        public virtual ICollection<Sales> Sales { get; set; } = new List<Sales>();
    }
}

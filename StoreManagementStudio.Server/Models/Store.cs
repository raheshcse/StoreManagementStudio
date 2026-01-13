using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StoreManagementStudio.Server.Models
{
    public class Store
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        public string? Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; } = new List<Sales>();
    }
}

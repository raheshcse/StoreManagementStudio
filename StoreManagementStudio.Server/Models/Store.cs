using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StoreManagementStudio.Server.Models
{
    public class Store
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Column("Location")]
        public string? Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; } = new List<Sales>();
    }
}

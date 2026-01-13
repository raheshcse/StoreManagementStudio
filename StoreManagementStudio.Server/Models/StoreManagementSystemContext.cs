using Microsoft.EntityFrameworkCore;

namespace StoreManagementStudio.Server.Models
{
    public partial class StoreManagementSystemContext : DbContext
    {
        public StoreManagementSystemContext(DbContextOptions<StoreManagementSystemContext> options)
            : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Sales> Sales { get; set; }   // ✅ THIS LINE FIXES THE ERROR
        public DbSet<Product> Products { get; set; }
        public DbSet<Store> Stores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).HasMaxLength(50);
                entity.Property(e => e.Address).HasMaxLength(50);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).HasMaxLength(50);
                entity.Property(e => e.Price).HasColumnType("money");
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.ToTable("Store");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).HasMaxLength(50);
                entity.Property(e => e.Address).HasMaxLength(50);
            });

            modelBuilder.Entity<Sales>(entity =>
            {
                entity.ToTable("Sales");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.DateSold).HasColumnType("date");

                entity.HasOne(e => e.Customer)
                    .WithMany(c => c.Sales)
                    .HasForeignKey(e => e.CustomerId);

                entity.HasOne(e => e.Product)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(e => e.ProductId);

                entity.HasOne(e => e.Store)
                    .WithMany(s => s.Sales)
                    .HasForeignKey(e => e.StoreId);
            });
        }
    }
}

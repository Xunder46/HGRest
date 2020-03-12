using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;


namespace ngHealthyGarden
{
    public partial class PablosDbContext : DbContext
    {
        public PablosDbContext()
            : base("name=MyEntities")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DishItem>().HasKey(sc => new { sc.DishId, sc.ItemId });

            modelBuilder.Entity<Item>().ToTable("Items");
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Dish> Dishes { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Side> Sides { get; set; }
        public virtual DbSet<Size> Sizes { get; set; }
        public virtual DbSet<TortillaType> TortillaTypes { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<DishItem> DishItems { get; set; }
    }
}
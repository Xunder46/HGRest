using System;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;

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
            modelBuilder.Entity<Item>().ToTable("Items");

            modelBuilder.Entity<Item>().HasMany(d => d.Dishes).WithMany(i => i.Items);
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Dish> Dishes { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Side> Sides { get; set; }
        public virtual DbSet<Size> Sizes { get; set; }
        public virtual DbSet<TortillaType> TortillaTypes { get; set; }
        public virtual DbSet<User> Users { get; set; }

        public virtual ObjectResult<Item> spGetItemsRelatedToADish(Nullable<int> dishId)
        {
            var dishIdParameter = dishId.HasValue ?
                new SqlParameter("DishId", dishId) :
                new SqlParameter("DishId", typeof(int));

            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<Item>("spGetItemsRelatedToADish @DishId", dishIdParameter);
        }
    }
}
using System;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;

namespace ngHealthyGarden
{
    public partial class HGDbContext : DbContext
    {
        public HGDbContext()
            : base("name=MyEntities")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>().ToTable("Items");
            modelBuilder.Entity<CustomerInfo>().ToTable("CustomerInfo");

            modelBuilder.Entity<Item>().HasMany(d => d.Dishes).WithMany(i => i.Items);

            //modelBuilder.Entity<Category>().HasMany(c => c.Dishes).WithRequired(c => c.Category).HasForeignKey(c => c.TortillaId);
        }

        public virtual DbSet<AddressInfo> AddressInfo { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<CustomerInfo> CustomerInfo { get; set; }
        public virtual DbSet<Dish> Dishes { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Side> Sides { get; set; }
        public virtual DbSet<Size> Sizes { get; set; }
        //public virtual DbSet<TortillaType> TortillaTypes { get; set; }
        public virtual DbSet<User> Users { get; set; }

        public virtual ObjectResult<Item> spGetItemsRelatedToADish(string dishName)
        {
            var dishNameParameter = dishName.Length>0 ?
                new SqlParameter("DishName", dishName) :
                new SqlParameter("DishName", typeof(string));

            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<Item>("spGetItemsRelatedToADish @DishName", dishNameParameter);
        }
    }
}
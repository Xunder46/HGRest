using System;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using ngHealthyGarden.Models;

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

            modelBuilder.Entity<Dish>().HasMany(d => d.Items).WithMany(i => i.Dishes)
                .Map(x=>
                {
                    x.MapLeftKey("DishId");
                    x.MapRightKey("ItemId");
                    x.ToTable("ItemDishes");
                });
            modelBuilder.Entity<OrderDetail>().HasMany(d => d.Items).WithMany(i => i.OrderDetails)
                .Map(m=> {
                    m.MapLeftKey("OrderDetailId");
                    m.MapRightKey("ItemId");
                    m.ToTable("RemovedIngredients");
                });
            modelBuilder.Entity<OrderDetail>().HasMany(d => d.Items1).WithMany(i => i.OrderDetails1)
                .Map(m => {
                    m.MapLeftKey("OrderDetailId");
                    m.MapRightKey("ItemId");
                    m.ToTable("AddedIngredients");
                });
            modelBuilder.Entity<RestaurantInfo>().ToTable("RestaurantInfo");
            modelBuilder.Entity<AddressInfo>().ToTable("AddressInfo");
        }

        public virtual DbSet<AddressInfo> AddressInfo { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<CustomerInfo> CustomerInfo { get; set; }
        public virtual DbSet<Dish> Dishes { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<OrderType> OrderTypes { get; set; }
        public virtual DbSet<Option> Options { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<ItemCategory> ItemCategories { get; set; }
        public virtual DbSet<Side> Sides { get; set; }
        public virtual DbSet<Size> Sizes { get; set; }
        public virtual DbSet<OrderComment> OrderComments { get; set; }
        public virtual DbSet<ZipCode> ZipCodes { get; set; }
        public virtual DbSet<RestaurantInfo> RestaurantInfo { get; set; }

        //stored procedure to find ingredients by a dish
        public virtual ObjectResult<Item> spGetItemsRelatedToADish(string dishName)
        {
            var dishNameParameter = dishName.Length>0 ?
                new SqlParameter("DishName", dishName) :
                new SqlParameter("DishName", typeof(string));

            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<Item>("spGetItemsRelatedToADish @DishName", dishNameParameter);
        }

        //stored procedure to remove ingredient from a dish
        public virtual ObjectResult<bool> spDeleteItemDish(int dishId, int itemId)
        {
            var dishIdParameter = dishId>0 ?
                new SqlParameter("DishId", dishId) :
                new SqlParameter("DishId", typeof(int));

            var itemIdParameter = itemId>0 ?
                new SqlParameter("ItemId", itemId) :
                new SqlParameter("ItemId", typeof(int));

            return ((IObjectContextAdapter)this).ObjectContext.ExecuteStoreQuery<bool>("spDeleteItemDish @DishId, @ItemId", dishIdParameter, itemIdParameter);
        }
    }
}
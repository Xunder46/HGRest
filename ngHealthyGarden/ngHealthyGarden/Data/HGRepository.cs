using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace ngHealthyGarden.Data
{
    public class HGRepository : IHGRepository
    {
        private readonly HGDbContext _context;
        public HGRepository(HGDbContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveChangesAsync() {
            return (await _context.SaveChangesAsync())>0;
        }

        //=============DISHES=====================
        public void AddDish(Dish camp)
        {
            throw new NotImplementedException();
        }
        public void DeleteDish(Dish camp)
        {
            throw new NotImplementedException();
        }
        public async Task<Dish[]> GetAllDishesAsync()
        {
            IQueryable<Dish> query = _context.Dishes;

            query = query.OrderBy(c => c.DishName);

            return await query.ToArrayAsync();
        }
        public async Task<Dish> GetDishAsync(string dishName)
        {
            IQueryable<Dish> query = _context.Dishes;

            query = query.Where(c => c.DishName == dishName);

            return await query.FirstOrDefaultAsync();
        }

        //=============CATEGORIES=================
        public async Task<Category[]> GetAllCategoriesAsync()
        {
            //getting categories with their dishes with their sizes, sides, etc...
            IQueryable<Category> query = _context.Categories
                .Include(c => c.Dishes);

            return await query.ToArrayAsync();
        }
        public async Task<Category> GetCategoryWithDishesByCategoryNameAsync(string category)
        {
            IQueryable<Category> query = _context.Categories.Include(c => c.Dishes);

            query = query.Where(c => c.Description == category);

            return await query.FirstOrDefaultAsync();
        }

        //=============ITEMS======================
        public async Task<Item[]> GetAllItemsAsync()
        {
            IQueryable<Item> query = _context.Items.OrderBy(i=>i.Description);

            return await query.ToArrayAsync();
        }
        public Item[] GetItemsByDishNameAsync(string dishName)
        {
            var query = _context.spGetItemsRelatedToADish(dishName);

            return query.ToArray();
        }

        //=============SIDES======================
        public async Task<Side[]> GetAllSidesAsync()
        {
            IQueryable<Side> query = _context.Sides.OrderBy(c=>c.Description);

            return await query.ToArrayAsync();
        }
        public async Task<Side[]> GetAllSidesByCategoryIdAsync(int categoryId)
        {
            IQueryable<Side> query = _context.Sides.Where(s => s.CategoryId == categoryId);

            return await query.ToArrayAsync();
        }

        //=============SIZES=====================
        public async Task<Size[]> GetSizesByCategoryIdAsync(int categoryId)
        {
            throw new NotImplementedException();
        }

        //=============ZipCodes=====================
        public async Task<ZipCode[]> GetZipCodesByRestaurantIdAsync(int restaurantId)
        {
            throw new NotImplementedException();
        }

        //=============RESTAURANTS=====================
        public async Task<RestaurantInfo[]> GetRestaurantsAsync()
        {
            throw new NotImplementedException();
        }

        //=============ORDERS=====================
        public void AddOrder(Order o)
        {
            var query = _context.Orders.Add(o);
        }
        public void AddOrderDetail(OrderDetail[] ods, int orderId)
        {
            foreach (var od in ods)
            {
                var query = _context.OrderDetails.Add(od);
                query.OrderId = orderId;
            }
        }
        public async Task<OrderDetail[]> GetOrderDetailsByOrderId(int orderId)
        {
            IQueryable<OrderDetail> query = _context.OrderDetails.Where(s => s.OrderId == orderId)
                .Include(d=>d.Order)
                .Include(d=>d.CustomerInfo)
                .Include(d=>d.Dish);

            return await query.ToArrayAsync();
        }
    }
}
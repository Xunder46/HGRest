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

        #region =============DISHES=====================
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
        #endregion

        #region =============CATEGORIES=================
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
        public void AddCategory(Category category)
        {
            throw new NotImplementedException();
        }

        public void DeleteCategory(Category category)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region =============ITEMS======================
        public async Task<Item[]> GetAllItemsAsync()
        {
            IQueryable<Item> query = _context.Items.OrderBy(i => i.Description);

            return await query.ToArrayAsync();
        }
        public Item[] GetItemsByDishNameAsync(string dishName)
        {
            var query = _context.spGetItemsRelatedToADish(dishName);

            return query.ToArray();
        }
        public void AddItem(Item item)
        {
            throw new NotImplementedException();
        }
        public void DeleteItem(Item item)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region =============SIDES======================
        public async Task<Side[]> GetAllSidesAsync()
        {
            IQueryable<Side> query = _context.Sides.OrderBy(c => c.Description);

            return await query.ToArrayAsync();
        }
        public async Task<Side[]> GetAllSidesByCategoryIdAsync(int categoryId)
        {
            IQueryable<Side> query = _context.Sides.Where(s => s.CategoryId == categoryId);

            return await query.ToArrayAsync();
        }
        public void AddSide(Side side)
        {
            throw new NotImplementedException();
        }
        public void DeleteSide(Side side)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region =============SIZES=====================
        public async Task<Size[]> GetAllSizesAsync()
        {
            IQueryable<Size> query = _context.Sizes.OrderBy(c => c.Description);

            return await query.ToArrayAsync();
        }
        public async Task<Size[]> GetSizesByCategoryIdAsync(int categoryId)
        {
            IQueryable<Size> query = _context.Sizes.Where(s => s.CategoryId == categoryId);

            return await query.ToArrayAsync();
        }
        public void AddSize(Size size)
        {
            throw new NotImplementedException();
        }
        public void DeleteSize(Size size)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region =============ZipCodes=====================
        public async Task<ZipCode[]> GetZipCodesByRestaurantIdAsync(int restaurantId)
        {
            throw new NotImplementedException();
        }
        public void AddZipCode(ZipCode zipCode)
        {
            throw new NotImplementedException();
        }
        public void DeleteZipCode(ZipCode zipCode)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region =============RESTAURANTS=====================
        public async Task<RestaurantInfo[]> GetRestaurantsAsync()
        {
            throw new NotImplementedException();
        }
        public void AddRestaurantInfo(RestaurantInfo restaurantInfo)
        {
            throw new NotImplementedException();
        }
        public void DeleteRestaurantInfo(RestaurantInfo restaurantInfo)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region =============ORDERS=====================
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
                .Include(d => d.Order)
                .Include(d => d.CustomerInfo)
                .Include(d => d.Dish);

            return await query.ToArrayAsync();
        }
        #endregion

        #region =============OPTIONS=====================
        public void AddOption(Option o)
        {
            throw new NotImplementedException();
        }
        public async Task<Option[]> GetOptionByDishId(int dishId)
        {
            IQueryable<Option> query = _context.Options.Where(o => o.DishId == dishId);

            return await query.ToArrayAsync();
        }
        #endregion
    }
}
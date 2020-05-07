using ngHealthyGarden.Models.IdentityModels;
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
        private readonly ApplicationDbContext _app;
        private readonly Entities _entities;
        public HGRepository(HGDbContext context, ApplicationDbContext app)
        {
            _context = context;
            _app = app;
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        #region =============DISHES=====================
        public void AddDish(Dish dish)
        {
            _context.Dishes.Add(dish);
        }
        public void DeleteDish(Dish dish)
        {
            _context.Dishes.Remove(dish);
        }
        public async Task<Dish[]> GetAllDishesAsync()
        {
            IQueryable<Dish> query = _context.Dishes.OrderBy(c => c.DishName);

            return await query.ToArrayAsync();
        }
        public async Task<Dish> GetDishAsync(string dishName)
        {
            IQueryable<Dish> query = _context.Dishes;

            query = query.Where(c => c.DishName == dishName);

            return await query.FirstOrDefaultAsync();
        }
        public Task<Dish> GetDishById(int dishId)
        {
            return _context.Dishes.FirstOrDefaultAsync(d => d.DishId == dishId);
        }
        #endregion

        #region =============CATEGORIES=================
        public async Task<Category[]> GetAllCategoriesAsync()
        {
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
        public async Task<Category> GetCategoryByIdAsync(int categoryId)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.CategoryId == categoryId);
        }
        public void AddCategory(Category category)
        {
            _context.Categories.Add(category);
        }
        public void DeleteCategory(Category category)
        {
            _context.Categories.Remove(category);
        }
        #endregion

        #region =============ITEMS======================
        public async Task<Item[]> GetAllItemsAsync()
        {
            IQueryable<Item> query = _context.Items.OrderBy(i => i.Description);

            return await query.ToArrayAsync();
        }
        public async Task<Item> GetItemsByIdAsync(int itemId)
        {
            return await _context.Items.FirstOrDefaultAsync(i => i.ItemId == itemId);
        }
        public async Task<Item[]> GetItemsByItemCategoryIdAsync(int itemCategoryId)
        {
            return await _context.Items
                .Where(i => i.ItemCategoryId == itemCategoryId)
                .OrderBy(i => i.Description)
                .ToArrayAsync();
        }
        public Item[] GetItemsByDishNameAsync(string dishName)
        {
            var query = _context.spGetItemsRelatedToADish(dishName);

            return query.ToArray();
        }
        public void AddItem(Item item)
        {
            var query = _context.Items.Add(item);
        }
        public void AddItemsToADish(Item[] items, int dishId)
        {
            var dish = _context.Dishes.Where(d => d.DishId == dishId).FirstOrDefault();
            foreach (var item in items)
            {
                _context.Entry(item).State = EntityState.Unchanged;
                _context.Entry(dish).State = EntityState.Unchanged;
                dish.Items.Add(item);
                item.Dishes.Add(dish);
            }
        }
        public void DeleteItemFromADish(int itemId, int dishId)
        {
            _context.spDeleteItemDish(dishId, itemId);
        }
        public void DeleteItem(Item item)
        {
            _context.Items.Remove(item);
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
        public async Task<Side> GetSideById(int sideId){
            return await _context.Sides.FirstOrDefaultAsync(s => s.SideId == sideId);
        }
        public void AddSide(Side side)
        {
            _context.Sides.Add(side);
        }
        public void DeleteSide(Side side)
        {
            _context.Sides.Remove(side);
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
            _context.Sizes.Add(size);
        }
        public void DeleteSize(Size size)
        {
            _context.Sizes.Remove(size);
        }
        #endregion

        #region =============ZipCodes=====================
        public async Task<ZipCode[]> GetZipCodesByRestaurantIdAsync(int restaurantId)
        {
            return await _context.ZipCodes.Where(z => z.RestaurantId == restaurantId).ToArrayAsync();
        }
        public void AddZipCode(ZipCode zipCode)
        {
            _context.ZipCodes.Add(zipCode);
        }
        public void DeleteZipCode(ZipCode zipCode)
        {
            _context.ZipCodes.Remove(zipCode);
        }
        public async Task<ZipCode> GetRestaurantByZipCodeAsync(string zipCode)
        {
            return await _context.ZipCodes.Where(z => z.ZipCode1 == zipCode)
                .Include(z => z.RestaurantInfo)
                .Include(z => z.AddressInfoes).FirstOrDefaultAsync();
        }
        public async Task<ZipCode[]> GetAllZipCodesAsync()
        {
            return await _context.ZipCodes.OrderBy(z => z.ZipCode1).ToArrayAsync();
        }

        public async Task<ZipCode> GetZipCodeById(int zipCodeId)
        {
            return await _context.ZipCodes.FirstOrDefaultAsync(z => z.ZipCodeId == zipCodeId);
        }
        #endregion

        #region =============RESTAURANTS=====================
        public async Task<RestaurantInfo[]> GetRestaurantsAsync()
        {
            return await _context.RestaurantInfo.Select(c => c).ToArrayAsync();
        }
        public void AddRestaurantInfo(RestaurantInfo restaurantInfo)
        {
            _context.RestaurantInfo.Add(restaurantInfo);
        }
        public void DeleteRestaurantInfo(RestaurantInfo restaurantInfo)
        {
            _context.RestaurantInfo.Remove(restaurantInfo);
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
                _context.Entry(od).State = EntityState.Unchanged;
                var query = _context.OrderDetails.Add(od);
                query.OrderId = orderId;
                query.CommentId = od.CommentId;
            }
        }
        public async Task<Order> GetOrderDetailsByOrderId(int orderId)
        {
            IQueryable<Order> query = _context.Orders.Where(s => s.OrderId == orderId)
                .Include(d => d.OrderDetails).Distinct();

            return await query.FirstOrDefaultAsync();
        }
        public void DeleteOrderAndRelatedOrderDetails(OrderDetail od)
        {
            var order = _context.Orders.Where(o => o.OrderId == od.OrderId).FirstOrDefault();
            var comment = _context.Comments.Where(c => c.CommentId == od.CommentId).FirstOrDefault();

            _context.Comments.Remove(comment);
            _context.OrderDetails.Remove(od);
            _context.Orders.Remove(order);
        }
        public async Task<OrderDetail[]> GetAllOrdersWithDetailsAsync()
        {
            return await _context.OrderDetails.Select(o => o)
                .Include(o => o.Comment).Include(o => o.Items)
                .Include(o => o.CustomerInfo).Include(o => o.Option)
                .Include(o => o.Dish).Include(o => o.Order)
                .Include(o => o.OrderType).Include(o => o.Side)
                .Include(o => o.Size).ToArrayAsync();
        }
        #endregion

        #region =============OPTIONS=====================
        public void AddOption(Option option)
        {
            _context.Options.Add(option);
        }
        public async Task<Option[]> GetOptionByDishId(int dishId)
        {
            IQueryable<Option> query = _context.Options.Where(o => o.DishId == dishId);

            return await query.ToArrayAsync();
        }
        public void DeleteOption(Option option)
        {
            _context.Options.Remove(option);
        }
        public async Task<Option[]> GetAllOptionsAsync()
        {
            return await _context.Options.Select(o => o).ToArrayAsync();
        }
        #endregion

        #region =============COMMENTS=====================
        public void AddComment(Comment c)
        {
            _context.Comments.Add(c);
        }
        public Task<Comment[]> GetAllCommentsAsync()
        {
            throw new NotImplementedException();
        }
        public void DeleteComment(int commentId)
        {
            var comment = _context.Comments.Where(c => c.CommentId == commentId).FirstOrDefault();
            _context.Comments.Remove(comment);
        }
        public Comment GetCommentById(int commentId)
        {
            return _context.Comments.Where(c => c.CommentId == commentId).FirstOrDefault();
        }
        #endregion

        #region =============CUSTOMER_INFO=====================
        public void AddCustomer(CustomerInfo customerInfo)
        {
            _context.CustomerInfo.Add(customerInfo);
        }
        public void DeleteCustomer(CustomerInfo customerInfo)
        {
            _context.CustomerInfo.Remove(customerInfo);
        }
        public async Task<CustomerInfo[]> GetAllCustomersAsync()
        {
            return await _context.CustomerInfo.Select(c => c).ToArrayAsync();
        }
        public async Task<CustomerInfo> GetCustomerWithAddressByCustomerId(int customerId)
        {
            IQueryable<CustomerInfo> query = _context.CustomerInfo
                .Where(c => c.CustomerInfoId == customerId)
                .Include(c => c.AddressInfoes);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<OrderDetail[]> GetOrderedDishesByCustomerId(int customerId)
        {
            var query = _context.OrderDetails.Where(d => d.CustomerInfoId == customerId);

            return await query.ToArrayAsync();
        }
        #endregion

        #region =============ADDRESS=====================
        public async Task<AddressInfo[]> GetAllAddressesAsync()
        {
            return await _context.AddressInfo.Select(a => a).ToArrayAsync();
        }
        public async Task<AddressInfo> GetAddressInfoById(int customerInfoId)
        {
            return await _context.AddressInfo.FirstOrDefaultAsync(a => a.CustomerInfoId == customerInfoId);
        }
        public void AddAddress(AddressInfo addressInfo)
        {
            _context.AddressInfo.Add(addressInfo);
        }
        public void DeleteAddress(AddressInfo addressInfo)
        {
            _context.AddressInfo.Remove(addressInfo);
        }
        #endregion

        #region =============ITEM_CATEGORIES=====================
        public async Task<ItemCategory[]> GetAllItemCategoriesAsync()
        {
            return await _context.ItemCategories.Select(i => i).ToArrayAsync();
        }
        public void AddItemCategory(ItemCategory itemCategory)
        {
            _context.ItemCategories.Add(itemCategory);
        }
        public void DeleteItemCategory(ItemCategory itemCategory)
        {
            _context.ItemCategories.Remove(itemCategory);
        }
        #endregion

        #region =============USERS=====================
        public async Task<ApplicationUser> GetUserByPhone(string phoneNumber)
        {
            return await _app.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
        }
        public bool Exists(string phoneNumber)
        {
            return _app.Users.Any(u => u.PhoneNumber == phoneNumber);
        }
        #endregion

        #region =============ORDER_Types=====================
        public async Task<OrderType[]> GetOrderTypesAsync()
        {
            return await _context.OrderTypes.Select(o => o).ToArrayAsync();
        }
        #endregion
    }
}
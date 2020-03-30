using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ngHealthyGarden.Data
{
    public interface IHGRepository
    {
        Task<bool> SaveChangesAsync();

        #region =============DISHES=====================
        void AddDish(Dish dish);
        void DeleteDish(Dish dish);
        Task<Dish[]> GetAllDishesAsync();
        Task<Dish> GetDishAsync(string dishName);
        #endregion

        #region =============CATEGORIES=================
        void AddCategory(Category category);
        void DeleteCategory(Category category);
        Task<Category[]> GetAllCategoriesAsync();
        Task<Category> GetCategoryWithDishesByCategoryNameAsync(string category);
        #endregion

        #region =============ITEMS======================
        void AddItem(Item item);
        void DeleteItem(Item item);
        Task<Item[]> GetAllItemsAsync();
        Item[] GetItemsByDishNameAsync(string dishName);
        #endregion

        #region =============SIDES======================
        void AddSide(Side side);
        void DeleteSide(Side side);
        Task<Side[]> GetAllSidesAsync();
        Task<Side[]> GetAllSidesByCategoryIdAsync(int categoryId); 
        #endregion

        #region =============SIZES=====================
        void AddSize(Size size);
        void DeleteSize(Size size);
        Task<Size[]> GetAllSizesAsync();
        Task<Size[]> GetSizesByCategoryIdAsync(int categoryId);
        #endregion

        #region =============ZipCodes=====================
        void AddZipCode(ZipCode zipCode);
        void DeleteZipCode(ZipCode zipCode);
        Task<ZipCode[]> GetZipCodesByRestaurantIdAsync(int restaurantId);
        #endregion

        #region =============RESTAURANTS=====================
        void AddRestaurantInfo(RestaurantInfo restaurantInfo);
        void DeleteRestaurantInfo(RestaurantInfo restaurantInfo);
        Task<RestaurantInfo[]> GetRestaurantsAsync();
        #endregion

        #region =============ORDERS=====================
        void AddOrder(Order o);
        void AddOrderDetail(OrderDetail[] od, int orderId);
        Task<OrderDetail[]> GetOrderDetailsByOrderId(int orderId);
        #endregion

        #region =============OPTIONS=====================
        void AddOption(Option o);
        Task<Option[]> GetOptionByDishId(int dishId);
        #endregion
    }
}

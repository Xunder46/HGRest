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

        //=============DISHES=====================
        void AddDish(Dish camp);
        void DeleteDish(Dish camp);
        Task<Dish[]> GetAllDishesAsync();
        Task<Dish> GetDishAsync(string dishName);

        //=============CATEGORIES=================
        Task<Category[]> GetAllCategoriesAsync();
        Task<Category> GetCategoryWithDishesByCategoryNameAsync(string category);

        //=============ITEMS======================
        Task<Item[]> GetAllItemsAsync();
        Item[] GetItemsByDishNameAsync(string dishName);

        //=============SIDES======================
        Task<Side[]> GetAllSidesAsync();
        Task<Side[]> GetAllSidesByCategoryIdAsync(int categoryId);

        //=============SIZES=====================
        Task<Size[]> GetSizesByCategoryIdAsync(int categoryId);

        //=============ZipCodes=====================
        Task<ZipCode[]> GetZipCodesByRestaurantIdAsync(int restaurantId);

        //=============RESTAURANTS=====================
        Task<RestaurantInfo[]> GetRestaurantsAsync();

        //=============ORDERS=====================
        Task<OrderDetail[]> GetOrderDetailsByOrderId(int orderId);
        void AddOrder(Order o);
        void AddOrderDetail(OrderDetail[] od, int orderId);
    }
}

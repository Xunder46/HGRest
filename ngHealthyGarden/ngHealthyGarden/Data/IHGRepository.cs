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
        Task<Item[]> GetItemsByItemCategoryIdAsync(int itemCategoryId);
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
        void AddOrderDetail(OrderDetail[] ods, int orderId);
        void DeleteOrderAndRelatedOrderDetails(OrderDetail od);
        Task<OrderDetail[]> GetAllOrdersWithDetailsAsync();
        Task<OrderDetail[]> GetOrderDetailsByOrderId(int orderId);
        #endregion

        #region =============OPTIONS=====================
        void AddOption(Option o);
        void DeleteOption(Option option);
        Task<Option[]> GetAllOptionsAsync();
        Task<Option[]> GetOptionByDishId(int dishId);
        #endregion

        #region =============COMMENTS=====================
        void AddComment(Comment c);
        void DeleteComment(int commentId);
        Task<Comment[]> GetAllCommentsAsync();
        Comment GetCommentById(int commentId);
        #endregion

        #region =============CUSTOMER_INFO=====================
        void AddCustomer(CustomerInfo customerInfo);
        void DeleteCustomer(CustomerInfo customerInfo);
        Task<CustomerInfo[]> GetAllCustomersAsync();
        CustomerInfo GetCustomerWithAddressByCustomerId(int customerId);
        #endregion

        #region =============ADDRESS=====================
        Task<AddressInfo[]> GetAllAddressesAsync();
        void AddAddress(AddressInfo addressInfo);
        void DeleteAddress(AddressInfo addressInfo);
        #endregion

        #region =============ITEM_CATEGORIES=====================
        Task<ItemCategory[]> GetAllItemCategoriesAsync();
        void AddItemCategory(ItemCategory itemCategory);
        void DeleteItemCategory(ItemCategory itemCategory);
        #endregion

        #region =============USERS=====================
    
        
        #endregion

    }
}

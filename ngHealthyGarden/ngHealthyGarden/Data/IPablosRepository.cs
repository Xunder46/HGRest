using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ngHealthyGarden.Data
{
    public interface IPablosRepository
    {
        void AddDish(Dish camp);
        void DeleteDish(Dish camp);

        //Dishes
        Task<Dish[]> GetAllDishesAsync();
        Task<Dish> GetDishAsync(string dishName);

        //Categories
        Task<Category[]> GetAllCategoriesAsync();
        Task<Category> GetCategoryWithDishesByCategoryNameAsync(string category);

        //Items
        Task<Item[]> GetAllItemsAsync();

        Item[] GetItemsByDishIdAsync(string dishName);
    }
}

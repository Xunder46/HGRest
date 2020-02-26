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
        Task<Dish[]> GetAllDishesByCategoryIdAsync(int categoryId);
        Task<Dish> GetDishAsync(string dishName);

        Task<Category[]> GetAllCategoriesAsync();
        Task<Category> GetCategoryByNameAsync(string category);
    }
}

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
        void IHGRepository.AddDish(Dish camp)
        {
            throw new NotImplementedException();
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
        public async Task<Side[]> GetAllSidesByCategoryIdAsync(int categoryId)
        {
            IQueryable<Side> query = _context.Sides.Where(s => s.CategoryId == categoryId);

            return await query.ToArrayAsync();
        }
    }
}
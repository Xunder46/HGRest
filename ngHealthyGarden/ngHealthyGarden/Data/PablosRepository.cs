using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace ngHealthyGarden.Data
{
    public class PablosRepository : IPablosRepository
    {
        private readonly PablosDbContext _context;

        public PablosRepository(PablosDbContext context)
        {
            _context = context;
        }
        public void AddDish(Dish camp)
        {
            throw new NotImplementedException();
        }

        public void DeleteDish(Dish camp)
        {
            throw new NotImplementedException();
        }

        public async Task<Category[]> GetAllCategoriesAsync()
        {
            //getting categories with their dishes with their sizes, sides, etc...
            IQueryable<Category> query = _context.Categories
                .Include(c=>c.Dishes)
                .Include("Dishes.Size")
                .Include(c=>c.Dishes.Select(d=>d.Side))
                .Include(c => c.Dishes.Select(d => d.TortillaType));

            return await query.ToArrayAsync();
        }

        public async Task<Dish[]> GetAllDishesByCategoryIdAsync(int categoryId)
        
        {
            IQueryable<Dish> query = _context.Dishes.Where(d=>d.CategoryId== categoryId)
                .Include(d => d.Size)
                .Include(d => d.Side)
                .Include(d => d.TortillaType);

            query = query.OrderBy(c => c.DishName);

            return await query.ToArrayAsync();
        }

        public async Task<Category> GetCategoryByNameAsync(string category)
        {
            IQueryable<Category> query = _context.Categories.Include(c=>c.Dishes);

            query = query.Where(c => c.Description == category);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Dish> GetDishAsync(string dishName)
        {
            IQueryable<Dish> query = _context.Dishes;

            query = query.Where(c => c.DishName == dishName);

            return await query.FirstOrDefaultAsync();
        }

        void IPablosRepository.AddDish(Dish camp)
        {
            throw new NotImplementedException();
        }

    }
}
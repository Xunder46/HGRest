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

        public async Task<Dish[]> GetAllDishesAsync()
        
        {
            IQueryable<Dish> query = _context.Dishes
                .Include(d => d.Size)
                .Include(d => d.Side)
                .Include(d => d.TortillaType);

            query = query.OrderBy(c => c.DishName);

            return await query.ToArrayAsync();
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
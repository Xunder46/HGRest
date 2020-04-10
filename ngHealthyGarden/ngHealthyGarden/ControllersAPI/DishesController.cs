using AutoMapper;
using ngHealthyGarden.Data;
using ngHealthyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ngHealthyGarden.ControllersAPI
{
    [RoutePrefix("api/dishes")]
    public class DishesController : ApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public DishesController()
        {

        }

        public DishesController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [Route()]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllDishesAsync();

                if (result == null)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("{category}", Name = "GetDishes")]
        public async Task<IHttpActionResult> Get(string category)
        {
            try
            {
                var result = await _repo.GetCategoryWithDishesByCategoryNameAsync(category);

                if (result == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<CategoryModel>(result));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        public async Task<IHttpActionResult> Post(Dish dish)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _repo.AddDish(dish);

                    if (await _repo.SaveChangesAsync())
                    {
                        return Created("GetDishes", new { dishId = dish.DishId });
                    }
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }

        [Route()]
        public async Task<IHttpActionResult> Delete(Dish dish)
        {
            try
            {
                var comment = _repo.GetDishAsync(dish.DishName);
                if (comment == null) return NotFound();

                _repo.DeleteDish(dish);
                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
                else
                {
                    return InternalServerError();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}

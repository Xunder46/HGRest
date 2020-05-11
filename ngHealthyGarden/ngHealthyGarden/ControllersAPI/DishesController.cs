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
    public class DishesController : BaseApiController
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
                var mapped = _mapper.Map<IEnumerable<DishModel>>(result);

                if (mapped == null)
                {
                    return NotFound();
                }

                return Ok(mapped);
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

        [Route("dish/{dishId}")]
        public async Task<IHttpActionResult> Get(int dishId)
        {
            try
            {
                var result = await _repo.GetDishById(dishId);

                if (result == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<DishModel>(result));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("dish")]
        public async Task<IHttpActionResult> Post(Dish dish)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var dishToUpdate = _repo.GetDishById(dish.DishId).Result;
                    if (dishToUpdate != null)
                    {
                        dishToUpdate.DishName = dish.DishName;
                        dishToUpdate.CategoryId = dish.CategoryId;
                        dishToUpdate.Active = dish.Active;
                        dishToUpdate.Price = dish.Price;
                        if (_repo.SaveChanges())
                        {
                            return Ok(dishToUpdate);
                        }
                    }
                    else
                    {
                        _repo.AddDish(dish);
                        if (await _repo.SaveChangesAsync())
                        {
                            return Created("GetDishes", dish);
                        }
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

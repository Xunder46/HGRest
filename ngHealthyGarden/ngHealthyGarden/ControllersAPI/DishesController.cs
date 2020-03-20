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
        private readonly IHGRepository _pablos;
        private readonly IMapper _mapper;

        public DishesController(IHGRepository pablos, IMapper mapper)
        {
            _mapper = mapper;
            _pablos = pablos;
        }

        [Route()]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _pablos.GetAllDishesAsync();

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

        [Route("{category}")]
        public async Task<IHttpActionResult> Get(string category)
        {
            try
            {
                var result = await _pablos.GetCategoryWithDishesByCategoryNameAsync(category);

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
    }
}

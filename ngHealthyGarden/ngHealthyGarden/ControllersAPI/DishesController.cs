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
    [RoutePrefix("api/menu")]
    public class DishesController : ApiController
    {
        private readonly IPablosRepository _pablos;
        private readonly IMapper _mapper;

        public DishesController(IPablosRepository pablos, IMapper mapper)
        {
            _mapper = mapper;
            _pablos = pablos;
        }

        public async Task<IHttpActionResult> Get(int categoryId)
        {
            try
            {
                var result = await _pablos.GetAllDishesByCategoryIdAsync(categoryId);

                var mapped = _mapper.Map<IEnumerable<DishModel>>(result);

                return Ok(mapped);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
    }
}

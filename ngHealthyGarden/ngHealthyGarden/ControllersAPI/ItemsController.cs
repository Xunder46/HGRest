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
    [RoutePrefix("api/items")]
    public class ItemsController : ApiController
    {
        private readonly IPablosRepository _pablos;
        private readonly IMapper _mapper;

        public ItemsController()
        {

        }
        public ItemsController(IPablosRepository pablos, IMapper mapper)
        {
            _mapper = mapper;
            _pablos = pablos;
        }

        [Route()]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _pablos.GetAllItemsAsync();

                var mapped = _mapper.Map<IEnumerable<ItemModel>>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("{dishId}")]
        public async Task<IHttpActionResult> Get(int dishId)
        {
            try
            {
                var result = _pablos.GetItemsByDishIdAsync(dishId);

                var mapped = _mapper.Map<IEnumerable<ItemModel>>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}

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
    [RoutePrefix("api/options")]
    public class OptionsController : ApiController
    {
        private readonly IHGRepository _pablos;
        private readonly IMapper _mapper;

        public OptionsController()
        {

        }
        public OptionsController(IHGRepository pablos, IMapper mapper)
        {
            _mapper = mapper;
            _pablos = pablos;
        }

        [Route("{dishId}")]
        public async Task<IHttpActionResult> Get(int dishId)
        {
            try
            {
                var result = await _pablos.GetOptionByDishId(dishId);

                var mapped = _mapper.Map<IEnumerable<OptionModel>>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}

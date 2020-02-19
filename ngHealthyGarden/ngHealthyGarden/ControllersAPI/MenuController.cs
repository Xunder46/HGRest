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

namespace ngHealthyGarden
{
    public class MenuController : ApiController
    {
        private readonly IPablosRepository _pablos;
        private readonly IMapper _mapper;

        public MenuController()
        {

        }
        public MenuController(IPablosRepository pablos, IMapper mapper)
        {
            _mapper = mapper;
            _pablos = pablos;
        }

        // GET api/<controller>
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _pablos.GetAllDishesAsync();

                var mapped = _mapper.Map<IEnumerable<DishModel>>(result);

                return Ok(mapped);
            }
            catch (Exception)
            {
                return BadRequest();
            }
            
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
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
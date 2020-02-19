using ngHealthyGarden.Data;
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

        public MenuController()
        {

        }
        public MenuController(IPablosRepository pablos)
        {
            _pablos = pablos;
        }

        // GET api/<controller>
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _pablos.GetAllDishesAsync();
                return Ok(result);
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
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
    [RoutePrefix("api/menu")]
    public class MenuController : ApiController
    {
        private readonly IHGRepository _pablos;
        private readonly IMapper _mapper;

        public MenuController()
        {

        }
        public MenuController(IHGRepository pablos, IMapper mapper)
        {
            _mapper = mapper;
            _pablos = pablos;
        }

        // GET api/<controller>
        [Route()]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _pablos.GetAllCategoriesAsync();

                var mapped = _mapper.Map<IEnumerable<CategoryModel>>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // GET api/<controller>/category
        

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
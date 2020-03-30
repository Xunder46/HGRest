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
    [RoutePrefix("api/sizes")]
    public class SizeController : ApiController
    {
        private readonly IHGRepository _pablos;
        private readonly IMapper _mapper;

        public SizeController()
        {

        }
        public SizeController(IHGRepository pablos, IMapper mapper)
        {
            _mapper = mapper;
            _pablos = pablos;
        }

        [Route("{categoryId}")]
        public async Task<IHttpActionResult> Get(int categoryId)
        {
            try
            {
                var result = await _pablos.GetSizesByCategoryIdAsync(categoryId);

                var mapped = _mapper.Map<IEnumerable<SizeModel>>(result);

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

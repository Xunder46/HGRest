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
    [RoutePrefix("api/restaurants")]
    public class RestaurantController : BaseApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public RestaurantController()
        {

        }
        public RestaurantController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [Route()]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _repo.GetRestaurantsAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("{zipcode}")]
        public async Task<IHttpActionResult> Get(string zipCode)
        {
            try
            {
                var result = await _repo.GetRestaurantByZipCodeAsync(zipCode);
                var mapped = _mapper.Map<ZipCodeModel>(result);

                if (mapped != null)
                {
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }
    }
}

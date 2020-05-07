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
    [RoutePrefix("api/users")]
    public class UsersController : BaseApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public UsersController()
        {

        }

        public UsersController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [Route("ordereddishes/{customerInfoId}")]
        public async Task<IHttpActionResult> Get(int customerInfoId)
        {
            try
            {
                var result = await _repo.GetOrderedDishesByCustomerId(customerInfoId);
                var mapped = _mapper.Map<IEnumerable<OrderDetailModel>>(result);

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
    }
}

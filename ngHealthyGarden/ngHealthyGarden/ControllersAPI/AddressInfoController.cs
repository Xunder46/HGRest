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
    [RoutePrefix("api/addressinfo")]
    public class AddressInfoController : ApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public AddressInfoController()
        {

        }
        public AddressInfoController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [Route("{customerInfoId}")]
        public async Task<IHttpActionResult> Get(int customerInfoId)
        {
            try
            {
                var result = await _repo.GetAddressInfoById(customerInfoId);
                var mapped = _mapper.Map<AddressInfoModel>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}

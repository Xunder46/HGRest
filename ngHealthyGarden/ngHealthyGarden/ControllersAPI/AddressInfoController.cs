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
    public class AddressInfoController : BaseApiController
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

        [Route()]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllAddressesAsync();
                var mapped = _mapper.Map<IEnumerable<AddressInfoModel>>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("{customerInfoId}", Name = "GetAddress")]
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

        [Route()]
        public async Task<IHttpActionResult> Post(AddressInfoModel address)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var addressInfo = _mapper.Map<AddressInfo>(address);

                    _repo.AddAddress(addressInfo);

                    if (await _repo.SaveChangesAsync())
                    {
                        return Created("GetAddress", new { addressInfoId = addressInfo.AddressInfoId });
                    }
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

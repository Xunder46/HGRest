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
    [RoutePrefix("api/customers")]
    public class CustomerInfoController : BaseApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public CustomerInfoController()
        {

        }
        public CustomerInfoController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [Route(Name = "GetCustomers")]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllCustomersAsync();

                if (result == null)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("{customerInfoId}")]
        public async Task<IHttpActionResult> Get(int customerInfoId)
        {
            try
            {
                var result = await _repo.GetCustomerWithAddressByCustomerId(customerInfoId);
                var mapped = _mapper.Map<CustomerInfoModel>(result);

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

        [Route()]
        public async Task<IHttpActionResult> Post(CustomerInfo customer)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _repo.AddCustomer(customer);

                    if (await _repo.SaveChangesAsync())
                    {
                        return Created("GetCustomers", new { customerInfoId = customer.CustomerInfoId });
                    }
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }

        [Route("{customer}")]
        public async Task<IHttpActionResult> Put(CustomerInfoModel customer)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var c = await _repo.GetCustomerWithAddressByCustomerId(customer.CustomerInfoId);
                    if (c == null) return NotFound();

                    _mapper.Map(customer, c);

                    if (await _repo.SaveChangesAsync())
                    {
                        return Ok(_mapper.Map<CustomerInfoModel>(c));
                    }
                    else
                    {
                        return InternalServerError();
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }

        [Route()]
        public async Task<IHttpActionResult> Delete(CustomerInfo customer)
        {
            try
            {
                var c = _repo.GetCustomerWithAddressByCustomerId(customer.CustomerInfoId);
                if (c == null) return NotFound();

                _repo.DeleteCustomer(customer);
                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
                else
                {
                    return InternalServerError();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}

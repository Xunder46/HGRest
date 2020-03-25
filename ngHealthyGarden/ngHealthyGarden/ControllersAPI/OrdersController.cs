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
    [RoutePrefix("api/orders")]
    public class OrdersController : ApiController
    {
        private readonly IHGRepository _pablos;
        private readonly IMapper _mapper;

        public OrdersController()
        {

        }
        public OrdersController(IHGRepository pablos, IMapper mapper)
        {
            _mapper = mapper;
            _pablos = pablos;
        }


        [Route("{orderId}", Name = "GetOrder")]
        public async Task<IHttpActionResult> Get(int orderId)
        {
            try
            {
                var result = await _pablos.GetOrderDetailsByOrderId(orderId);

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

        [Route()]
        public async Task<IHttpActionResult> Post(OrderModel o)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var order = _mapper.Map<Order>(o);

                    _pablos.AddOrder(order);

                    if (await _pablos.SaveChangesAsync())
                    {
                        var newOrderModel = _mapper.Map<OrderModel>(order);
                        return Created("GetOrder", new { orderId = newOrderModel.OrderId });
                    }
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }

        [Route("{orderId}")]
        public async Task<IHttpActionResult> Post(int orderId, OrderDetail[] ods)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _pablos.AddOrderDetail(ods, orderId);

                    if (await _pablos.SaveChangesAsync())
                    {
                        return Created("GetOrder", new { orderId = orderId });
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

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
    public class OrdersController : BaseApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public OrdersController()
        {

        }
        public OrdersController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }


        [Route("{orderId}", Name = "GetOrder")]
        public async Task<IHttpActionResult> Get(int orderId)
        {
            try
            {
                var result = await _repo.GetOrderDetailsByOrderId(orderId);
                var mapped = _mapper.Map<OrderModel>(result);

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
        public async Task<IHttpActionResult> Post(OrderModel o)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var order = _mapper.Map<Order>(o);

                    _repo.AddOrder(order);

                    if (await _repo.SaveChangesAsync())
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
        public async Task<IHttpActionResult> Post(int orderId, OrderDetailModel[] ods)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var orderDetail = _mapper.Map<OrderDetail[]>(ods);

                    _repo.AddOrderDetail(orderDetail, orderId);

                    if (await _repo.SaveChangesAsync())
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

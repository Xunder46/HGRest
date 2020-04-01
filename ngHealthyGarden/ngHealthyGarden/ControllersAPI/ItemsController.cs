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
    [RoutePrefix("api/items")]
    public class ItemsController : ApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public ItemsController()
        {

        }
        public ItemsController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [Route()]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllItemsAsync();

                var mapped = _mapper.Map<IEnumerable<ItemModel>>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("{dishName}", Name ="GetItem")]
        public async Task<IHttpActionResult> Get(string dishName)
        {
            try
            {
                var result = _repo.GetItemsByDishNameAsync(dishName);

                var mapped = _mapper.Map<IEnumerable<ItemModel>>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route()]
        public async Task<IHttpActionResult> Post(ItemModel i)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var item = _mapper.Map<Item>(i);

                    _repo.AddItem(item);

                    if (await _repo.SaveChangesAsync())
                    {
                        var newOrderModel = _mapper.Map<ItemModel>(item);
                        return Created("GetItem", new { itemId = newOrderModel.ItemId });
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

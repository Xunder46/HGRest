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
    public class ItemsController : BaseApiController
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

        [Route("{dishName}", Name ="GetItems")]
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
        public async Task<IHttpActionResult> Post(ItemModel item)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var itemToUpdate = _repo.GetItemsByIdAsync(item.ItemId).Result;
                    if (itemToUpdate != null)
                    {
                        itemToUpdate.Description = item.Description;
                        itemToUpdate.ItemCategoryId = item.ItemCategoryId;
                        itemToUpdate.Price = item.Price;
                        if (_repo.SaveChanges())
                        {
                            return Ok(itemToUpdate);
                        }
                    }
                    else
                    {
                       var mapped = _mapper.Map<Item>(item);
                        _repo.AddItem(mapped);
                        if (await _repo.SaveChangesAsync())
                        {
                            return Created("GetItems", mapped);
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }

        [Route("{dishId}")]
        public async Task<IHttpActionResult> Post(int dishId, ItemModel[] itemsModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var items = _mapper.Map<Item[]>(itemsModel);

                    _repo.AddItemsToADish(items, dishId);

                    if (await _repo.SaveChangesAsync())
                    {
                        return Created("GetItems", dishId);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }

        [Route("dish/{dishId}/item/{itemId}")]
        public async Task<IHttpActionResult> Delete(int dishId, int itemId)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _repo.DeleteItemFromADish(itemId, dishId);

                    if (_repo.SaveChanges())
                    {
                        return Ok();
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

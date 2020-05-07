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
    [RoutePrefix("api/itemcategories")]
    public class ItemCategoryController : BaseApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public ItemCategoryController()
        {

        }
        public ItemCategoryController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [Route(Name = "GetItemCategories")]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllItemCategoriesAsync();
                //var mapped = _mapper.Map<ItemCategoryModel>(result);

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
        public async Task<IHttpActionResult> Post(ItemCategoryModel ic)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var mapped = _mapper.Map<ItemCategory>(ic);
                    _repo.AddItemCategory(mapped);

                    if (await _repo.SaveChangesAsync())
                    {
                        return Created("GetItemCategories", mapped.ItemCategoryId);
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

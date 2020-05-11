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
    [RoutePrefix("api/categories")]
    public class CategoryController : BaseApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public CategoryController()
        {

        }

        public CategoryController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [Route("{categoryId}", Name ="GetCategory")]
        public async Task<IHttpActionResult> Get(int categoryId)
        {
            try
            {
                var result = await _repo.GetCategoryByIdAsync(categoryId);

                if (result == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<CategoryModel>(result));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("category")]
        public async Task<IHttpActionResult> Post(Category category)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var categoryToUpdate = _repo.GetCategoryByIdAsync(category.CategoryId).Result;
                    if (categoryToUpdate != null)
                    {
                        categoryToUpdate.Description = category.Description;
                        categoryToUpdate.Active = category.Active;
                        if (_repo.SaveChanges())
                        {
                            return Ok(categoryToUpdate);
                        }
                    }
                    else
                    {
                        _repo.AddCategory(category);
                        if (await _repo.SaveChangesAsync())
                        {
                            return Created("GetCategory", category);
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
    }
}

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
    [RoutePrefix("api/sides")]
    public class SidesController : BaseApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public SidesController()
        {

        }
        public SidesController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [Route()]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllSidesAsync();

                var mapped = _mapper.Map<IEnumerable<SideModel>>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("{categoryId}", Name ="GetSides")]
        public async Task<IHttpActionResult> Get(int categoryId)
        {
            try
            {
                var result = await _repo.GetAllSidesByCategoryIdAsync(categoryId);

                var mapped = _mapper.Map<IEnumerable<SideModel>>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route()]
        public async Task<IHttpActionResult> Post(SideModel side)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var sideToUpdate = _repo.GetSideById(side.SideId).Result;
                    if (sideToUpdate != null)
                    {
                        sideToUpdate.Description = side.Description;
                        sideToUpdate.CategoryId = side.CategoryId;
                        sideToUpdate.Price = side.Price;
                        sideToUpdate.Active = side.Active;
                        if (_repo.SaveChanges())
                        {
                            return Ok(sideToUpdate);
                        }
                    }
                    else
                    {
                        var mapped = _mapper.Map<Side>(side);
                        _repo.AddSide(mapped);
                        if (await _repo.SaveChangesAsync())
                        {
                            return Created("GetSides", mapped);
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

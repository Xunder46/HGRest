﻿using AutoMapper;
using ngHealthyGarden.ControllersAPI;
using ngHealthyGarden.Data;
using ngHealthyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ngHealthyGarden
{
    [RoutePrefix("api/menu")]
    [AllowAnonymous]
    public class MenuController : BaseApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public MenuController()
        {

        }
        public MenuController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        // GET api/<controller>
        [Route()]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllCategoriesAsync();

                var mapped = _mapper.Map<IEnumerable<CategoryModel>>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
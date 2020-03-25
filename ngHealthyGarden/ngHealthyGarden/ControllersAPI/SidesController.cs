﻿using AutoMapper;
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
    public class SidesController : ApiController
    {
        private readonly IHGRepository _pablos;
        private readonly IMapper _mapper;

        public SidesController()
        {

        }
        public SidesController(IHGRepository pablos, IMapper mapper)
        {
            _mapper = mapper;
            _pablos = pablos;
        }
        [Route()]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _pablos.GetAllSidesAsync();

                var mapped = _mapper.Map<IEnumerable<SideModel>>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("{categoryId}")]
        public async Task<IHttpActionResult> Get(int categoryId)
        {
            try
            {
                var result = await _pablos.GetAllSidesByCategoryIdAsync(categoryId);

                var mapped = _mapper.Map<IEnumerable<SideModel>>(result);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
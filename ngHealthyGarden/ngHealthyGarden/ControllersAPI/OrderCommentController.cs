using AutoMapper;
using ngHealthyGarden.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ngHealthyGarden.ControllersAPI
{

    [RoutePrefix("api/ordercomments")]
    public class OrderCommentController : BaseApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public OrderCommentController()
        {

        }
        public OrderCommentController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [Route()]
        public async Task<IHttpActionResult> Post(OrderComment comment)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _repo.AddOrderComment(comment);
                    if (await _repo.SaveChangesAsync())
                    {
                        return Created("", comment);
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

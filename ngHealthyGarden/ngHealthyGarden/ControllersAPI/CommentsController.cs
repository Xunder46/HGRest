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
    [RoutePrefix("api/comments")]
    public class CommentsController : BaseApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public CommentsController()
        {

        }
        public CommentsController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [Route(Name = "GetComments")]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllCommentsAsync();

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
        public async Task<IHttpActionResult> Post(Comment comment)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _repo.AddComment(comment);

                    if (await _repo.SaveChangesAsync())
                    {
                        return Created("GetComments", new { commentId = comment.CommentId });
                    }
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }

        [Route("commentId")]
        public async Task<IHttpActionResult> Delete(int commentId)
        {
            try
            {
                var comment = _repo.GetCommentById(commentId);
                if (comment == null) return NotFound();

                _repo.DeleteComment(commentId);
                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
                else
                {
                    return InternalServerError();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}

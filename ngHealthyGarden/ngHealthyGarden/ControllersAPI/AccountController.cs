using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using AutoMapper;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using ngHealthyGarden.App_Start;
using ngHealthyGarden.Data;
using ngHealthyGarden.Models.IdentityModels;
using ngHealthyGarden.Providers;
using ngHealthyGarden.Results;

namespace ngHealthyGarden.ControllersAPI
{

    [RoutePrefix("api/account")]
    public class AccountController : BaseApiController
    {
        private readonly IHGRepository _repo;
        private readonly IMapper _mapper;

        public AccountController()
        {

        }
        public AccountController(IHGRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [Route("users")]
        [Authorize(Roles = "Manager")]
        public IHttpActionResult GetUsers()
        {
            return Ok(this.AppUserManager.Users.ToList().Select(u => this.TheModelFactory.Create(u)));
        }

        [Route("user/{id:guid}", Name = "GetUserById")]
        [Authorize(Roles = "Manager")]
        public async Task<IHttpActionResult> GetUser(string Id)
        {
            var user = await this.AppUserManager.FindByIdAsync(Id);

            if (user != null)
            {
                return Ok(this.TheModelFactory.Create(user));
            }

            return NotFound();
        }

        [Route("user/{username}")]
        [Authorize(Roles = "Manager")]
        public async Task<IHttpActionResult> GetUserByName(string username)
        {
            var user = await this.AppUserManager.FindByNameAsync(username);

            if (user != null)
            {
                return Ok(this.TheModelFactory.Create(user));
            }

            return NotFound();
        }

        [Route("{phoneNumber}")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> GetUserByPhone(string phoneNumber)
        {
            var user = await _repo.GetUserByPhone(phoneNumber);

            return Ok(user);

        }

        [Route("create")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> CreateUser(CreateUserBindingModel createUserModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_repo.Exists(createUserModel.PhoneNumber))
            {
                return BadRequest("Phone number is already taken");
            }

            var user = new ApplicationUser()
            {
                UserName = createUserModel.UserName,
                Email = createUserModel.Email,
                CustomerInfoId = createUserModel.CustomerInfoId,
                JoinDate = DateTime.Now.Date,
                PhoneNumber = createUserModel.PhoneNumber,
                EmailConfirmed = true
            };

            IdentityResult addUserResult = await AppUserManager.CreateAsync(user, createUserModel.Password);

            if (addUserResult.Succeeded)
            {
                IdentityResult addRoleResult = await AppUserManager.AddToRoleAsync(user.Id, "Customer");
                if (!addRoleResult.Succeeded)
                {
                    return GetErrorResult(addRoleResult);
                }
            }
            else
            {
                return GetErrorResult(addUserResult);
            }

            string code = await this.AppUserManager.GenerateEmailConfirmationTokenAsync(user.Id);

            var callbackUrl = new Uri(Url.Link("ConfirmEmailRoute", new { userId = user.Id, code = code }));

            //TODO: Uncomment to send email confirmations
            //await this.AppUserManager.SendEmailAsync(user.Id, "Confirm your account"
            //, "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

            Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

            return Created(locationHeader, TheModelFactory.Create(user));
        }

        [Route("update")]
        //[Authorize()]
        [HttpPut]
        public async Task<IHttpActionResult> UpdateUser(UpdateUserBindingModel updateUserModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var u = AppUserManager.FindByName(updateUserModel.Username);
            if (updateUserModel.CustomerInfoId > 0)
            {
                u.CustomerInfoId = updateUserModel.CustomerInfoId;
            }
            else if (updateUserModel.PhoneNumber != null)
            {
                u.PhoneNumber = updateUserModel.PhoneNumber;
            }

            IdentityResult updateUserResult = await AppUserManager.UpdateAsync(u);
            if (updateUserResult.Succeeded)
            {
                Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = u.Id }));

                return Created(locationHeader, TheModelFactory.Create(u));
            }
            else
            {
                return GetErrorResult(updateUserResult);
            }
        }

        //TODO: make it post and add password to the signature so to confirm if the user is the user
        [HttpGet]
        [Route("ConfirmEmail", Name = "ConfirmEmailRoute")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> ConfirmEmail(string userId = "", string code = "")
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(code))
            {
                ModelState.AddModelError("", "User Id and Code are required");
                return BadRequest(ModelState);
            }

            IdentityResult result = await this.AppUserManager.ConfirmEmailAsync(userId, code);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return GetErrorResult(result);
            }
        }

        [Route("ChangePassword")]
        //[Authorize]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await AppUserManager.FindByNameAsync(model.Username);
            IdentityResult result = await AppUserManager.ChangePasswordAsync(user.Id, model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        [Route("user/{id:guid}")]
        [Authorize(Roles = "Manager")]
        public async Task<IHttpActionResult> DeleteUser(string id)
        {

            //Only SuperAdmin or Admin can delete users (Later when implement roles)

            var appUser = await this.AppUserManager.FindByIdAsync(id);

            if (appUser != null)
            {
                IdentityResult result = await this.AppUserManager.DeleteAsync(appUser);

                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }

                return Ok();

            }
            return NotFound();
        }

        [Authorize(Roles = "Manager")]
        [Route("user/{id:guid}/roles")]
        [HttpPut]
        public async Task<IHttpActionResult> AssignRolesToUser([FromUri] string id, [FromBody] string[] rolesToAssign)
        {

            var appUser = await this.AppUserManager.FindByIdAsync(id);

            if (appUser == null)
            {
                return NotFound();
            }

            var currentRoles = await this.AppUserManager.GetRolesAsync(appUser.Id);

            var rolesNotExists = rolesToAssign.Except(this.AppRoleManager.Roles.Select(x => x.Name)).ToArray();

            if (rolesNotExists.Count() > 0)
            {

                ModelState.AddModelError("", string.Format("Roles '{0}' does not exixts in the system", string.Join(",", rolesNotExists)));
                return BadRequest(ModelState);
            }

            IdentityResult removeResult = await this.AppUserManager.RemoveFromRolesAsync(appUser.Id, currentRoles.ToArray());

            if (!removeResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to remove user roles");
                return BadRequest(ModelState);
            }

            IdentityResult addResult = await this.AppUserManager.AddToRolesAsync(appUser.Id, rolesToAssign);

            if (!addResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to add user roles");
                return BadRequest(ModelState);
            }

            return Ok();
        }

        [HttpGet]
        [Route("userclaims")]
        public CreateUserBindingModel GetUserClaims()
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            IEnumerable<Claim> claims = principal.Claims;
            CreateUserBindingModel user = new CreateUserBindingModel();
            user.UserName = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
            user.Email = claims.FirstOrDefault(c => c.Type == "Email")?.Value;
            user.RoleName = claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;
            user.PhoneNumber = claims.FirstOrDefault(c => c.Type == "PhoneNumber").Value;
            var id = 0;
            int.TryParse(claims.FirstOrDefault(c => c.Type == "CustomerInfoId")?.Value, out id);
            user.CustomerInfoId = id;
            return user;
        }
    }
}

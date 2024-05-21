using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NS2Nexus.Server.BLL.Interfaces;
using NS2Nexus.Server.BLL.Logic;
using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private IUserLogic _userLogic;
        public UsersController(IUserLogic userLogic)
        {
            _userLogic = userLogic;
        }


        [HttpGet]
        public IEnumerable<User> Get()
        {
            IEnumerable<User> users = _userLogic.GetAllUsers(true);
            return users;
        }

        [HttpGet("{id}")]
        public User Get(int id)
        {
            User user = _userLogic.GetUserById(id);
            return user;
        }

        [HttpPost]
        public User Post([FromBody] User newUser)
        {
            User user = _userLogic.CreateUser(newUser);
            return user;
        }

        [HttpPut]
        public User Put([FromBody] User updatedUser)
        {
            User userToUpdate = _userLogic.EditUser(updatedUser);
            return userToUpdate;
        }

        [HttpDelete]
        public bool Delete(int id)
        {
            return _userLogic.DeleteUser(id);
        }
    }
}

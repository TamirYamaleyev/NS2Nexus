using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.BLL.Interfaces
{
    public interface IUserLogic
    {
        IEnumerable<User> GetAllUsers(bool includePassword = false);
        User GetUserById(int userId, bool includePassword = false);
        User CreateUser(User newUser);
        User EditUser(User editedUser);
        bool DeleteUser(int userId);
    }
}

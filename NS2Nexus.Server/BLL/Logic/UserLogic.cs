using Microsoft.EntityFrameworkCore;
using NS2Nexus.Server.BLL.Interfaces;
using NS2Nexus.Server.DAL.Interfaces;
using NS2Nexus.Server.Models;

namespace NS2Nexus.Server.BLL.Logic
{
    public class UserLogic : IUserLogic
    {
        private readonly IEntityBaseRepository<User> _userRepository;
        public UserLogic(IEntityBaseRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public IEnumerable<User> GetAllUsers(bool includePassword = false)
        {
            try
            {
                if (includePassword)
                {
                    var users = _userRepository.GetAll();
                    return users;
                }
                else
                {
                    var users = _userRepository.GetAll();
                    foreach (var user in users)
                    {
                        user.Password = "";
                    }
                    return users;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch users. Please try again later.");
            }
        }

        public User GetUserById(int userId, bool includePassword = false)
        {
            try
            {
                var user = _userRepository.GetSingle(userId);
                if (!includePassword)
                {
                    user.Password = "";
                }
                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch User. Please try again later.");
            }
        }

        public User CreateUser(User newUser)
        {
            try
            {
                var existingUser = _userRepository.FindBy(u => u.Email == newUser.Email);
                if (existingUser == null)
                {
                    _userRepository.Add(newUser);
                    return newUser;
                }
                throw new Exception("A User with that Email already exists.");
            }
            catch (DbUpdateException ex)
            {
                // Handle specific database-related exceptions
                // For example, constraint violations, concurrency issues, etc.
                Console.WriteLine("Inner Exception: " + ex.InnerException?.Message);

                throw new Exception("Failed to save changes to the database. Please try again later.\nError: " + ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create User. Please try again later.\nError: " + ex.Message);
            }
        }

        public User EditUser(User editedUser)
        {
            try
            {
                var user = _userRepository.GetSingle(editedUser.Id);
                
                user.Email = editedUser.Email;
                user.Username = editedUser.Username;
                user.Password = editedUser.Password;
                user.UserTypeId = editedUser.UserTypeId;
                user.PlayerId = editedUser.PlayerId;

                _userRepository.Edit(user);

                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to edit User. Please try again later.");
            }
        }

        public bool DeleteUser(int userId)
        {
            try
            {
                var user = _userRepository.GetSingle(userId);

                _userRepository.Delete(user);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to delete User. Please try again later.");
            }
        }
    }
}

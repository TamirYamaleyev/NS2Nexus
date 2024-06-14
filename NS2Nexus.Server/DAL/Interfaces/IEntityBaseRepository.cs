using Microsoft.EntityFrameworkCore.Storage;
using System.Data;
using System.Linq.Expressions;

namespace NS2Nexus.Server.DAL.Interfaces
{
    public interface IEntityBaseRepository<T> where T : class
    {
        // Gets the entire Data Set.
        IEnumerable<T> GetAll();

        // Gets a single object by its ID.
        T GetSingle(int id);

        // Find by a WHERE clause.
        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);

        // Finds by a WHERE clause and return a single object.
        T SingleFindBy(Expression<Func<T, bool>> predicate);

        // Adds an entity to a table.
        void Add(T entity);

        // Deletes an entity.
        bool Delete(T entity);

        // Updates an entity.
        bool Edit(T entity);

        // Runs an SQL command.
        void ExecuteSqlCommand(string sql, params object[] args);

        // Starts a DB Transaction
        public IDbContextTransaction BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted);

        // Truncates an entity's table.
        //void DeleteAll();
    }
}

using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NS2Nexus.Server.DAL.Interfaces;
using NS2Nexus.Server.Models;
using System.Linq.Expressions;

namespace NS2Nexus.Server.DAL.Repositories
{
    public class EntityBaseRepository<T> : IEntityBaseRepository<T> where T : class, IEntityBase
    {
        // DO NOT FORGET TO MOVE TO ENVIRONMENT VARIABLE!!!@@@@@@@

        private string _connectionString = "Data Source=DESKTOP-J4NPN92;Initial Catalog=NS2Nexus;Integrated Security=True;Trust Server Certificate=True;Encrypt=True;";

        private readonly Ns2nexusContext _context;
        private readonly DbSet<T> _dbSet;

        public object DbEntityEntry { get; private set; }

        public EntityBaseRepository(Ns2nexusContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _dbSet = context.Set<T>();
        }

        public virtual IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public virtual IEnumerable<T> GetAll(Func<T, bool> predicate)
        {
            return _dbSet.Where(predicate).ToList();
        }

        public T GetSingle(int id)
        {
            return GetAll().FirstOrDefault(x => x.Id == id);
        }
        public virtual IQueryable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate);
        }

        public virtual T SingleFindBy(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate).FirstOrDefault();
        }

        public virtual void Add(T entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();
        }

        public bool Delete(T entity)
        {
            _dbSet.Remove(entity);
            return _context.SaveChanges() > 0;
        }
        public bool Edit(T entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            return _context.SaveChanges() > 0;
        }
    }
}

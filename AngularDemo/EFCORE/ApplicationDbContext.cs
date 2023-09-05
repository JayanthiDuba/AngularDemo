using AngularDemo.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularDemo.EFCORE
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Roles> Roles { get; set; }
    }
}

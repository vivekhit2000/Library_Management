using Lm_Library_Management_Service_NET.Models;
using Microsoft.EntityFrameworkCore;

namespace Lm_Library_Management_Service_NET.DatabaseContext
{
    public class ApplicationDbContext : DbContext
    {
        internal object loginUser;

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public ApplicationDbContext()
        { }

        public virtual DbSet<Users> Users { get; set; }

        public virtual DbSet<Admins> Admin { get; set; }
        public virtual DbSet<loginUser> loginUsers { get; set; }

        public virtual DbSet<PlaceOrder> PlaceOrders { get; set; }
        public DbSet<Book> Books { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

       

    }
}

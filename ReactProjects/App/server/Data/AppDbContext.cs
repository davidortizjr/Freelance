using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Customer)
                .WithMany(c => c.Tickets)
                .HasForeignKey(t => t.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.AssignedToUser)
                .WithMany(u => u.AssignedTickets)
                .HasForeignKey(t => t.AssignedToUserId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Customer>()
                .Property(c => c.CustomerCode)
                .HasComputedColumnSql("('CUS-' + RIGHT('0000' + CAST([CustomerId] AS VARCHAR(4)), 4))", stored: true);

            modelBuilder.Entity<Customer>()
                .Property(c => c.FullName)
                .HasComputedColumnSql("([FirstName] + ' ' + [LastName])", stored: true);

            modelBuilder.Entity<Ticket>()
                .Property(t => t.TicketCode)
                .HasComputedColumnSql("('TIC-' + RIGHT('0000' + CAST([TicketId] AS VARCHAR(4)), 4))", stored: true);
        }
    }
}

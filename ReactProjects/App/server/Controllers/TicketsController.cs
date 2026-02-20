using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public TicketsController(AppDbContext db) { _db = db; }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            var total = await _db.Tickets.CountAsync();
            var totalPages = (int)Math.Ceiling((double)total / pageSize);

            var tickets = await _db.Tickets
                .Include(t => t.Customer)
                .OrderByDescending(t => t.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new
                {
                    id = t.TicketCode,
                    subject = t.Subject,
                    description = t.Description,
                    requester = new
                    {
                        name = t.Customer.FullName,
                        initials = t.Customer.FirstName.Substring(0, 1) + t.Customer.LastName.Substring(0, 1)
                    },
                    priority = t.Priority,
                    status = t.Status,
                    date = t.CreatedAt.ToString("MMM dd, yyyy")
                })
                .ToListAsync();

            var stats = new
            {
                total,
                open = await _db.Tickets.CountAsync(t => t.Status == "Open"),
                pending = await _db.Tickets.CountAsync(t => t.Status == "Pending"),
                resolved = await _db.Tickets.CountAsync(t => t.Status == "Resolved" || t.Status == "Closed")
            };

            return Ok(new { tickets, stats, totalPages });
        }

        [HttpGet("{code}")]
        public async Task<IActionResult> GetByCode(string code)
        {
            var ticket = await _db.Tickets
                .Include(t => t.Customer)
                .FirstOrDefaultAsync(t => t.TicketCode == code);

            if (ticket == null) return NotFound();

            return Ok(new
            {
                id = ticket.TicketCode,
                subject = ticket.Subject,
                description = ticket.Description,
                requester = new
                {
                    name = ticket.Customer.FullName,
                    initials = ticket.Customer.FirstName.Substring(0, 1) + ticket.Customer.LastName.Substring(0, 1)
                },
                priority = ticket.Priority,
                status = ticket.Status,
                date = ticket.CreatedAt.ToString("MMM dd, yyyy")
            });
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateTicketDto dto)
        {
            if (dto.UserId <= 0)
                return BadRequest("UserId is required");

            var user = await _db.Users.FirstOrDefaultAsync(u => u.UserId == dto.UserId && u.IsActive);
            if (user == null)
                return BadRequest("User not found");

            var customer = await _db.Customers.FirstOrDefaultAsync(c => c.Email == user.Email);
            if (customer == null)
            {
                var nameParts = (user.FullName ?? string.Empty)
                    .Trim()
                    .Split(' ', 2, StringSplitOptions.RemoveEmptyEntries);

                var firstName = nameParts.Length > 0 ? nameParts[0] : "User";
                var lastName = nameParts.Length > 1 ? nameParts[1] : "User";

                customer = new Customer
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Email = user.Email,
                    CreatedAt = DateTime.Now,
                    LastActiveAt = DateTime.Now
                };

                _db.Customers.Add(customer);
                await _db.SaveChangesAsync();
            }
            else
            {
                customer.LastActiveAt = DateTime.Now;
                _db.Customers.Update(customer);
                await _db.SaveChangesAsync();
            }

            var ticket = new Ticket
            {
                Subject = dto.Subject,
                Description = dto.Description,
                CustomerId = customer.CustomerId,
                Priority = dto.Priority,
                Status = string.IsNullOrWhiteSpace(dto.Status) ? "Open" : dto.Status,
                Category = dto.Category,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _db.Tickets.Add(ticket);
            await _db.SaveChangesAsync();

            await _db.Entry(ticket).ReloadAsync();
            await _db.Entry(ticket).Reference(t => t.Customer).LoadAsync();

            return CreatedAtAction(nameof(GetByCode), new { code = ticket.TicketCode }, new
            {
                id = ticket.TicketCode,
                subject = ticket.Subject,
                description = ticket.Description,
                requester = new
                {
                    name = ticket.Customer.FullName,
                    initials = ticket.Customer.FirstName.Substring(0, 1) + ticket.Customer.LastName.Substring(0, 1)
                },
                priority = ticket.Priority,
                status = ticket.Status,
                date = ticket.CreatedAt.ToString("MMM dd, yyyy")
            });
        }

        [HttpPut("{code}")]
        public async Task<IActionResult> Put(string code, [FromBody] CreateTicketDto dto)
        {
            var ticket = await _db.Tickets
                .Include(t => t.Customer)
                .FirstOrDefaultAsync(t => t.TicketCode == code);

            if (ticket == null)
                return NotFound($"Ticket with code {code} not found");

            ticket.Subject = dto.Subject;
            ticket.Description = dto.Description;
            ticket.Priority = dto.Priority;
            ticket.Category = dto.Category;
            ticket.Status = dto.Status;
            ticket.UpdatedAt = DateTime.Now;

            _db.Tickets.Update(ticket);
            await _db.SaveChangesAsync();

            return Ok(new
            {
                id = ticket.TicketCode,
                subject = ticket.Subject,
                description = ticket.Description,
                requester = new
                {
                    name = ticket.Customer.FullName,
                    initials = ticket.Customer.FirstName.Substring(0, 1) + ticket.Customer.LastName.Substring(0, 1)
                },
                priority = ticket.Priority,
                status = ticket.Status,
                date = ticket.CreatedAt.ToString("MMM dd, yyyy")
            });
        }

        [HttpDelete("{code}")]
        public async Task<IActionResult> Delete(string code)
        {
            var ticket = await _db.Tickets.FirstOrDefaultAsync(t => t.TicketCode == code);

            if (ticket == null)
                return NotFound($"Ticket with code {code} not found");

            _db.Tickets.Remove(ticket);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Ticket deleted successfully" });
        }
    }
}

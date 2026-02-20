using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly AppDbContext _db;

        public CustomersController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? search = null)
        {
            var query = _db.Customers
                .Include(c => c.Tickets)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(c =>
                    c.FullName.ToLower().Contains(searchLower) ||
                    c.Email.ToLower().Contains(searchLower) ||
                    (c.Company != null && c.Company.ToLower().Contains(searchLower))
                );
            }

            var customers = await query
                .OrderByDescending(c => c.LastActiveAt)
                .Select(c => new
                {
                    customerId = c.CustomerId,
                    id = c.CustomerCode,
                    name = c.FullName,
                    email = c.Email,
                    company = c.Company,
                    tickets = c.Tickets.Count,
                    lastActive = FormatLastActive(c.LastActiveAt),
                    avatar = c.AvatarUrl
                })
                .ToListAsync();

            return Ok(customers);
        }

        [HttpGet("{code}")]
        public async Task<IActionResult> GetByCode(string code)
        {
            var customer = await _db.Customers
                .Include(c => c.Tickets)
                .FirstOrDefaultAsync(c => c.CustomerCode == code);

            if (customer == null)
                return NotFound();

            return Ok(new
            {
                customerId = customer.CustomerId,
                id = customer.CustomerCode,
                name = customer.FullName,
                firstName = customer.FirstName,
                lastName = customer.LastName,
                email = customer.Email,
                company = customer.Company,
                tickets = customer.Tickets.Count,
                lastActive = FormatLastActive(customer.LastActiveAt),
                avatar = customer.AvatarUrl,
                createdAt = customer.CreatedAt
            });
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateCustomerDto dto)
        {
            var customer = new Customer
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Company = dto.Company,
                CreatedAt = DateTime.Now,
                LastActiveAt = DateTime.Now
            };

            _db.Customers.Add(customer);
            await _db.SaveChangesAsync();

            await _db.Entry(customer).ReloadAsync();

            return CreatedAtAction(nameof(GetByCode), new { code = customer.CustomerCode }, new
            {
                customerId = customer.CustomerId,
                id = customer.CustomerCode,
                name = customer.FullName,
                email = customer.Email,
                company = customer.Company,
                tickets = 0,
                lastActive = "Just now",
                avatar = customer.AvatarUrl
            });
        }

        private static string FormatLastActive(DateTime? lastActive)
        {
            if (lastActive == null)
                return "Never";

            var diff = DateTime.Now - lastActive.Value;

            if (diff.TotalHours < 1)
                return "Just now";
            if (diff.TotalHours < 24)
                return $"{(int)diff.TotalHours} hours ago";
            if (diff.TotalDays < 7)
                return lastActive.Value.ToString("dddd");

            return lastActive.Value.ToString("MMM dd, yyyy");
        }
    }

    public class CreateCustomerDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Company { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Ticket
    {
        [Key]
        public int TicketId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public string TicketCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Subject { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        public int CustomerId { get; set; }

        public int? AssignedToUserId { get; set; }

        [MaxLength(20)]
        public string Priority { get; set; } = "Medium";

        [MaxLength(50)]
        public string Status { get; set; } = "Open";

        [MaxLength(100)]
        public string? Category { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public DateTime? ResolvedAt { get; set; }

        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; } = null!;

        [ForeignKey("AssignedToUserId")]
        public User? AssignedToUser { get; set; }
    }
}

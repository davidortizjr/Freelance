namespace server.DTOs
{
    public class CreateTicketDto
    {
        public int UserId { get; set; }
        public string Subject { get; set; }
        public string Priority { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string Status { get; set; } = "Open";
    }
}

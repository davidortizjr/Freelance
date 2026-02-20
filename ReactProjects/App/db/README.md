# Database Setup Guide

## Quick Start

1. **Open SQL Server Management Studio (SSMS)**
2. **Connect to your SQL Server instance**
3. **Open** `setup-database.sql` in SSMS
4. **Execute** the entire script (F5)

The script will:
- Create the `SupportDesk` database
- Create all necessary tables (Users, Customers, Tickets)
- Create indexes for performance
- Create views for stats and reports
- Create stored procedures for API operations
- Insert sample data (5 customers, 40+ tickets, 1 admin user)

## Login Credentials

After running the setup script, use these credentials to log in:

- **Email**: `admin@supportdesk.com`
- **Password**: `admin123`

## Database Structure

### Tables

#### Users
- Stores admin/agent accounts
- Fields: UserId, Email, PasswordHash, FullName, Role, AvatarUrl
- **Note**: In production, implement proper password hashing (bcrypt, PBKDF2, etc.)

#### Customers
- Stores customer information
- Auto-generates CustomerCode (CUS-XXXX)
- Fields: CustomerId, CustomerCode, FirstName, LastName, Email, Company, AvatarUrl

#### Tickets
- Stores support tickets
- Auto-generates TicketCode (TIC-XXXX)
- Fields: TicketId, TicketCode, Subject, Description, CustomerId, Priority, Status, Category
- Priority options: Low, Medium, High, Urgent
- Status options: Open, In Progress, Pending, Resolved, Closed

### Stored Procedures

#### sp_GetTickets
```sql
EXEC sp_GetTickets 
    @Page = 1,           -- Current page number
    @PageSize = 5,       -- Items per page
    @Status = NULL,      -- Optional: 'Open', 'In Progress', 'Pending', 'Resolved', 'Closed'
    @Priority = NULL     -- Optional: 'Low', 'Medium', 'High', 'Urgent'
```

#### sp_GetCustomers
```sql
EXEC sp_GetCustomers 
    @SearchTerm = NULL   -- Optional: Search by name, email, or company
```

#### sp_AuthenticateUser
```sql
EXEC sp_AuthenticateUser 
    @Email = 'admin@supportdesk.com',
    @Password = 'admin123'
```

### Views

#### vw_TicketStats
Returns overall ticket statistics:
- Total tickets
- Open count
- Pending count
- Resolved count

```sql
SELECT * FROM vw_TicketStats;
```

#### vw_CustomerTicketCounts
Returns customer info with ticket counts:

```sql
SELECT * FROM vw_CustomerTicketCounts;
```

## Testing the Setup

Run the queries in `test-queries.sql` to verify everything is working correctly.

## Connecting to the React Frontend

You'll need to set up a backend API (using ASP.NET Core, Node.js, etc.) to connect the database to your React app.

### API Endpoints Required

#### 1. Authentication
```
POST /api/auth/login
Body: { "email": "string", "password": "string" }
Response: { "userId": 1, "email": "string", "fullName": "string", "token": "jwt-token" }
```

#### 2. Tickets
```
GET /api/tickets?page=1
Response: {
  "tickets": [
    {
      "id": "TIC-102",
      "subject": "string",
      "description": "string",
      "requester": { "name": "string", "initials": "string" },
      "priority": "High",
      "status": "Open",
      "date": "Oct 24, 2023"
    }
  ],
  "stats": {
    "total": 1284,
    "open": 42,
    "pending": 18,
    "resolved": 1224
  },
  "totalPages": 10
}
```

```
POST /api/tickets
Body: {
  "subject": "string",
  "description": "string",
  "priority": "High",
  "category": "Technical"
}
```

#### 3. Customers
```
GET /api/customers?search=optional
Response: [
  {
    "id": "CUS-9421",
    "name": "Jordan Henderson",
    "email": "j.henderson@example.com",
    "company": "Skyline Tech",
    "tickets": 12,
    "lastActive": "2 hours ago",
    "avatar": "url"
  }
]
```

### Using the Existing ASP.NET Backend

If you're using the ASP.NET backend in the `server/` folder:

1. Update `appsettings.json` with your SQL Server connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SupportDesk;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

2. Install Entity Framework Core packages:
```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

3. Update the `AppDbContext.cs` to match the database schema

4. Run the backend:
```bash
cd server
dotnet run
```

## Sample Data

The setup includes:
- 1 admin user
- 5 sample customers
- 40+ sample tickets with various statuses and priorities
- Realistic dates and relationships

## Maintenance Queries

### Add a new customer
```sql
INSERT INTO Customers (FirstName, LastName, Email, Company)
VALUES ('John', 'Doe', 'john.doe@example.com', 'Acme Corp');
```

### Create a new ticket
```sql
INSERT INTO Tickets (Subject, Description, CustomerId, Priority, Status, Category)
VALUES (
    'Sample Ticket',
    'Ticket description here',
    (SELECT CustomerId FROM Customers WHERE Email = 'j.henderson@example.com'),
    'High',
    'Open',
    'Technical'
);
```

### Update ticket status
```sql
UPDATE Tickets 
SET Status = 'Resolved', 
    UpdatedAt = GETDATE(),
    ResolvedAt = GETDATE()
WHERE TicketCode = 'TIC-102';
```

## Security Notes

⚠️ **Important**: The current setup uses plain-text passwords for demonstration purposes.

**Before deploying to production:**
1. Implement proper password hashing (bcrypt, PBKDF2, Argon2)
2. Use JWT or session tokens for authentication
3. Add proper input validation and SQL injection prevention
4. Implement rate limiting on authentication endpoints
5. Use HTTPS for all API communication
6. Add proper error handling and logging

## Troubleshooting

**Q: "Database already exists" error?**
A: The script checks for existence. If you want to start fresh, manually drop the database first:
```sql
DROP DATABASE SupportDesk;
```

**Q: Permission errors?**
A: Make sure you're connected to SQL Server with appropriate permissions to create databases and tables.

**Q: Sample data not showing?**
A: Run the verification queries at the end of `setup-database.sql` to check data insertion.

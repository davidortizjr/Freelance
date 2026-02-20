# Backend Setup Guide - SupportDesk API

## Prerequisites

1. **.NET 6.0 SDK or later** installed
2. **SQL Server** with the SupportDesk database set up
3. **Visual Studio 2022** or **VS Code** with C# extension

## Database Setup

Before running the backend, ensure you've set up the database:

1. Open **SQL Server Management Studio (SSMS)**
2. Run the script in `/db/setup-database.sql`
3. Verify the database and tables were created successfully

## Backend Configuration

The backend is configured to:
- Run on **http://localhost:5285**
- Connect to **SupportDesk** database on localhost
- Allow CORS from **http://localhost:5173** (Vite dev server)

### Connection String

Update `appsettings.json` if needed:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SupportDesk;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

## Running the Backend

### Command Line (Recommended)

```bash
cd server
dotnet restore
dotnet run
```

The API will be available at: **http://localhost:5285**

### Visual Studio

1. Open the solution in Visual Studio
2. Press **F5** to run
3. API starts at **http://localhost:5285**

## API Endpoints

### Authentication
- **POST** `/api/auth/login` - Login
  ```json
  {
    "email": "admin@supportdesk.com",
    "password": "admin123"
  }
  ```

### Tickets
- **GET** `/api/tickets?page=1&pageSize=5` - Get tickets with stats
- **POST** `/api/tickets` - Create ticket

### Customers
- **GET** `/api/customers` - Get all customers
- **GET** `/api/customers?search=term` - Search customers
- **POST** `/api/customers` - Create customer

## Testing

Navigate to: **http://localhost:5285/api/tickets**

Or use PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:5285/api/tickets?page=1"
```

## Connecting to Frontend

1. Start the backend (this guide)
2. Start the frontend: `npm run dev` from root
3. Navigate to **http://localhost:5173**

## Troubleshooting

- **Port in use**: Change port in `Properties/launchSettings.json`
- **Database errors**: Check connection string and ensure database exists
- **CORS errors**: Verify frontend URL in `Program.cs`

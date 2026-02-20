# SupportDesk - Full Stack Setup Guide

Complete ticket management system with React frontend and ASP.NET Core backend.

## Quick Start (3 Steps)

### 1. Setup Database (5 minutes)

1. Open **SQL Server Management Studio (SSMS)**
2. Open and execute `db/setup-database.sql`
3. Verify success - should see 40+ tickets, 5 customers, 1 admin user

**Login credentials created:**
- Email: `admin@supportdesk.com`
- Password: `admin123`

### 2. Start Backend (1 minute)

Open a terminal in the `server/` folder:

```bash
cd server
dotnet restore
dotnet run
```

Backend will run on: **http://localhost:5285**

Verify: Navigate to **http://localhost:5285/api/tickets**

### 3. Start Frontend (1 minute)

Open a new terminal in the root folder:

```bash
npm install
npm run dev
```

Frontend will run on: **http://localhost:5173**

Open browser: **http://localhost:5173**

## What You Get

✅ **Login Page** - Authentication with hard-coded credentials  
✅ **Dashboard** - Overview statistics and metrics  
✅ **Tickets** - Full ticket management with pagination  
✅ **Customers** - Customer directory with search  
✅ **Reports** - Report placeholders  
✅ **Settings** - Configuration placeholders  

## Architecture

```
Frontend (React + TypeScript + Tailwind)
    ↓ HTTP Requests (/api/*)
Backend (ASP.NET Core Web API)
    ↓ Entity Framework Core
Database (SQL Server - SupportDesk)
```

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for dev server and build
- **Tailwind CSS** for styling
- **Material Symbols** for icons

### Backend
- **ASP.NET Core** Web API
- **Entity Framework Core** for ORM
- **SQL Server** database

### Database
- **SQL Server** (LocalDB, Express, or Full)
- Complete schema with sample data
- Stored procedures for complex queries

## Folder Structure

```
├── db/                      # Database scripts
│   ├── setup-database.sql   # Main setup script
│   ├── test-queries.sql     # Test queries
│   └── README.md           # Database documentation
│
├── server/                  # ASP.NET Core backend
│   ├── Controllers/        # API endpoints
│   ├── Models/             # Data models
│   ├── Data/               # EF Core DbContext
│   └── appsettings.json    # Configuration
│
├── src/                    # React frontend
│   ├── main/
│   │   ├── App.tsx         # Main app component
│   │   ├── LoginPage.tsx   # Login page
│   │   └── tabs/           # Tab components
│   └── components/         # Reusable components
│
└── public/                 # Static assets
```

## API Endpoints

### Authentication
```
POST /api/auth/login
Body: { "email": "admin@supportdesk.com", "password": "admin123" }
```

### Tickets
```
GET  /api/tickets?page=1&pageSize=5
POST /api/tickets
GET  /api/tickets/{code}
```

### Customers
```
GET  /api/customers
GET  /api/customers?search=term
POST /api/customers
GET  /api/customers/{code}
```

## Configuration

### Backend Port
Change in `server/Properties/launchSettings.json`:
```json
"applicationUrl": "http://localhost:5285"
```

### Database Connection
Change in `server/appsettings.json`:
```json
"DefaultConnection": "Server=localhost;Database=SupportDesk;..."
```

### Frontend Proxy
Change in `vite.config.ts`:
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:5285'
  }
}
```

## Common Issues

### Port Already in Use

**Backend (5285)**:
1. Stop any process using port 5285
2. Or change port in `server/Properties/launchSettings.json`

**Frontend (5173)**:
- Vite will automatically use 5174 if 5173 is occupied

### Database Connection Failed

1. Verify SQL Server is running
2. Check connection string in `server/appsettings.json`
3. Ensure SupportDesk database exists
4. Try Windows Authentication vs SQL Server Authentication

### CORS Errors

Check `server/Program.cs` allows your frontend URL:
```csharp
policy.WithOrigins("http://localhost:5173")
```

### White Screen / No Data

1. Check backend is running: http://localhost:5285/api/tickets
2. Check browser console for errors (F12)
3. Verify database has data: Run `db/test-queries.sql`

## Development Workflow

**Making changes to the frontend:**
```bash
# Changes auto-reload with Vite HMR
npm run dev
```

**Making changes to the backend:**
```bash
cd server
# Stop the running dotnet process (Ctrl+C)
dotnet run
# Changes require restart
```

**Making changes to the database:**
```sql
-- Run queries in SSMS
USE SupportDesk;
-- Your queries here
```

## Production Deployment

⚠️ **This is a development setup. Before deploying:**

1. **Security**
   - Implement JWT authentication
   - Hash passwords properly (bcrypt/Argon2)
   - Add input validation
   - Enable HTTPS only
   - Use environment variables for secrets

2. **Frontend**
   ```bash
   npm run build
   # Deploy dist/ folder to static host
   ```

3. **Backend**
   ```bash
   cd server
   dotnet publish -c Release
   # Deploy to IIS, Azure, or Docker
   ```

4. **Database**
   - Use Azure SQL or production SQL Server
   - Remove sample data
   - Set up backup strategy
   - Configure proper authentication

## Testing

### Test Login
1. Navigate to http://localhost:5173
2. Enter credentials:
   - Email: `admin@supportdesk.com`
   - Password: `admin123`
3. Click Sign In

### Test API Directly

**PowerShell:**
```powershell
# Get tickets
Invoke-RestMethod http://localhost:5285/api/tickets?page=1

# Login
$body = @{email="admin@supportdesk.com";password="admin123"} | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:5285/api/auth/login -Method Post -Body $body -ContentType "application/json"
```

**cURL:**
```bash
# Get tickets
curl http://localhost:5285/api/tickets?page=1

# Login
curl -X POST http://localhost:5285/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@supportdesk.com","password":"admin123"}'
```

## Resources

- **Database docs**: `db/README.md`
- **Backend docs**: `server/README.md`
- **React docs**: https://react.dev
- **ASP.NET docs**: https://learn.microsoft.com/aspnet/core
- **Tailwind CSS**: https://tailwindcss.com

## Support

Having issues? Check:
1. All three components are running (DB, Backend, Frontend)
2. Ports are correct (5285 for backend, 5173 for frontend)
3. Database has data (run test queries)
4. Console logs in browser (F12) and backend terminal

## Next Steps

- [ ] Add edit/delete functionality for tickets
- [ ] Implement real authentication with JWT
- [ ] Add user management page
- [ ] Create ticket detail view
- [ ] Add file attachments
- [ ] Implement real-time updates
- [ ] Add dashboard charts
- [ ] Create API documentation (Swagger)
- [ ] Add unit tests
- [ ] Set up CI/CD pipeline

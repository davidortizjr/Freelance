# SupportDesk - Full Stack Ticket Management System

A complete customer support ticketing system with React frontend and ASP.NET Core backend.

![Tech Stack](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![.NET](https://img.shields.io/badge/.NET-6+-purple)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2019+-red)

## 🚀 Quick Start

**See [SETUP.md](SETUP.md) for complete setup instructions.**

### Prerequisites
- Node.js 18+
- .NET 6.0 SDK or later
- SQL Server (any edition)

### 3-Step Setup

1. **Database**: Run `db/setup-database.sql` in SSMS
2. **Backend**: `cd server && dotnet run`
3. **Frontend**: `npm install && npm run dev`

Open **http://localhost:5173** and login with:
- **Email**: `admin@supportdesk.com`
- **Password**: `admin123`

## ✨ Features

- 🔐 **Authentication** - Login system with session management
- 🎫 **Ticket Management** - Create, view, and track support tickets
- 👥 **Customer Directory** - Manage customer profiles and history
- 📊 **Dashboard** - Overview statistics and metrics
- 📈 **Reports** - Performance and activity reports (placeholder)
- ⚙️ **Settings** - System configuration (placeholder)

## 🛠️ Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** - Fast dev server and build tool
- **Tailwind CSS** - Utility-first styling
- **Material Symbols** - Icon library

### Backend
- **ASP.NET Core** - Web API framework
- **Entity Framework Core** - ORM
- **SQL Server** - Database

## 📁 Project Structure

```
├── db/              # Database scripts and setup
├── server/          # ASP.NET Core backend
├── src/             # React frontend source
├── public/          # Static assets
└── SETUP.md         # Detailed setup guide
```

## 🔌 API Endpoints

- `POST /api/auth/login` - User authentication
- `GET /api/tickets` - Get paginated tickets
- `GET /api/customers` - Get customer list
- `POST /api/tickets` - Create new ticket
- `POST /api/customers` - Create new customer

Full API documentation in [server/README.md](server/README.md)

## 🗄️ Database

The database includes:
- **Users** - Admin/agent accounts
- **Customers** - Customer information
- **Tickets** - Support tickets with relationships

Sample data includes 40+ tickets, 5 customers, and 1 admin user.

See [db/README.md](db/README.md) for schema details.

## 🔧 Development

**Frontend (Hot reload enabled):**
```bash
npm run dev
```

**Backend (Manual restart required):**
```bash
cd server
dotnet run
```

**Database queries:**
Use SSMS or run `db/test-queries.sql`

## 🌐 Ports

- Frontend: **http://localhost:5173**
- Backend: **http://localhost:5285**
- Database: **localhost:1433** (default SQL Server)

## 📝 License

MIT

## 👨‍💻 Author

Built with React, .NET, and SQL Server
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

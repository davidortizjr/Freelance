# SupportDesk - Full Stack Ticket Management System
## Project Presentation

---

## 1. 🎯 Project Title & Introduction

### **SupportDesk** - Complete Customer Support Ticketing System

**Project Overview:**
SupportDesk is a comprehensive, full-stack web application designed to streamline customer support operations. This project was chosen to demonstrate proficiency in modern web development practices, combining a responsive React frontend with a robust ASP.NET Core backend, all powered by SQL Server database.

**Why This Project?**
- **Real-World Application**: Ticket management systems are used by virtually every company that provides customer support
- **Full-Stack Complexity**: Requires mastery of frontend UI/UX, backend API development, and database design
- **Modern Tech Stack**: Utilizes industry-standard technologies (React, TypeScript, .NET Core, SQL Server)
- **CRUD Operations**: Implements all essential database operations (Create, Read, Update, Delete)
- **Authentication**: Includes user authentication and role-based access control
- **Scalability**: Architecture designed to handle growing data and user base

**Target Users:**
- Customer support teams managing incoming support tickets
- System administrators monitoring support metrics
- Customers submitting and tracking their support requests

---

## 2. 🖥️ Site Demo - Functionality Walkthrough

### **User Journey: From Login to Ticket Resolution**

#### **A. Login Page** (`http://localhost:5173`)
- Clean, professional authentication interface
- Email/password validation with error handling
- Session management with localStorage
- Role-based routing (Admin vs Customer views)
- **Demo Credentials**: `admin@supportdesk.com` / `admin123`

#### **B. Admin Dashboard** (Main Application View)
Once logged in, admins access a comprehensive dashboard with:

**Navigation Sidebar:**
- Dashboard - Overview metrics and KPIs
- Tickets - Main ticket management interface
- Reports - Performance analytics (placeholder)
- Customers - Customer directory management
- Settings - System configuration (placeholder)

#### **C. Dashboard Tab**
- **Key Metrics Display:**
  - Tickets Today: 38 (+6% vs yesterday)
  - Average Response Time: 1h 42m
  - Customer Satisfaction (CSAT): 94%
- Activity trends visualization area
- Quick action buttons for report generation

#### **D. Tickets Tab** (Primary Feature)
**Ticket Statistics Cards:**
- Total tickets count
- Open tickets (active issues)
- Pending tickets (awaiting response)
- Resolved tickets (completed)

**Interactive Tickets Table:**
- Paginated display (5 tickets per page)
- Columns: ID, Subject, Requester, Priority, Status, Date, Actions
- Visual priority badges (Low/Medium/High/Urgent)
- Status indicators (Open/In Progress/Pending/Resolved/Closed)
- User avatars with initials

**Ticket Management Actions:**
1. **Search Functionality**: Real-time filtering by ID, subject, description, requester, priority, or status
2. **Create New Ticket**: Modal form with fields:
   - Subject (required)
   - Priority selection (Low/Medium/High/Urgent)
   - Category
   - Description (textarea)
3. **Edit Ticket**: Modify existing tickets with status updates
4. **Delete Ticket**: Remove tickets with confirmation dialog
5. **Pagination**: Navigate through large ticket datasets

#### **E. Customers Tab**
- Customer directory with search capability
- Display customer profiles with:
  - Customer code (auto-generated: CUS-0001)
  - Full name
  - Email address
  - Company affiliation
  - Activity status
- Add new customer functionality

#### **F. Customer Portal** (`/customer` route)
- Dedicated interface for customers to view their tickets
- Personalized dashboard showing only their submissions
- Ticket creation form for new support requests

---

## 3. 🎨 Front-End Architecture

### **Design Philosophy**
- **Modern & Clean**: Professional interface with subtle shadows and rounded corners
- **Accessibility-First**: High contrast, readable fonts, clear visual hierarchy
- **Responsive**: Adapts seamlessly to different screen sizes
- **Intuitive UX**: Familiar patterns (search, pagination, modals) for easy navigation

### **UI/UX Features**

#### **Visual Design System:**
- **Color Scheme**: 
  - Primary: Blue (#3B82F6) for actionable elements
  - Success: Green for resolved tickets
  - Warning: Orange for priority indicators
  - Neutral: Slate grays for text and backgrounds
- **Typography**: Clean sans-serif fonts with clear hierarchy
- **Spacing**: Consistent padding and margins using Tailwind utilities
- **Icons**: Material Symbols for consistent iconography

#### **User Experience Highlights:**
1. **Instant Feedback**: Hover states on all interactive elements
2. **Loading States**: Disabled inputs during form submissions
3. **Error Handling**: Clear error messages in red alert boxes
4. **Search Debouncing**: Smooth real-time search without lag
5. **Modal Dialogs**: Non-intrusive overlays for ticket operations
6. **Status Badges**: Color-coded pills for quick visual scanning

### **Technologies & Tools**

#### **Core Framework:**
```json
{
  "React": "19.2.0",
  "TypeScript": "5.9.3",
  "react-router-dom": "6.26.1"
}
```

#### **Styling:**
- **Tailwind CSS 4.1.18**: Utility-first CSS framework for rapid UI development
  - Custom configuration for color theming
  - Responsive breakpoints for mobile/tablet/desktop
  - Dark mode support (foundation laid)
- **@tailwindcss/vite**: Seamless integration with Vite build tool

#### **Build Tools:**
- **Vite 7.3.1**: Lightning-fast dev server with Hot Module Replacement (HMR)
  - Instant page updates during development
  - Optimized production builds with code splitting
  - TypeScript support out-of-the-box

#### **Code Quality:**
- **ESLint 9.39.1**: Code linting to enforce best practices
- **TypeScript**: Type safety preventing runtime errors
- **React DevTools**: Component inspection and debugging

### **Component Architecture**

#### **Reusable Components** (`src/components/`):
```
Header.tsx              - Top navigation bar
Sidebar.tsx             - Left navigation sidebar
NavLink.tsx             - Navigation menu items
TicketsTable.tsx        - Data table for tickets
TicketStats.tsx         - Statistics cards
Pagination.tsx          - Page navigation controls
SearchBar.tsx           - Search input component
CreateTicketModal.tsx   - Ticket creation form
EditTicketModal.tsx     - Ticket editing form
DeleteTicketModal.tsx   - Deletion confirmation
AccountButton.tsx       - User profile dropdown
NotificationButton.tsx  - Notification center
```

#### **Page Components** (`src/main/`):
```
LoginPage.tsx           - Authentication screen
App.tsx                 - Main admin dashboard
CustomerDashboardPage.tsx - Customer portal
CustomerTicketPage.tsx  - Customer ticket view
```

#### **Tab Components** (`src/main/tabs/`):
```
DashboardTab.tsx        - Overview metrics
CustomersTab.tsx        - Customer management
ReportsTab.tsx          - Analytics (placeholder)
SettingsTab.tsx         - Configuration (placeholder)
```

#### **State Management Strategy:**
- **React Hooks**: `useState` for local component state
- **useEffect**: Side effects and data fetching
- **useNavigate**: Programmatic routing
- **Prop Drilling**: Parent-child data flow for now (can scale to Context API/Redux)

#### **Type Safety** (`src/components/types.ts`):
```typescript
interface Ticket {
  id: string
  subject: string
  description: string
  requester: { name: string; initials: string }
  priority: string
  status: string
  date: string
}

interface TicketStats {
  total: number
  open: number
  pending: number
  resolved: number
}
```

---

## 4. ⚙️ Back-End Architecture

### **Server Technology Stack**

#### **Framework:**
- **ASP.NET Core 6+**: Modern, cross-platform web framework
  - High performance and scalability
  - Built-in dependency injection
  - Middleware pipeline for request processing

#### **ORM (Object-Relational Mapping):**
- **Entity Framework Core**: Database abstraction layer
  - LINQ queries for type-safe database operations
  - Automatic migrations
  - Relationship management (Include/Navigation properties)

#### **Database:**
- **SQL Server 2019+**: Enterprise-grade relational database
  - ACID compliance for data integrity
  - Indexed queries for fast retrieval
  - Computed columns for auto-generated codes

### **Backend Logic & Architecture**

#### **Program.cs** - Application Entry Point
```csharp
// Service Registration
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// CORS Configuration
builder.Services.AddCors(options => {
    options.AddPolicy("AllowDev", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

// Middleware Pipeline
app.UseHttpsRedirection();
app.UseCors("AllowDev");
app.MapControllers();
```

#### **Controllers** (`server/Controllers/`):

**1. AuthController.cs** - Authentication Logic
```csharp
POST /api/auth/login
- Validates email/password credentials
- Checks user IsActive status
- Updates LastLogin timestamp
- Returns user profile (userId, email, fullName, role, avatarUrl)
```

**2. TicketsController.cs** - Ticket Management
```csharp
GET /api/tickets?page=1&pageSize=5
- Paginated ticket retrieval
- Includes customer data (Join/Include)
- Calculates statistics (total, open, pending, resolved)
- Orders by CreatedAt descending

GET /api/tickets/{code}
- Fetch single ticket by TicketCode (e.g., TIC-0001)

POST /api/tickets
- Creates new ticket
- Auto-creates customer if not exists
- Generates ticket code automatically (computed column)
- Returns created ticket with 201 status

PUT /api/tickets/{code}
- Updates ticket properties
- Tracks UpdatedAt timestamp
- Status change handling

DELETE /api/tickets/{code}
- Removes ticket from database
```

**3. CustomersController.cs** - Customer Management
```csharp
GET /api/customers
- Retrieves all active customers
- Search filtering capability

POST /api/customers
- Creates new customer record
- Email uniqueness validation
- Auto-generates customer code
```

#### **Data Models** (`server/Models/`):

**User.cs**
```csharp
UserId (PK, Identity)
Email (Unique, Required)
PasswordHash (Plain text for demo - would be hashed in production)
FullName
Role (Admin/Agent)
AvatarUrl
CreatedAt
LastLogin
IsActive
```

**Customer.cs**
```csharp
CustomerId (PK, Identity)
CustomerCode (Computed: CUS-0001)
FirstName, LastName
FullName (Computed: FirstName + LastName)
Email (Unique)
Company
AvatarUrl
CreatedAt, LastActiveAt
IsActive
```

**Ticket.cs**
```csharp
TicketId (PK, Identity)
TicketCode (Computed: TIC-0001)
Subject (Required)
Description
CustomerId (FK to Customers)
AssignedToUserId (FK to Users, nullable)
Priority (Low/Medium/High/Urgent)
Status (Open/In Progress/Pending/Resolved/Closed)
Category
CreatedAt, UpdatedAt, ResolvedAt
```

**Relationships:**
- Customer → Tickets (One-to-Many)
- User → Tickets (One-to-Many, optional assignment)

#### **Database Context** (`Data/AppDbContext.cs`):
```csharp
public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Ticket> Tickets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure relationships
        // Set constraints
        // Define indexes
    }
}
```

### **Database Design** (`db/setup-database.sql`)

#### **Schema Highlights:**
- **Constraints**: CHECK constraints for Priority/Status enums
- **Foreign Keys**: Referential integrity between tables
- **Indexes**: Optimized queries on commonly filtered columns
  - `IX_Tickets_Status`
  - `IX_Tickets_Priority`
  - `IX_Tickets_CreatedAt`
  - `IX_Customers_Email`
- **Computed Columns**: Auto-generated codes (TicketCode, CustomerCode)
- **Default Values**: GETDATE() for timestamps, default status 'Open'

#### **Sample Data:**
- 1 Admin user (admin@supportdesk.com)
- 5 Sample customers
- 40+ Tickets with varied priorities and statuses
- Realistic test data for development

#### **Connection String** (`appsettings.json`):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SupportDesk;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### **API Design Patterns**

1. **RESTful API**: Standard HTTP methods (GET/POST/PUT/DELETE)
2. **DTOs (Data Transfer Objects)**: Separate models for requests/responses
3. **Async/Await**: Non-blocking database operations
4. **Error Handling**: Try-catch blocks with appropriate HTTP status codes
5. **Include Strategy**: Eager loading of related entities to avoid N+1 queries

---

## 5. 🚧 Challenges & Solutions

### **Challenge 1: Cross-Origin Resource Sharing (CORS) Errors**

**Problem:**
When the React frontend (localhost:5173) tried to communicate with the .NET backend (localhost:5285), browsers blocked the requests due to CORS policy.

**Error:**
```
Access to fetch at 'http://localhost:5285/api/tickets' from origin 
'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
Configured CORS middleware in `Program.cs` to allow cross-origin requests from the Vite dev server:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowDev", policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

app.UseCors("AllowDev");
```

**Lesson Learned:** Understanding browser security models and middleware ordering in ASP.NET Core.

---

### **Challenge 2: Entity Framework Relationship Loading**

**Problem:**
When fetching tickets, the Customer data was coming back as `null` even though foreign keys were set correctly.

**Error:**
```
Cannot read property 'FullName' of null
```

**Solution:**
Used `.Include()` to explicitly load related entities:

```csharp
var tickets = await _db.Tickets
    .Include(t => t.Customer)  // Eager load customer data
    .OrderByDescending(t => t.CreatedAt)
    .ToListAsync();
```

**Alternative Considered:** Lazy loading (enabled by default in older EF versions) was disabled in EF Core 6+ for performance reasons.

**Lesson Learned:** Understand the difference between eager loading, lazy loading, and explicit loading in ORMs.

---

### **Challenge 3: TypeScript Type Safety with API Responses**

**Problem:**
The frontend was receiving data from the backend, but TypeScript wasn't enforcing type safety on API responses, leading to runtime errors when the API structure changed.

**Initial Code:**
```typescript
const res = await fetch('/api/tickets')
const data = await res.json() // Type is 'any'
```

**Solution:**
Created explicit TypeScript interfaces matching the backend DTOs:

```typescript
interface Ticket {
  id: string
  subject: string
  requester: { name: string; initials: string }
  priority: string
  status: string
  date: string
}

const json = await res.json() as { tickets: Ticket[], stats: TicketStats }
```

**Lesson Learned:** Type safety is only as good as your type definitions. Consider tools like OpenAPI/Swagger to auto-generate TypeScript types from backend schemas.

---

### **Challenge 4: State Management and Data Synchronization**

**Problem:**
After creating, editing, or deleting a ticket, the UI wasn't updating to reflect changes without a manual page refresh.

**Solution:**
Implemented a pattern of re-fetching data after mutations:

```typescript
const handleCreateTicket = async (data) => {
  await fetch('/api/tickets', { method: 'POST', body: JSON.stringify(data) })
  
  // Immediately re-fetch to sync state
  const fetchRes = await fetch('/api/tickets?page=1')
  const json = await fetchRes.json()
  setTickets(json.tickets)
  setStats(json.stats)
}
```

**Alternative Considered:** Optimistic UI updates (update state before API confirmation) for faster perceived performance.

**Lesson Learned:** In larger apps, consider state management libraries (React Query, SWR) that automatically handle cache invalidation.

---

### **Challenge 5: Computed Columns and EF Core SaveChanges**

**Problem:**
After creating a new ticket, the `TicketCode` (computed column) was not available in the returned object, causing undefined errors on the frontend.

**Error:**
```
Cannot read property 'TicketCode' of undefined
```

**Solution:**
Reload the entity from the database after saving to fetch computed values:

```csharp
_db.Tickets.Add(ticket);
await _db.SaveChangesAsync();

await _db.Entry(ticket).ReloadAsync();  // Fetch computed columns
await _db.Entry(ticket).Reference(t => t.Customer).LoadAsync();  // Load related data

return CreatedAtAction(nameof(GetByCode), new { code = ticket.TicketCode }, ...);
```

**Lesson Learned:** Computed columns and database-generated values require explicit reload or query after insertion.

---

### **Challenge 6: Password Security (Current Limitation)**

**Problem:**
For rapid prototyping, passwords are stored as plain text in the database, which is a critical security vulnerability.

**Current State:**
```csharp
var user = await _db.Users.FirstOrDefaultAsync(u => 
    u.Email == dto.Email && u.PasswordHash == dto.Password);
```

**Solution (For Production):**
Would implement proper password hashing using bcrypt or ASP.NET Core Identity:

```csharp
// On registration
var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

// On login
var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
```

**Lesson Learned:** Never compromise on security fundamentals, even in demos. Using ASP.NET Core Identity framework would provide built-in authentication, authorization, and security features.

---

### **Challenge 7: Pagination State Management**

**Problem:**
When searching or filtering tickets, users expected to return to page 1, but the pagination state persisted from previous views.

**Solution:**
Reset page number when search query changes:

```typescript
const handleSearch = (value: string) => {
  setSearchQuery(value)
  setCurrentPage(1)  // Reset to first page on new search
}
```

**Lesson Learned:** User expectations around filtering and pagination require thoughtful UX design.

---

### **Challenge 8: Modal Form State Cleanup**

**Problem:**
When opening the "Edit Ticket" modal multiple times, old form data persisted, showing wrong values.

**Solution:**
Clear modal state when closing:

```typescript
const handleCloseModal = () => {
  setEditingTicket(null)
  setIsModalOpen(false)
}
```

And populate form with fresh data when opening:

```typescript
useEffect(() => {
  if (editingTicket) {
    setFormData({
      subject: editingTicket.subject,
      priority: editingTicket.priority,
      // ...
    })
  }
}, [editingTicket])
```

**Lesson Learned:** Always clean up component state to prevent stale data bugs.

---

### **Challenge 9: Development Workflow - Backend Changes Require Restart**

**Problem:**
Unlike the frontend with hot reload, backend C# changes required manual server restarts, slowing development.

**Solution:**
Used `dotnet watch run` instead of `dotnet run` for automatic recompilation:

```bash
cd server
dotnet watch run
```

**Future Enhancement:** Could implement Docker with volume mounting for even better dev experience.

**Lesson Learned:** Developer experience tools significantly impact productivity.

---

### **Challenge 10: SQL Server Connection String Issues**

**Problem:**
Initial connection attempts failed with SSL certificate validation errors:

```
A connection was successfully established with the server, 
but then an error occurred during the login process.
```

**Solution:**
Added `TrustServerCertificate=True` to the connection string for local development:

```
Server=localhost;Database=SupportDesk;Trusted_Connection=True;TrustServerCertificate=True;
```

**Production Note:** In production environments, use proper SSL certificates instead of disabling validation.

**Lesson Learned:** Local development configurations often differ from production requirements.

---

## 📊 Project Statistics

- **Total Files**: 40+ source files
- **Lines of Code**: ~3,000+ (estimated)
- **Components**: 20+ React components
- **API Endpoints**: 8+ RESTful endpoints
- **Database Tables**: 3 core tables with relationships
- **Sample Data**: 40+ tickets, 5 customers, 1 admin

---

## 🚀 Future Enhancements

1. **Real-time Updates**: WebSocket integration for live ticket updates
2. **File Attachments**: Upload screenshots/documents to tickets
3. **Email Notifications**: Alert customers on status changes
4. **Advanced Filtering**: Multi-select filters for priority/status/date ranges
5. **Ticket Comments**: Conversation thread within each ticket
6. **Role-Based Permissions**: Granular access control (admin/agent/customer)
7. **Dashboard Charts**: Interactive visualizations using Chart.js or Recharts
8. **Export Functionality**: Download reports as PDF/CSV
9. **Dark Mode**: Complete theming system
10. **Mobile App**: React Native version for field agents

---

## 🎓 Key Takeaways

This project demonstrates:
- **Full-stack development** from database to UI
- **Modern web technologies** (React 19, .NET 6, TypeScript)
- **RESTful API design** principles
- **Database modeling** and relationships
- **Problem-solving** through real-world challenges
- **Clean code** architecture and component reusability
- **Responsive design** with Tailwind CSS
- **State management** in React applications
- **Authentication** and session handling
- **Pagination** and search implementation

---

## 📝 Conclusion

SupportDesk showcases a production-ready architecture that can scale to handle enterprise-level customer support operations. The combination of React's component-based frontend, ASP.NET Core's robust backend, and SQL Server's reliable data storage creates a performant, maintainable, and user-friendly application.

The challenges encountered during development—from CORS configuration to state management—mirror real-world scenarios that developers face daily, demonstrating practical problem-solving skills and adaptability.

---

**Project Repository Structure:**
```
App/
├── db/                 # Database scripts
├── server/             # ASP.NET Core backend
├── src/                # React frontend
├── public/             # Static assets
├── README.md           # Quick reference
├── SETUP.md            # Installation guide
└── PROJECT-PRESENTATION.md  # This document
```

**Live Demo:** Run locally following instructions in [SETUP.md](SETUP.md)

**Technologies:** React 19, TypeScript 5, Tailwind CSS 4, Vite 7, ASP.NET Core 6+, Entity Framework Core, SQL Server 2019+

---

*Created by: Your Name*  
*Date: February 18, 2026*  
*Contact: your-email@example.com*

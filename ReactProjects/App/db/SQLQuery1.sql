-- =============================================
-- SupportDesk Database - Quick Reference
-- =============================================
-- 
-- For full setup, run: setup-database.sql
-- For testing, run: test-queries.sql
-- For documentation, see: README.md
--
-- =============================================

-- Quick setup (run this first!)
-- Open and execute: setup-database.sql

-- Then test with these queries:

USE SupportDesk;
GO

-- View all tickets
SELECT * FROM Tickets ORDER BY CreatedAt DESC;

-- View all customers  
SELECT * FROM Customers;

-- Get ticket statistics
SELECT * FROM vw_TicketStats;

-- Test login
EXEC sp_AuthenticateUser 
    @Email = 'admin@supportdesk.com', 
    @Password = 'admin123';

-- Get paginated tickets
EXEC sp_GetTickets @Page = 1, @PageSize = 5;

-- Search customers
EXEC sp_GetCustomers @SearchTerm = 'Tech';
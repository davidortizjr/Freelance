-- =============================================
-- Quick Test Queries
-- Run these after setup to verify everything works
-- =============================================

USE SupportDesk;
GO

-- Test 1: Check Ticket Stats
SELECT * FROM vw_TicketStats;
GO

-- Test 2: Get Tickets (paginated)
EXEC sp_GetTickets @Page = 1, @PageSize = 5;
GO

-- Test 3: Get All Customers
EXEC sp_GetCustomers;
GO

-- Test 4: Search Customers
EXEC sp_GetCustomers @SearchTerm = 'Sarah';
GO

-- Test 5: Authenticate User
EXEC sp_AuthenticateUser @Email = 'admin@supportdesk.com', @Password = 'admin123';
GO

-- Test 6: Get Customer with Ticket Counts
SELECT * FROM vw_CustomerTicketCounts;
GO

-- Test 7: Get Recent Tickets
SELECT TOP 10
    t.TicketCode,
    t.Subject,
    c.FullName AS Customer,
    t.Priority,
    t.Status,
    t.CreatedAt
FROM Tickets t
INNER JOIN Customers c ON t.CustomerId = c.CustomerId
ORDER BY t.CreatedAt DESC;
GO

-- Test 8: Get Tickets by Status
SELECT Status, COUNT(*) AS Count
FROM Tickets
GROUP BY Status;
GO

-- Test 9: Get Tickets by Priority
SELECT Priority, COUNT(*) AS Count
FROM Tickets
GROUP BY Priority;
GO

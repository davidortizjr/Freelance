-- =============================================
-- SupportDesk Database Setup Script
-- Run this in SQL Server Management Studio (SSMS)
-- =============================================

-- Create Database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'SupportDesk')
BEGIN
    CREATE DATABASE SupportDesk;
END
GO

USE SupportDesk;
GO

-- =============================================
-- Create Tables
-- =============================================

-- Users Table (for authentication)
IF OBJECT_ID('Users', 'U') IS NOT NULL
    DROP TABLE Users;
GO

CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    FullName NVARCHAR(100) NOT NULL,
    Role NVARCHAR(50) NOT NULL DEFAULT 'Agent',
    AvatarUrl NVARCHAR(500),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    LastLogin DATETIME,
    IsActive BIT NOT NULL DEFAULT 1
);
GO

-- Customers Table
IF OBJECT_ID('Customers', 'U') IS NOT NULL
    DROP TABLE Customers;
GO

CREATE TABLE Customers (
    CustomerId INT IDENTITY(1,1) PRIMARY KEY,
    CustomerCode AS ('CUS-' + RIGHT('0000' + CAST(CustomerId AS VARCHAR(4)), 4)) PERSISTED,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    FullName AS (FirstName + ' ' + LastName) PERSISTED,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    Company NVARCHAR(255),
    AvatarUrl NVARCHAR(500),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    LastActiveAt DATETIME,
    IsActive BIT NOT NULL DEFAULT 1
);
GO

-- Tickets Table
IF OBJECT_ID('Tickets', 'U') IS NOT NULL
    DROP TABLE Tickets;
GO

CREATE TABLE Tickets (
    TicketId INT IDENTITY(1,1) PRIMARY KEY,
    TicketCode AS ('TIC-' + RIGHT('0000' + CAST(TicketId AS VARCHAR(4)), 4)) PERSISTED,
    Subject NVARCHAR(500) NOT NULL,
    Description NVARCHAR(MAX),
    CustomerId INT NOT NULL,
    AssignedToUserId INT,
    Priority NVARCHAR(20) NOT NULL DEFAULT 'Medium',
    Status NVARCHAR(50) NOT NULL DEFAULT 'Open',
    Category NVARCHAR(100),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    ResolvedAt DATETIME,
    CONSTRAINT FK_Tickets_Customers FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId),
    CONSTRAINT FK_Tickets_Users FOREIGN KEY (AssignedToUserId) REFERENCES Users(UserId),
    CONSTRAINT CK_Priority CHECK (Priority IN ('Low', 'Medium', 'High', 'Urgent')),
    CONSTRAINT CK_Status CHECK (Status IN ('Open', 'In Progress', 'Pending', 'Resolved', 'Closed'))
);
GO

-- =============================================
-- Create Indexes
-- =============================================

CREATE INDEX IX_Tickets_CustomerId ON Tickets(CustomerId);
CREATE INDEX IX_Tickets_Status ON Tickets(Status);
CREATE INDEX IX_Tickets_Priority ON Tickets(Priority);
CREATE INDEX IX_Tickets_CreatedAt ON Tickets(CreatedAt DESC);
CREATE INDEX IX_Customers_Email ON Customers(Email);
GO

-- =============================================
-- Create Views
-- =============================================

-- View for Ticket Stats
IF OBJECT_ID('vw_TicketStats', 'V') IS NOT NULL
    DROP VIEW vw_TicketStats;
GO

CREATE VIEW vw_TicketStats AS
SELECT 
    COUNT(*) AS Total,
    SUM(CASE WHEN Status = 'Open' THEN 1 ELSE 0 END) AS OpenCount,
    SUM(CASE WHEN Status = 'Pending' THEN 1 ELSE 0 END) AS PendingCount,
    SUM(CASE WHEN Status IN ('Resolved', 'Closed') THEN 1 ELSE 0 END) AS ResolvedCount
FROM Tickets;
GO

-- View for Customer Ticket Counts
IF OBJECT_ID('vw_CustomerTicketCounts', 'V') IS NOT NULL
    DROP VIEW vw_CustomerTicketCounts;
GO

CREATE VIEW vw_CustomerTicketCounts AS
SELECT 
    c.CustomerId,
    c.CustomerCode,
    c.FullName,
    c.Email,
    c.Company,
    c.AvatarUrl,
    c.LastActiveAt,
    COUNT(t.TicketId) AS TotalTickets,
    SUM(CASE WHEN t.Status = 'Open' THEN 1 ELSE 0 END) AS OpenTickets
FROM Customers c
LEFT JOIN Tickets t ON c.CustomerId = t.CustomerId
GROUP BY c.CustomerId, c.CustomerCode, c.FullName, c.Email, c.Company, c.AvatarUrl, c.LastActiveAt;
GO

-- =============================================
-- Insert Sample Data
-- =============================================

-- Insert Admin User (password: admin123 - in production, use proper hashing!)
INSERT INTO Users (Email, PasswordHash, FullName, Role, AvatarUrl)
VALUES 
('admin@supportdesk.com', 'admin123', 'Alex Rivera', 'Admin', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiUgCd8bV8nbffXgymYvPDskAaJss2_HYTPLhjVWPhM9ee61VTLUjmS65sYXg4ExVVmzNUmTbVP37jNmck3oDh2eljfkXLNjSeQ8pRKEIKSyGNdj1XNWe51HvE-QjvbrVnbuygZq2uqVnB7bKyA4EiDHE9I8uq9ghM5ospxwBtapGaDSjt0xxnQ7Jbg_6WdsbMVxXIG77J99esH1pe2e-t_D-bHSqQlZVS8qi1b3w_CeWGWmtGjiiP7c6D6q00DGzkNtRX82-fZA');
GO

-- Insert Sample Customers
SET IDENTITY_INSERT Customers ON;

INSERT INTO Customers (CustomerId, FirstName, LastName, Email, Company, AvatarUrl, LastActiveAt)
VALUES 
(9421, 'Jordan', 'Henderson', 'j.henderson@example.com', 'Skyline Tech', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDueuQeIVkrdXaRaxMv8IczSb6Tnq9AI34bYluKYt4JVsfUvaSKgs8IS0YD6h9NfZwX535ht93PpH_6SYu-zmGoYc2GMXc0l8gWFolm1ppsC2few8_sl6poX7ye8aflpQm2H41znwBgLeCIYBivNqKEZntuEVi7mWiFoUne5aQe-TDck_TPVxXLt_A_t7UgkDzFXhQ0-sAeXieiAymjQxn1O-MTlw14CSQp5rbffapv-nAznCa_Gs3clTIHCd2TheZCtA5hdWCXMQ', DATEADD(HOUR, -2, GETDATE())),
(8842, 'Sarah', 'Jenkins', 'sarah.j@global.org', 'Global Logistics', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlquQf48R4nRf_44GrwyanwVHObN8FG2mn6LrkQAAoo1-qTCBCuZ5OCjIKgxmm1a1V2HmblDenKlEmzmlD83iTtMZqjSFl9fKLvAh2GyKjcgkcUhoXOilPOg1nteJrGTQVNc73iJEW0JMK1i4m48xFroPRP3oi3V0ZOJ3GXHL6NRn1jA6uUV8yoCcswVCSR9MRsxHVH2hksb7k8R3ok3_8G-Gfs41fFTCFKyfxlPIOZmn9StgWRD5mtoF8IknnKnd8rObQzoBSvg', DATEADD(DAY, -1, GETDATE())),
(7231, 'Marcus', 'Thorne', 'mthorne@velocity.io', 'Velocity IO', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJeFSR-3zTDFADrFxkukKhKpMpysl3UTuKYJ6Bmb7FtKT3TZpBM7QCB9wi7EM-g6eiqozF5eLrgFcsJkKPKWqbhD-Pkt7ZoZBEFL3zqvzalPFRIPRq5tLwvIZX-wHjmakm4_vDhdRyGQF6YE1sSce1oL0HNLlbezCPkiZq6j54HA6jBrVlD9SIv0hNNEmKpaZ8V-YEnYnoQ-6X0y7IbRd4I3SIYmJdTVmHN5rdu4r5JjQ3XcLyqO_1sSixYAv0qoBR2cCpY-fPRQ', '2023-10-24'),
(5512, 'Alan', 'Smith', 'alan.s@northstar.com', 'North Star Labs', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxU86W643ghFATMvTDlNjGvst9g1RHdKAbv4QraqxOYIT0N1heUe_zYxbKUjBTNIqy3H-HgqAsCqTGI1VJC0lgC_C__v6P9yuz4iSzFexyPqDcINWS82wNQT37DK8H_OyErVYmHgsx_1R3XvCfK7g7WSW_rMD2pP347G3lAtAXeB_iyBamUtoL2EZ38MG0cvKjjzrsezUvBpQ_nK30mabxygr-hcUpsNZwEQePDEOY_17i0MQHBxlR2EZw3wh47VHglkK8whWLgw', '2023-10-22'),
(4112, 'Elena', 'Rodriguez', 'e.rodriguez@peakdesign.com', 'Peak Design', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWVMTRyq8ODrvZz13wr223H1qNG4rL4AexQQVLOATVGydpTIed9ETcpHWTjcxxOAHK9NFCaj8Xt7U_AWnHHeQhM8iYSdf-YgL93s2uhmofWyFkAUW1cL_wo95d2mEYpNalZXWXASL7oza_qxj8Yv4mxrxfRyPRiQ75cJXWof4xkxJjmBdl9TadeVLDrAaVm_GieC4GB9ud4cOHm4m1BUWBIPzhosJ7KB38oW28ZyzSefS77UbArLs96mIJ0TeyF3WM3XPjKu8VBA', '2023-10-21');

SET IDENTITY_INSERT Customers OFF;
GO

-- Insert Sample Tickets
SET IDENTITY_INSERT Tickets ON;

INSERT INTO Tickets (TicketId, Subject, Description, CustomerId, AssignedToUserId, Priority, Status, Category, CreatedAt, UpdatedAt)
VALUES 
(102, 'Login issue with OAuth provider', 'Users are reporting 500 errors when attempting to log in via Google...', 9421, 1, 'High', 'Open', 'Authentication', '2023-10-24', '2023-10-24'),
(103, 'Billing discrepancy on invoice #4529', 'The customer claims they were charged twice for the monthly plan...', 8842, 1, 'Urgent', 'In Progress', 'Billing', '2023-10-24', '2023-10-24'),
(104, 'API Documentation typo in /v2/endpoint', 'Small typo found in the response object description...', 7231, 1, 'Low', 'Closed', 'Documentation', '2023-10-23', '2023-10-23'),
(105, 'Feature request: Dark mode for Dashboard', 'Customer wants a native dark mode toggle for the client dashboard...', 7231, 1, 'Medium', 'Open', 'Feature Request', '2023-10-22', '2023-10-22'),
(106, 'Cannot reset password after account lock', 'User''s account was locked after too many attempts, reset email not sending...', 4112, 1, 'High', 'In Progress', 'Security', '2023-10-21', '2023-10-21');

SET IDENTITY_INSERT Tickets OFF;
GO

-- Add more sample tickets for better stats
INSERT INTO Tickets (Subject, Description, CustomerId, AssignedToUserId, Priority, Status, Category, CreatedAt)
SELECT TOP 35
    'Sample Ticket - ' + CAST(NEWID() AS NVARCHAR(50)),
    'This is a sample ticket description for testing purposes.',
    (SELECT TOP 1 CustomerId FROM Customers ORDER BY NEWID()),
    1,
    CASE ABS(CHECKSUM(NEWID())) % 4 
        WHEN 0 THEN 'Low'
        WHEN 1 THEN 'Medium'
        WHEN 2 THEN 'High'
        ELSE 'Urgent'
    END,
    CASE ABS(CHECKSUM(NEWID())) % 5
        WHEN 0 THEN 'Open'
        WHEN 1 THEN 'In Progress'
        WHEN 2 THEN 'Pending'
        WHEN 3 THEN 'Resolved'
        ELSE 'Closed'
    END,
    CASE ABS(CHECKSUM(NEWID())) % 5
        WHEN 0 THEN 'Technical'
        WHEN 1 THEN 'Billing'
        WHEN 2 THEN 'Feature Request'
        WHEN 3 THEN 'Bug Report'
        ELSE 'General Inquiry'
    END,
    DATEADD(DAY, -ABS(CHECKSUM(NEWID())) % 30, GETDATE())
FROM sys.objects;
GO

-- =============================================
-- Create Stored Procedures
-- =============================================

-- Get Tickets with Pagination
IF OBJECT_ID('sp_GetTickets', 'P') IS NOT NULL
    DROP PROCEDURE sp_GetTickets;
GO

CREATE PROCEDURE sp_GetTickets
    @Page INT = 1,
    @PageSize INT = 5,
    @Status NVARCHAR(50) = NULL,
    @Priority NVARCHAR(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Calculate offset
    DECLARE @Offset INT = (@Page - 1) * @PageSize;
    
    -- Get total count
    DECLARE @TotalCount INT;
    SELECT @TotalCount = COUNT(*)
    FROM Tickets t
    WHERE (@Status IS NULL OR t.Status = @Status)
        AND (@Priority IS NULL OR t.Priority = @Priority);
    
    -- Get paginated tickets
    SELECT 
        t.TicketCode AS id,
        t.Subject,
        t.Description,
        c.FullName AS requesterName,
        LEFT(c.FirstName, 1) + LEFT(c.LastName, 1) AS requesterInitials,
        t.Priority,
        t.Status,
        FORMAT(t.CreatedAt, 'MMM dd, yyyy') AS date,
        @TotalCount AS TotalCount,
        CEILING(CAST(@TotalCount AS FLOAT) / @PageSize) AS TotalPages
    FROM Tickets t
    INNER JOIN Customers c ON t.CustomerId = c.CustomerId
    WHERE (@Status IS NULL OR t.Status = @Status)
        AND (@Priority IS NULL OR t.Priority = @Priority)
    ORDER BY t.CreatedAt DESC
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END
GO

-- Get Customer List
IF OBJECT_ID('sp_GetCustomers', 'P') IS NOT NULL
    DROP PROCEDURE sp_GetCustomers;
GO

CREATE PROCEDURE sp_GetCustomers
    @SearchTerm NVARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        c.CustomerCode AS id,
        c.FullName AS name,
        c.Email,
        c.Company,
        COUNT(t.TicketId) AS tickets,
        CASE 
            WHEN c.LastActiveAt >= DATEADD(HOUR, -24, GETDATE()) THEN 
                CASE 
                    WHEN c.LastActiveAt >= DATEADD(HOUR, -1, GETDATE()) THEN 'Just now'
                    ELSE CAST(DATEDIFF(HOUR, c.LastActiveAt, GETDATE()) AS NVARCHAR(10)) + ' hours ago'
                END
            WHEN c.LastActiveAt >= DATEADD(DAY, -7, GETDATE()) THEN FORMAT(c.LastActiveAt, 'dddd')
            ELSE FORMAT(c.LastActiveAt, 'MMM dd, yyyy')
        END AS lastActive,
        c.AvatarUrl AS avatar
    FROM Customers c
    LEFT JOIN Tickets t ON c.CustomerId = t.CustomerId
    WHERE @SearchTerm IS NULL 
        OR c.FullName LIKE '%' + @SearchTerm + '%'
        OR c.Email LIKE '%' + @SearchTerm + '%'
        OR c.Company LIKE '%' + @SearchTerm + '%'
    GROUP BY c.CustomerCode, c.FullName, c.Email, c.Company, c.LastActiveAt, c.AvatarUrl
    ORDER BY c.LastActiveAt DESC;
END
GO

-- Authenticate User
IF OBJECT_ID('sp_AuthenticateUser', 'P') IS NOT NULL
    DROP PROCEDURE sp_AuthenticateUser;
GO

CREATE PROCEDURE sp_AuthenticateUser
    @Email NVARCHAR(255),
    @Password NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @UserId INT;
    
    SELECT @UserId = UserId
    FROM Users
    WHERE Email = @Email 
        AND PasswordHash = @Password 
        AND IsActive = 1;
    
    IF @UserId IS NOT NULL
    BEGIN
        -- Update last login
        UPDATE Users 
        SET LastLogin = GETDATE()
        WHERE UserId = @UserId;
        
        -- Return user info
        SELECT 
            UserId,
            Email,
            FullName,
            Role,
            AvatarUrl
        FROM Users
        WHERE UserId = @UserId;
    END
    ELSE
    BEGIN
        SELECT NULL AS UserId;
    END
END
GO

-- =============================================
-- Verification Queries
-- =============================================

PRINT '=============================================';
PRINT 'Database Setup Complete!';
PRINT '=============================================';
PRINT '';
PRINT 'Tables Created:';
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME;
PRINT '';
PRINT 'Sample Data Counts:';
SELECT 'Users' AS TableName, COUNT(*) AS RecordCount FROM Users
UNION ALL
SELECT 'Customers', COUNT(*) FROM Customers
UNION ALL
SELECT 'Tickets', COUNT(*) FROM Tickets;
PRINT '';
PRINT 'Login Credentials:';
PRINT '  Email: admin@supportdesk.com';
PRINT '  Password: admin123';
PRINT '';
PRINT 'Test Queries:';
PRINT '  EXEC sp_GetTickets @Page = 1, @PageSize = 5';
PRINT '  EXEC sp_GetCustomers';
PRINT '  EXEC sp_AuthenticateUser @Email = ''admin@supportdesk.com'', @Password = ''admin123''';
PRINT '  SELECT * FROM vw_TicketStats';
PRINT '=============================================';
GO

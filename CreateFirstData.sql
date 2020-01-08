DROP TABLE IF EXISTS users.accounts
Go

DROP SCHEMA IF EXISTS users
GO

CREATE SCHEMA Users;
GO

CREATE TABLE Users.Accounts (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  FirstName NVARCHAR(50),
  LastName NVARCHAR(50),
  AccountName NVARCHAR(50),
  Password NVARCHAR(50),
  Birthday DATE,
  School NVARCHAR(200),
  Grade TINYINT,
  Email NVARCHAR(255)
);
GO

INSERT INTO Users.Accounts (AccountName, Password) VALUES
(N'admin', N'HiLink101')
GO

SELECT * FROM Users.Accounts;
GO

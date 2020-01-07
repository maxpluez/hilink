CREATE SCHEMA Users;
GO

CREATE TABLE Users.Accounts (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(50),
  Password NVARCHAR(50)
);
GO

INSERT INTO Users.Accounts (Name, Password) VALUES
(N'admin', N'HiLink101')
GO

SELECT * FROM Users.Accounts;
GO
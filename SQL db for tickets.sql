USE master;
CREATE DATABASE Ticketsystem;
GO
USE Ticketsystem;
GO

create table users (
id int primary key identity(1 ,1) not null , 
name varchar(50) not null ,
emai varchar(150) not null , 
password varchar(150) not null ,
role varchar(20) default 'user' ,
    CreatedAt DATETIME DEFAULT GETDATE()
    );



    create table eventtypes (
    id int primary key identity (1,1) ,
    name varchar(50) not null
    );



    create table events (
    id int primary key identity (1,1) ,
    title varchar(50) not null ,
     Description NVARCHAR(MAX),
    EventTypeId INT,
    Location NVARCHAR(200),
    EventDate DATETIME,
    Price DECIMAL(10,2),
    AvailableSeats INT,
    CreatedBy INT,
    FOREIGN KEY (EventTypeId) REFERENCES EventTypes(Id),
    FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
    );


    CREATE TABLE Bookings (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT,
    EventId INT,
    NumberOfTickets INT,
    TotalPrice DECIMAL(10,2),
    BookingDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (EventId) REFERENCES Events(Id)
    );

    INSERT INTO EventTypes (Name) VALUES
('Football'),
('Handball'),
('Party'),
('Restaurant'),
('Standup'),
('Other');
 



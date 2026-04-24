# 🎟️ Tickets System - Backend Phase 1

This repository contains the backend implementation for our University Ticketing Project.

## ✅ Completed Tasks:

- **Database Architecture:** Designed the schema for users, events, and bookings.
- **Environment Setup:** Configured local PHP environment using XAMPP.
- **Database Connection:** Established a secure connection using **PDO**.
- **User Registration:** Implemented a secure signup system.

## 🛡️ Security Features Applied:

- **Password Hashing:** Using `PASSWORD_BCRYPT` to ensure user credentials are not stored in plain text.
- **SQL Injection Prevention:** Using **Prepared Statements** to secure database queries.

## 🚀 How to Run:

1. Clone the repository.
2. Import `SQL db for tickets.sql` into your MySQL database (phpMyAdmin).
3. Update `db.php` with your local credentials.
4. Access the registration via `localhost/tickets/register.php`.

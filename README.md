# 📚 MyLibrary

![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?logo=angular&logoColor=white&labelColor=444)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white&labelColor=444)
![Express](https://img.shields.io/badge/Express-4%2B-000000?logo=express&logoColor=white&labelColor=444)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-336791?logo=postgresql&logoColor=white&labelColor=444)
![License](https://img.shields.io/badge/License-MIT-yellow?labelColor=444)

A Full-stack Library Management System built using Angular and Node.js/Express.<br>

Implements modern web development practices, including RESTful API design, JWT-based authentication, relational database modeling, and role-based authorization.
 
 ---
 ## ▶️ Demo
 Live demo coming soon  

 ---

## ✨ Features
👤 Users
- Login/Registration
- JWT-based authentication
- Role-based authorization (User/Admin)
- Profile editing
- Avatar upload (Multer)

📚 Books
- Full CRUD operations (Admin only)
- Book cover image upload
- Google Books API integration
- Genre-based filtering
- Automatic tracking of available copies
- Prevention of borrowing when no copies are available

🏷 Genres
- Create & Delete genre (Admin only)
- Filter books by genre

🔄 Loans
- Borrow books
- Prevent duplicate active loans
- Return books
- Loan history overview (Admin only)
- Automatic availability update on borrow/return
---

## 🛠 Tech Stack
- **Angular 17+** 
- **Node.js / Express** (RESTful API)
- **Google Books API**
- **PostgreSQL** (Database)
- **JWT** (Authentication & Authorization)
- **Multer** (file uploads)
- **Postman** (API testing)
---

## 🌐 API Design
The backend follows RESTful conventions:
| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| GET    | /api/books         | Get all books |
| POST   | /api/books         | Create book   |
| PUT    | /api/books/:id     | Update book   |
| DELETE | /api/books/:id     | Delete book   |
| POST   | /api/auth/login    | Login         |
| POST   | /api/auth/register | Register      |
| POST   | /api/loans         | Borrow book   |
| GET    | /api/google/search | Search books via Google Books API   |
| POST   | /api/google/import | Import books from Google Books API  |

## 🗄 Database 
The application uses PostgreSQL as a Relational Database Management System. <br>
The Database is designed following normalization principles and relational modeling best practices.

<b>Entities</b>
- Users
- Books
- Genres
- Loans

<b>Relationships</b>
- Users  <->  Loans        (1:N)
- Books  <->  Loans        (1:N)
- Genres <->  Books       (1:N)

## 🚀 Installation & Running

Before running the project, make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download)  (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/download/) 
- [Angular CLI](https://angular.dev/tools/cli) 

1. **Clone the Repository**
   
   ```bash 
   git clone <repository-url>
   cd mylibrary
  
2. **Database Setup**

    Open **pgAdmin4**
   
    Create a new database named `library`
     
    Execute the provided SQL script (library.sql) to generate tables.
   
4. **Backend Setup**
   
   Navigate to backend folder:

   ```bash 
   cd backend
   npm install
   ```
   
   Create .env file inside the backend folder:
    ```bash 
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=library
   JWT_SECRET=your_secret_key
   GOOGLE_API_KEY=your_google_books_api_key
   ```

   Start backend server:
   ```bash 
   node server.js
   ```

   If everything is configured correctly, you should see:

   ```bash 
   [dotenv@17.3.1] injecting env (8) from .env -- tip: 🔐 prevent building .env in docker: https://dotenvx.com/prebuild
   [dotenv@17.3.1] injecting env (0) from .env -- tip: ⚙️  load multiple .env files with { path: ['.env.local', '.env'] }
   PostgreSQL connected at: localDateTime
   Running on port 3000
   ```

5. **Frontend Setup**
   
   Navigate to frontend folder:

   ```bash 
   cd frontend
   npm install
   ```

   Start frontend server:

   ```bash 
   ng serve
   ```

   The application will run at:

   ```bash 
   http://localhost:4200
   ```

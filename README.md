# 📚 MyLibrary

 [![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white)](#) [![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#) [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#) ![License](https://img.shields.io/badge/License-MIT-yellow)

A Full-stack Library Management System demonstrating modern web development practices, including RESTful API design, JWT-based authentication, relational database modeling, and role-based authorization.<br>

Developed with Angular, Node.js/Express, and PostgreSQL to showcase clean architecture, modular structure, and scalable backend design.
 <hr>

 # Demo
 Live demo coming soon  

 <hr>

# ✨ Features
👤 Users
- Login/Registration
- JWT-based authentiction
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
- Loan histoyr overview (Admin only)
- Automatic availability update on borrow/return
<hr>

# 🌐 API Design
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

# 🗄 Database 
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

# 🚀 Installation & Running

Before running the project, make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download)  (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/download/) 
- [Angular CLI](https://angular.dev/tools/cli) 

1. **Clone the Repository**
   
   ```bash 
   git clone <repository-url>
   cd mylibrary
  
2. **Database Setup**
   - Open **pgAdmin4**
   - Create a new database named
     
     ```bash 
     library
     ```
   -  Execute the provided SQL script (library.sql) to generate tables.
   
3. **Backend Setup**
   
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

4. **Frontend Setup**
   
   Navigate to frontend folder:

   ```bash 
   cd frontend
   npm install
   ng serve
   ```

   The application will run at:

   ```bash 
   http://localhost:4200
   ```

   
   



































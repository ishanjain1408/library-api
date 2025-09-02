# 📚 Library Management System (Backend)

A backend system for managing a digital library. It includes user authentication (Admin & Member roles), book management, borrowing & returning system with late fee handling, and reports for both members and admins.

---

## 🚀 Tech Stack
- **Backend Framework:** Node.js + Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT (JSON Web Token)  
- **Validation:** Joi / Express Validator  
- **Environment Management:** dotenv  

---

## 📂 Project Structure
Library-Management-System/
│── config/
│ └── db.js # MongoDB connection
│── controllers/ # Route controllers
│── middlewares/ # Auth & error handling
│── models/ # Mongoose models
│── routes/ # API routes
│── utils/ # Helper functions
│── .env.example # Example environment variables
│── package.json # Dependencies
│── server.js # Entry point
│── README.md # Documentation

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
2. Install Dependencies
bash
Copy code
npm install
3. Setup Environment Variables
Create a .env file in the root folder based on .env.example:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/libraryDB
JWT_SECRET=yourSecretKey
JWT_EXPIRES_IN=1d
4. Start Server
Development
bash
Copy code
npm run dev
Production
bash
Copy code
npm start
Server runs on: http://localhost:5000

🗄️ Database Schema / ER Diagram
Entities:
User

name: String

email: String (unique)

password: String (hashed)

role: String (enum: Admin, Member)

pendingFees: Number (default: 0)

Book

title: String

author: String

ISBN: String (unique)

copiesAvailable: Number

BorrowRecord

user: ObjectId (ref: User)

book: ObjectId (ref: Book)

borrowDate: Date

returnDate: Date (nullable)

fee: Number (default: 0)

ER Diagram:
sql
Copy code
User (Admin/Member)
   │ 1 --- * │
   │         │
BorrowRecord
   │ * --- 1 │
   │         │
Book
📖 API Documentation
You can test all endpoints using the provided Postman collection:
👉 Postman Collection Link (replace with your actual link)

Main Endpoints
🔑 Authentication
POST /api/auth/register → Register new user (Admin/Member)

POST /api/auth/login → Login and receive JWT token

📚 Book Management (Admin Only)
POST /api/books → Add new book

PUT /api/books/:id → Update book details

DELETE /api/books/:id → Delete book

GET /api/books → List all books

📖 Borrow & Return (Member Only)
POST /api/borrow/:bookId → Borrow book

POST /api/return/:bookId → Return book (auto fee calculation if late)

📊 Reports
GET /api/reports/member → Member: View borrowed/returned books & pending fees

GET /api/reports/admin → Admin: View all borrowed books & pending fees of members

✅ Example Request & Response
Login
Request

json
Copy code
POST /api/auth/login
{
  "email": "member1@example.com",
  "password": "password123"
}
Response

json
Copy code
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "64e8f2b7...",
    "name": "John Doe",
    "role": "Member"
  }
}
🔮 Future Enhancements
Pagination & filtering for books

Email notifications for overdue books

Payment gateway integration for fees

Swagger API documentation

👨‍💻 Author
Ishan Jain
📧 Email: ishanjain1408@gmail.com
🔗 LinkedIn | GitHub

yaml
Copy code

---

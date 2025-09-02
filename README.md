# 🚀 Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/ishanjain1408/library-api.git
cd library-management-system
2. Install Dependencies
bash
Copy code
npm install
3. Setup Environment Variables
Create a .env file in the root folder based on .env.example:

env
Copy code
PORT=4000
MONGO_URI=mongodb://localhost:27017/libraryDB
JWT_SECRET=yourSecretKey
JWT_EXPIRES_IN=1d
4. Start Server
Development:

bash
Copy code
npm run dev
Production:

bash
Copy code
npm start
Server runs on: http://localhost:4000

🧠 Database Schema / ER Diagram
Entities:
User
name: String

email: String (unique)

password: String (hashed)

yaml
Copy code

---
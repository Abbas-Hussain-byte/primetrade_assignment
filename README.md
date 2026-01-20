MERN Task Management Application

A robust full-stack/backend heavy application for managing tasks, built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates a production-ready API with Role-Based Access Control (RBAC) and a clean, functional frontend.

🚀 Features

User Authentication: Register and Login functionality using JWT (JSON Web Tokens).

Role-Based Access Control (RBAC): Secure endpoints restricted to specific user roles (user, admin).

Task Management: Create, Read, Update, and Delete (CRUD) tasks.

Responsive Frontend: Built with React and Vite for a fast user experience.

Security: Implements Helmet for secure headers and bcrypt for password hashing.

🔑 Admin Access Restriction (Important)

To clearly demonstrate Role-Based Access Control (RBAC), only the following predefined credentials are permitted to access the Admin Dashboard:

Name: testadmin
Email: testadmin@gmail.com
Password: admin123


Only this user is assigned the admin role in the database.

All newly registered users are assigned the user role by default.

The Admin Dashboard and admin-protected routes are inaccessible to non-admin users.

Unauthorized access attempts return appropriate HTTP status codes (401 / 403).

This controlled setup is intentional for secure and predictable evaluation of admin-level features.

🛠️ Technology Stack

Backend: Node.js, Express.js, MongoDB (Mongoose)

Frontend: React, Vite, Axios

Authentication: JWT, bcryptjs

Dev Tools: Nodemon, Morgan

⚙️ Installation & Setup
Prerequisites

Node.js (v14+ recommended)

MongoDB Atlas connection string or local MongoDB instance

1. Clone the Repository
git clone <repository-url>
cd assignment(backend)

2. Backend Setup
cd backend
npm install


Create a .env file in the backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development


Start the backend server:

npm start
# OR
npm run dev


Backend runs at: http://localhost:5000

3. Frontend Setup
cd ../frontend
npm install
npm run dev


Frontend runs at: http://localhost:5173

📡 API Endpoints
Authentication

POST /api/v1/auth/register

POST /api/v1/auth/login

GET /api/v1/auth/me (Protected)

Tasks

GET /api/v1/tasks (Protected)

POST /api/v1/tasks (Protected)

GET /api/v1/tasks/:id (Protected)

PUT /api/v1/tasks/:id (Protected)

DELETE /api/v1/tasks/:id (Protected)

🧪 Running Tests

No automated tests are configured. Manual testing can be performed via Postman or the Frontend UI.

📈 Scalability Note

The project follows a modular structure that allows easy scaling by:

Adding new modules and routes

Introducing caching (Redis)

Containerization with Docker

Migrating to microservices if required

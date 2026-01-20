# Full-Stack MERN Task Management Application

A robust full-stack application for managing tasks, built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates a production-ready API with Role-Based Access Control (RBAC) and a clean, functional frontend.

## 🚀 Features

-   **User Authentication**: Register and Login functionality using JWT (JSON Web Tokens).
-   **Role-Based Access Control (RBAC)**: secure endpoints restricted to specific user roles (e.g., 'user', 'admin').
-   **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
-   **Responsive Frontend**: Built with React and Vite for a fast user experience.
-   **Security**: Implements Helmet for headers and bcrypt for password hashing.

## 🛠️ Technology Stack

-   **Backend**: Node.js, Express.js, MongoDB (Mongoose)
-   **Frontend**: React, Vite, Axios
-   **Authentication**: JWT, bcryptjs
-   **Dev Tools**: Nodemon, Morgan

## ⚙️ Installation & Setup

### Prerequisites

-   Node.js (v14+ recommended)
-   MongoDB Atlas connection string or local MongoDB instance

### 1. Clone the Repository

```bash
git clone <repository-url>
cd assignment(backend)
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (see [Environment Variables](#environment-variables)).

Start the backend server:

```bash
npm start
# OR for development
npm run dev
```

The server will run on `http://localhost:5000`.

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The app will generally be available at `http://localhost:5173`.

## 🔐 Environment Variables

Create a `.env` file in the `backend` folder with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## 📡 API Endpoints

### Authentication

-   `POST /api/v1/auth/register` - Register a new user
-   `POST /api/v1/auth/login` - Login user and get token
-   `GET /api/v1/auth/me` - Get current user info (Protected)

### Tasks

-   `GET /api/v1/tasks` - Get all tasks (Protected)
-   `POST /api/v1/tasks` - Create a new task (Protected)
-   `GET /api/v1/tasks/:id` - Get a single task (Protected)
-   `PUT /api/v1/tasks/:id` - Update a task (Protected)
-   `DELETE /api/v1/tasks/:id` - Delete a task (Protected)

## 🧪 Running Tests

(Currently, no automated tests are configured. Manual verification via Postman or the Frontend is recommended.)

## 📈 Scalability Note

This application is designed with scalability in mind:
-   **Microservices Ready**: The backend structure (Controllers, Routes, Models) allows for easy splitting of services (e.g., Auth Service, Task Service) if traffic increases.
-   **Stateless Authentication**: JWT usage ensures the server remains stateless, making it easy to scale horizontally properly using a Load Balancer (like Nginx).
-   **Database Optimization**: MongoDB indexing can be further optimized for query performance on the `owner` field.
-   **Caching**: Redis can be integrated to cache frequently accessed data, such as User profiles or Task lists, to reduce database load.

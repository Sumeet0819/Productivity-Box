# Productivity Box

Productivity Box is a comprehensive, full-stack (MERN) personal productivity command center designed to help users manage their daily focus, tasks, finances, and coding workflows in a single, high-performance neural workspace.

## 🚀 Key Features

### Frontend Capabilities (React + Tailwind CSS + Vite)
- **Dashboard Command Center**: A beautifully crafted, responsive dashboard that gives you a birds-eye view of your entire life.
- **Task Manager (Todo)**: Advanced task tracking with expanded grid views, status indicators, and sleek UI animations.
- **Finance Hub**: Track your wallet balance, log incomes and expenses, visualize progress with progress bars, and manage custom transaction categories.
- **Scratchpad (Code Editor)**: A fully integrated code editor powered by `@monaco-editor/react`. Features syntax highlighting, auto-indentation, and multi-language support (JavaScript, Python, HTML, Markdown, etc.) in both widget and full-screen modes.
- **Strategic Goals**: Set, track, and complete long-term objectives.
- **Pomodoro Timer**: Maintain deep work intervals with customizable timers.
- **Weather & Atmosphere**: Real-time localized weather updates to help you plan your day.
- **Calendar & Timelines**: Visual scheduling and tracking.
- **Activity Graph**: Visualize your productivity velocity and daily activity.
- **Authentication UI**: Secure login and registration flows.

### Backend Capabilities (Node.js + Express + MongoDB)
- **RESTful API Architecture**: Robust and scalable backend endpoints.
- **User Authentication**: Secure user registration, login, and session management using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Data Persistence**: 
  - **Tasks**: Create, read, update, and delete tasks associated securely with the logged-in user.
  - **Finances**: Persistent storage for all income and expense transactions.
  - **Goals**: Store and retrieve long-term user objectives.
- **CORS Configured**: Secure cross-origin resource sharing setup for seamless frontend-backend communication.
- **Mongoose Schemas**: Well-structured data models for Users, Todos, Finances, and Goals.

## 🔌 API Reference & Data Flow

The frontend communicates with the Express backend using standard RESTful conventions. All protected routes require a JWT token passed in the `Authorization: Bearer <token>` header.

### Authentication Flow (`/api/auth`)
- `POST /register`: Creates a new user, hashes the password, and returns a JWT.
- `POST /login`: Authenticates user credentials and returns a JWT.
- `GET /me`: Validates the current JWT and returns user details.
- `PUT /profile`: Updates user identity data (name, avatar, etc.).

### Tasks / Todos (`/api/todos`)
- `GET /`: Retrieves all tasks for the authenticated user.
- `POST /`: Creates a new task.
- `PUT /:id`: Updates a task's status or text (e.g., marking as `done`).
- `DELETE /:id`: Removes a task permanently.
- `GET /stats`: Returns aggregated data (completed vs pending tasks).

### Finance Hub (`/api/finance`)
- `GET /`: Retrieves all transaction history.
- `POST /`: Logs a new income or expense with amount, description, and category.
- `GET /stats`: Returns calculated totals (current balance, total earned, total spent).
- `DELETE /reset`: Clears all financial history for the user.

### Strategic Goals (`/api/goals`)
- `GET /`: Retrieves all active and completed goals.
- `POST /`: Creates a new goal with a specific type and UI color tag.
- `PUT /:id`: Updates goal progress or completion status.
- `DELETE /:id`: Removes a goal.

## 📁 Project Structure

This is a monorepo containing both the client application and the server logic.

- `/frontend/` - The React web application source code.
  - Built with **React 19**, **Vite**, **Tailwind CSS**, and **Lucide React**.
- `/backend/` - The Node.js server source code.
  - Built with **Express**, **MongoDB** (Mongoose), and **JWT**.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB instance (local or Atlas)

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with your configuration:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory with your API URL:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the development server:
```bash
npm run dev
```

Then open the local development URL (usually `http://localhost:5173`) in your browser.

## 🤝 Contributions
Contributions, enhancements, and bug fixes are highly welcome. Feel free to open issues or submit pull requests to help improve the Productivity Box ecosystem!

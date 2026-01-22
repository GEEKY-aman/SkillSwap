# SkillSwap - Developer Collaboration Platform

SkillSwap is a full-stack web application designed to help developers collaborate, find jobs, participate in hackathons, and learn new skills. It features a modern React frontend and a robust Node.js/Express backend with MongoDB.

## Features

*   **Authentication**: Secure user registration and login with JWT.
*   **Jobs Board**: Browse and apply for jobs and internships.
*   **Hackathons**: Find and register for hackathons, build teams, and generate project ideas.
*   **Courses**: Enroll in courses to upgrade your skills.
*   **Quizzes**: Test your knowledge with interactive quizzes.
*   **Collaboration**: Real-time code editor and whiteboard for pair programming (in progress).
*   **Real-time Chat**: Chat with teammates (in progress).

## Tech Stack

*   **Frontend**: React, Vite, Tailwind CSS, Lucide React, Axios
*   **Backend**: Node.js, Express, MongoDB, Mongoose, Socket.io, JWT
*   **Database**: MongoDB

## Prerequisites

*   Node.js (v14 or higher)
*   MongoDB (local or Atlas connection string)

## Getting Started

### 1. Backend Setup

1.  Navigate to the server directory:
    ```bash
    cd server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and fill in your values:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/skillswap
    JWT_SECRET=your_jwt_secret_key_here
    ```
    *Note: Replace `mongodb://localhost:27017/skillswap` with your MongoDB Atlas URI if you are using a cloud database.*

4.  Start the backend server:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5001`.

### 2. Frontend Setup

1.  Open a new terminal and navigate to the root directory (if you are in `server`, go back one level):
    ```bash
    cd ..
    ```

2.  Install frontend dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and fill in your Gemini API Key if needed.

4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend will start on `http://localhost:5173`.

## Usage

1.  Open your browser and go to `http://localhost:5173`.
2.  **Sign Up**: Create a new account on the Auth page.
3.  **Explore**: Navigate to Jobs, Hackathons, Courses, or Quizzes to see the data fetched from the backend.
4.  **Collaborate**: Use the Collaborate page to access the code editor and whiteboard.

## API Endpoints

*   **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
*   **Jobs**: `/api/jobs`
*   **Hackathons**: `/api/hackathons`
*   **Courses**: `/api/courses`
*   **Quizzes**: `/api/quizzes`
*   **Projects**: `/api/projects`

## Troubleshooting

*   **Port Conflicts**: If port 5001 is busy, change the `PORT` in `server/.env` and update `src/services/api.ts` in the frontend.
*   **Database Connection**: Ensure MongoDB is running locally or your Atlas URI is correct.
*   **CORS Issues**: The backend is configured to allow all origins (`*`) for development.

## License

MIT

# Chemistry Structure Studio

## Problem Statement
Students and learners need an engaging way to explore chemistry concepts, visualize structures, and track their progress in a single interactive web experience. Traditional study materials are often static and disconnected from user progress, making it difficult to keep learning personalized and persistent.

## Solution
Chemistry Structure Studio solves this by combining an interactive React frontend with a backend that supports authenticated users and persistent progress storage. The application provides molecule browsing, knowledge panels, comparison tools, and a chemistry chatbot, while logged-in users can save progress to a PostgreSQL database for return visits.

## Project Overview
Chemistry Structure Studio is an interactive web application built with React and Vite. It presents a chemistry learning experience with molecular visuals, knowledge panels, quiz progress tracking, and an AI-like chatbot. A Node.js backend supports user authentication and PostgreSQL-backed progress storage.

## Key Features
- React + Vite frontend with a polished chemistry-themed UI
- User signup/login with JWT authentication
- PostgreSQL storage for user progress data
- Backend API powered by Express
- Chemistry-focused chatbot component with offline responses and Gemini API support
- Persistent user progress across sessions when logged in

## Architecture
- `src/` - React frontend components and application logic
- `backend/` - Express backend and database initialization scripts
- `backend/server.js` - API server for auth and progress persistence
- `backend/init-db.js` - creates required PostgreSQL tables
- `src/api/auth.js` - frontend API helpers for signup/login/progress calls
- `src/components/AuthForm.jsx` - login/signup UI
- `src/components/ProfileBanner.jsx` - user info and logout control

## Backend Endpoints
- `POST /api/signup` - create new user account
- `POST /api/login` - authenticate existing user
- `GET /api/me` - retrieve signed-in user email and ID
- `GET /api/progress` - load saved user progress
- `POST /api/progress` - save user progress to the database

## Database Schema
The backend uses PostgreSQL with the following tables:

### `users`
- `id` SERIAL PRIMARY KEY
- `email` TEXT UNIQUE NOT NULL
- `password_hash` TEXT NOT NULL
- `created_at` TIMESTAMPTZ DEFAULT now()

### `user_progress`
- `user_id` INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE
- `progress` JSONB NOT NULL DEFAULT '{}'::jsonb
- `updated_at` TIMESTAMPTZ DEFAULT now()

## Setup Instructions
1. Clone or open the project in your workspace.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure backend environment:
   - Copy `backend/.env.example` to `backend/.env`
   - Update `DATABASE_URL` and `JWT_SECRET`

4. Ensure PostgreSQL is running and the configured database is accessible.
5. Grant proper schema permissions if needed:
   ```sql
   GRANT USAGE, CREATE ON SCHEMA public TO studio_user;
   GRANT ALL PRIVILEGES ON DATABASE chemistry_studio TO studio_user;
   ```
6. Initialize the database schema:
   ```bash
   cd backend
   node init-db.js
   ```

## Running the App
### Backend
```bash
cd backend
node server.js
```
The backend listens on port `4000` by default.

### Frontend
```bash
cd ..
npm run dev
```
The frontend runs on Vite’s default port and may open at `http://localhost:5173/` or the next available port.

## Environment Notes
- `backend/.env` should contain a valid `DATABASE_URL` and `JWT_SECRET`
- For production, replace the placeholder DB password and JWT secret with secure values

## Current Limitations
- The chatbot does not persist conversation history in the database yet
- Chat session state is stored only in component state and resets on page refresh

## Submission Notes
This submission document describes the current implementation, required configuration, and how to run the full application locally. The project includes both frontend and backend code necessary for authentication and persistent progress tracking.

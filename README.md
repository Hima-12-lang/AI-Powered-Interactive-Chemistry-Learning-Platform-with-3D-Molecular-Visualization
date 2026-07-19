# Chemistry Structure Studio

## Overview
Chemistry Structure Studio is an interactive educational web app for exploring chemistry concepts. It uses a React + Vite frontend and an Express backend to authenticate users and store their learning progress in PostgreSQL.

## What the App Solves
Students need a more engaging way to learn chemistry while keeping track of their progress. This app solves that by offering:
- interactive chemistry object browsing
- learning progression tracking
- secure user login/signup
- backend persistence via PostgreSQL

## Features
- Signup and login with email/password authentication
- Persistent progress storage per user
- Chemistry-focused chatbot component
- Chemistry object details, comparison modal, and learning lab features
- Vite-powered React frontend with a responsive UI

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure backend environment:
   - Copy `backend/.env.example` to `backend/.env`
   - Set `DATABASE_URL` and `JWT_SECRET`
3. Initialize the database schema:
   ```bash
   cd backend
   node init-db.js
   ```

## Running
### Backend
```bash
cd backend
node server.js
```

### Frontend
```bash
cd ..
npm run dev
```

## Notes
- The frontend uses `src/api/auth.js` to call backend auth and progress APIs.
- The backend uses PostgreSQL to store user accounts and progress.
- Chatbot history is not saved to the database yet.

## Database Tables
- `users` (id, email, password_hash, created_at)
- `user_progress` (user_id, progress, updated_at)

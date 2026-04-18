# Movie Mood Recommender 🎬😊

A full-stack movie recommendation app that suggests movies based on emoji-selected moods.

## Tech Stack
- React + Vite
- Node.js + Express
- TMDB API
- Firebase Auth + Firestore

## Features
- Pick a mood using emojis
- Get movie recommendations based on that mood
- See posters, genres, ratings, and overview
- Sign in with Google using Firebase
- Save favorite movies to Firestore
- Save recent mood searches per user

## Mood Mapping
- 😄 Happy → Comedy, Family, Animation
- 😢 Sad → Drama, Romance
- 😱 Scared → Horror, Thriller
- 😍 Romantic → Romance
- 🤩 Excited → Action, Adventure, Science Fiction
- 😌 Chill → Documentary, Music, Fantasy

## Project Structure
\`\`\`
movie-mood-recommender/
  client/   # React frontend
  server/   # Express backend
\`\`\`

## 1) Create the environment files

### client/.env
\`\`\`
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
\`\`\`

### server/.env
\`\`\`
PORT=5000
TMDB_API_KEY=your_tmdb_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_KEY\\n-----END PRIVATE KEY-----\\n"
\`\`\`

## 2) Install dependencies
\`\`\`bash
npm install
\`\`\`

## 3) Run the app
\`\`\`bash
npm run dev
\`\`\`

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.

## Firebase Setup
1. Create a Firebase project.
2. Enable **Google Authentication** in Firebase Authentication.
3. Create a Firestore database.
4. Add a web app and copy the config into `client/.env`.
5. Create a service account and put the values into `server/.env`.

## Firestore Suggested Collections
- `users/{uid}/favorites/{movieId}`
- `users/{uid}/moodHistory/{docId}`

## TMDB Setup
1. Create an account on TMDB.
2. Generate an API key.
3. Add it to `server/.env`.

## Notes
- The backend proxies requests to TMDB so your key is not exposed in the browser.
- Favorites and history are protected by Firebase login.

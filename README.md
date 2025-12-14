Quiz App
A full-stack quiz application built with Node.js, Express, MongoDB, and the Open Trivia Database API. Users can create accounts, take quizzes, track their scores, and compete on a global leaderboard.
🌐 Live Demo
Deployed App: https://quiz-app-g1zl.onrender.com
👤 Developer
Nia Bardavelidze - Full Stack Development (All features, frontend, backend, database integration, and deployment)
✨ Features
Core Features

Home Page - Landing page where users can navigate to different sections of the app
Quiz Game - Interactive 10-question multiple-choice quiz powered by the Open Trivia Database API
Results Page - Displays user's score after completing the quiz
User Authentication - Secure signup and login system with password hashing using bcrypt
Score Tracking - User scores are automatically saved to MongoDB after each quiz attempt
User Profile - Personal dashboard showing complete quiz history with dates and scores
Leaderboard - Displays top 10 players globally and shows current user's rank

Technical Features

Session Management - Express sessions for maintaining user authentication state
Password Security - Bcrypt hashing for secure password storage
MongoDB Integration - NoSQL database for storing users, scores, and quiz history
API Integration - Dynamic question fetching from Open Trivia Database
Responsive Design - Clean, modern UI with custom CSS styling
Question Randomization - Shuffled answer options and varied questions on each playthrough

🛠️ Technology Stack
Backend:

Node.js
Express.js v5.2.1
MongoDB v7.0.0
Express-session v1.18.2
Bcrypt v6.0.0
dotenv v17.2.3

Frontend:

HTML5
CSS3 (Custom styling with CSS variables)
Vanilla JavaScript

API:

Open Trivia Database API (https://opentdb.com/)

Hosting:

Render (Web Service)
MongoDB Atlas (Database)

📋 Prerequisites
Before running this project, make sure you have:

Node.js (v20.x or higher)
MongoDB Atlas account (or local MongoDB installation)
Git

🚀 Installation & Setup
1. Clone the Repository
bashgit clone https://github.com/NiaB19/quiz-app
cd quizapp
2. Install Dependencies
bashnpm install
3. Environment Configuration
Create a .env file in the root directory:
envATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/quizApp?retryWrites=true&w=majority
SESSION_SECRET=your-secret-key-here
PORT=3000
⚠️ REPLACE THESE:

username - Your MongoDB Atlas username
password - Your MongoDB Atlas password
cluster - Your MongoDB Atlas cluster address
your-secret-key-here - A random secret string for sessions

4. Database Setup
The application will automatically create the required collections (users and scores) when you first run it. Make sure your MongoDB Atlas cluster is accessible.
5. Start the Server
Development mode (with nodemon):
bashnpx nodemon server.js
Production mode:
bashnpm start
The server will start on http://localhost:3000
📁 Project Structure
quizapp/
│
├── models/
│   └── db.js                 # MongoDB connection logic
│
├── public/
│   ├── routes/
│   │   ├── app.js           # Quiz game logic
│   │   ├── index.js         # Home page logic
│   │   ├── signin.js        # Sign in functionality
│   │   ├── signup.js        # Sign up functionality
│   │   ├── results.js       # Results page logic
│   │   ├── profile.js       # User profile logic
│   │   └── leaderboard.js   # Leaderboard logic
│   │
│   ├── index.html           # Home page
│   ├── signin.html          # Login page
│   ├── signup.html          # Registration page
│   ├── quiz.html            # Quiz game page
│   ├── results.html         # Quiz results page
│   ├── profile.html         # User profile page
│   ├── leaderboard.html     # Leaderboard page
│   └── style.css            # Global styles
│
├── server.js                # Express server & API routes
├── package.json             # Project dependencies
├── .env                     # Environment variables (not in repo)
└── README.md               # This file
🔌 API Endpoints
Authentication Routes

POST /api/signup - Register a new user
POST /api/signin - Login existing user
POST /api/logout - Logout current user
GET /api/session - Check if user is logged in

Quiz Routes

GET /api/questions?amount=10 - Fetch quiz questions from Trivia API
POST /api/save-score - Save user's quiz score

User Routes

GET /api/profile - Get user's quiz history
GET /api/leaderboard - Get top 10 players and user rank

🎮 How to Use

Sign Up - Create a new account with your name, email, and password
Sign In - Log in with your credentials
Start Quiz - Click "Start Quiz" from the home page
Answer Questions - Select answers for 10 multiple-choice questions
View Results - See your score and have it automatically saved
Check Profile - View your complete quiz history
View Leaderboard - See where you rank among all players

🎨 Design Features

Color Scheme: Sea moss green (#2f7f6f) and soft pink (#f4a7b9)
Responsive Layout: Mobile-friendly design
Interactive Elements: Hover effects and smooth transitions
Clean UI: Modern, minimalist interface with SVG icons

🔒 Security Features

Password hashing with bcrypt (10 salt rounds)
Session-based authentication
Protected routes requiring login
SQL injection prevention through MongoDB
Environment variable protection

🚀 Deployment (Render)
Steps to Deploy:

Push to GitHub

bash   git add .
   git commit -m "Ready for deployment"
   git push origin main

Create Render Web Service

Go to render.com
Click "New +" → "Web Service"
Connect your GitHub repository
Configure:

Name: quizapp (or your preferred name)
Environment: Node
Build Command: npm install
Start Command: npm start
Plan: Free




Add Environment Variables in Render

Go to your web service dashboard
Click "Environment"
Add:

ATLAS_URI = your MongoDB connection string
SESSION_SECRET = your secret key




Deploy

Render will automatically deploy your app
Your app will be live at https://your-app-name.onrender.com



Important Deployment Notes:

Free tier limitations: Apps may sleep after inactivity (first request takes 30-60 seconds)
MongoDB Atlas: Ensure IP whitelist allows connections from anywhere (0.0.0.0/0)
Session cookies: Already configured for deployment in server.js

🐛 Known Issues & Limitations

Free tier Render apps sleep after 15 minutes of inactivity
No password reset functionality
No email verification
Quiz questions are always in English (API limitation)
Limited to multiple-choice questions only

🔮 Future Enhancements (Potential)

 Timer for each question or entire quiz
 Ability to select number of questions
 Difficulty level selection
 Category-based quizzes
 Social sharing of scores
 Achievements and badges
 Password reset via email
 Profile picture upload
 Dark mode toggle

📝 License
This project is for educational purposes as part of a web development course.
🙏 Acknowledgments

Open Trivia Database for providing free quiz questions
MongoDB Atlas for database hosting
Render for free web hosting
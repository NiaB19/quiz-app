Quiz App
A full-stack trivia quiz application with user authentication, score tracking, and leaderboards.
🎯 Features
Core Features

Home Page - Welcome page with login/signup options and quiz start button
Quiz Page - Interactive 10-question multiple choice quiz
Results Page - Displays quiz score and saves to user profile
User Authentication - Secure signup/login with password hashing
User Profile - View personal quiz history and scores
Leaderboard - Top 10 players ranked by best score with user rank display
Play Again - Restart quiz from results page

Technical Features

Questions fetched from Open Trivia Database API
Answers shuffled randomly for each question
HTML entity decoding for special characters
Session-based authentication
MongoDB database for user and score storage
Responsive design with modern UI

👤 Developer
Nia Bardavelidze - Solo Developer
My Contributions:

Designed and implemented all frontend pages (HTML/CSS/JavaScript)
Built backend server with Express.js and RESTful API routes
Integrated MongoDB database for user authentication and score storage
Implemented secure authentication system with bcrypt password hashing
Created user profile and leaderboard features
Integrated Open Trivia Database API for dynamic quiz questions
Deployed application to production environment
Wrote comprehensive documentation

🛠️ Technologies Used

Frontend: HTML5, CSS3, JavaScript (ES6+)
Backend: Node.js, Express.js
Database: MongoDB
Authentication: bcrypt, express-session
API: Open Trivia Database API
Deployment: [Render/Heroku]

📁 Project Structure
QUIZAPP/
├── models/
│   └── db.js                    
├── node_modules/
├── public/
│   ├── routes/
│   │   ├── app.js
│   │   ├── index.js
│   │   ├── leaderboard.js
│   │   ├── profile.js
│   │   ├── results.js
│   │   ├── signin.js
│   │   └── signup.js
│   ├── index.html
│   ├── leaderboard.html
│   ├── profile.html
│   ├── quiz.html
│   ├── results.html
│   ├── signin.html
│   ├── signup.html
│   └── style.css
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

🚀 Setup Instructions
Prerequisites

Node.js (v14 or higher)
MongoDB Atlas account (free tier)
Git

Installation

Clone the repository

bash   git clone [your-github-repo-url]
   cd QuizApp

Install dependencies

bash   npm install

Create .env file in the root directory

env   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_random_secret_key
   PORT=3000

Set up MongoDB

Create a free account at MongoDB Atlas
Create a new cluster
Create a database user
Get your connection string
Replace <password> with your database user password
Paste into .env file


Run the server

bash   node server.js

Open in browser

   http://localhost:3000
📝 API Endpoints
Authentication

POST /api/signup - Register new user
POST /api/signin - Login user
POST /api/logout - Logout user
GET /api/session - Check login status

Quiz

GET /api/questions?amount=10 - Fetch quiz questions from Trivia API
POST /api/save-score - Save quiz score (requires login)

User Data

GET /api/profile - Get user's quiz history (requires login)
GET /api/leaderboard - Get top 10 players and user rank

🗄️ Database Schema
Users Collection
javascript{
  _id: ObjectId,
  firstname: String,
  email: String,
  password: String (hashed),
  createdAt: Date
}
Scores Collection
javascript{
  _id: ObjectId,
  userId: String,
  username: String,
  score: Number,
  total: Number,
  playedAt: Date
}
🎮 How to Use

Sign Up - Create an account with your name, email, and password
Sign In - Log in with your credentials
Start Quiz - Click "Start Quiz" from the home page
Answer Questions - Select answers for 10 multiple choice questions
View Results - See your score and automatic save to profile
Check Profile - View your quiz history and scores
View Leaderboard - See top 10 players and your ranking

🌐 Deployment
Deploy to Render (Free)

Push code to GitHub
Go to Render.com and sign up
Create new "Web Service"
Connect your GitHub repository
Configure:

Build Command: npm install
Start Command: node server.js


Add environment variables in Render dashboard:

MONGODB_URI
SESSION_SECRET


Deploy!

Deploy to Heroku (Free)

Install Heroku CLI
Login: heroku login
Create app: heroku create your-quiz-app-name
Set environment variables:

bash   heroku config:set MONGODB_URI=your_connection_string
   heroku config:set SESSION_SECRET=your_secret

Deploy: git push heroku main

🔒 Security Features

Passwords hashed with bcrypt (10 salt rounds)
Session-based authentication
Environment variables for sensitive data
Input validation on all forms
Protected API routes requiring authentication

🐛 Known Issues & Future Improvements

Add timer for each question
Add ability to choose number of questions
Add different difficulty levels
Add category selection
Add password strength requirements
Add email verification
Add forgot password functionality
Add profile picture upload

📚 Resources Used

Open Trivia Database API
MongoDB Atlas Documentation
Express.js Documentation
bcrypt Documentation

📄 License
This project was created for educational purposes as part of [Course Name] at [University Name].
🙏 Acknowledgments

Professor [Name] for project guidelines
Open Trivia Database for free API
Team members for their contributions


Live Demo: [Your deployed app URL here]
GitHub Repository: [Your GitHub repo URL here]
Quiz App

A full-stack quiz application built with Node.js, Express, MongoDB, and the Open Trivia Database API, demonstrating end-to-end software development, API integration, authentication, and production deployment.

🔗 Live Demo: https://quiz-app-g1zl.onrender.com

🔗 GitHub: https://github.com/NiaB19/quiz-app

Overview

This project focuses on building a scalable, data-driven web application using modern Computer Science and software engineering principles. Users can securely authenticate, take randomized quizzes, track historical performance, and view a global leaderboard. The application emphasizes backend reliability, secure workflows, and clean frontend rendering.

Key Contributions

Developed a full-stack application using Node.js, Express, and MongoDB, supporting dynamic content, persistent data storage, and RESTful workflows.

Implemented secure authentication with bcrypt hashing and session management, testing and debugging software behavior to ensure data integrity.

Integrated an external REST API to dynamically fetch and randomize quiz questions, improving engagement through real-time data processing.

Deployed the application on Render with environment-based configuration and Git-based version control, demonstrating production deployment workflows.

Core Features

User authentication (signup, login, sessions)

Dynamic quiz generation via Open Trivia Database API

Score tracking and user profiles

Global leaderboard with ranking logic

Responsive UI with custom CSS

Tech Stack

Backend: Node.js, Express, MongoDB, Express-Session, Bcrypt
Frontend: HTML, CSS, JavaScript
API: Open Trivia Database
Deployment: Render, MongoDB Atlas
Tools: Git, dotenv

Setup (Local)
git clone https://github.com/NiaB19/quiz-app
cd quiz-app
npm install
npm start


Create a .env file:

ATLAS_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
PORT=3000

Why This Project Matters

This project demonstrates practical experience in software development, testing and debugging, API-driven workflows, and version control systems. The skills applied are transferable to large-scale platforms in areas such as recruitment, pricing, retail, analytics, and long-term planning systems.

License

Educational and demonstration use only.

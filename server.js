require("dotenv").config();
const { connectToDB, getCollection } = require('./models/db');
const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

// ============= MIDDLEWARE =============
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Helper function for error responses
const sendError = (res, status, message) => {
  res.status(status).json({ success: false, message });
};

// ============= ROUTES =============

// Get quiz questions from Trivia API
app.get('/api/questions', async (req, res) => {
  try {
    const amount = req.query.amount || 10;
    const url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
    
    const response = await fetch(url);
    const data = await response.json();

    const questions = data.results.map(q => ({
      question: q.question,
      answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
      correct: q.correct_answer
    }));

    res.json(questions);
  } catch (error) {
    console.error("Trivia API error:", error);
    sendError(res, 500, "Failed to load questions");
  }
});

// Sign up new user
app.post('/api/signup', async (req, res) => {
  const { firstname, email, password } = req.body;

  if (!firstname || !email || !password) {
    return sendError(res, 400, 'All fields required');
  }

  try {
    const users = getCollection('users');
    
    if (await users.findOne({ email })) {
      return sendError(res, 400, 'Email already registered');
    }

    await users.insertOne({
      firstname,
      email,
      password: await bcrypt.hash(password, 10),
      createdAt: new Date()
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Signup error:', err);
    sendError(res, 500, 'Server error');
  }
});

// Sign in existing user
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 400, 'All fields required');
  }

  try {
    const users = getCollection('users');
    const user = await users.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendError(res, 400, 'Invalid email or password');
    }

    req.session.userId = user._id.toString();
    req.session.username = user.firstname;

    req.session.save((err) => {
      if (err) return sendError(res, 500, 'Failed to create session');
      res.json({ success: true, username: user.firstname });
    });
  } catch (err) {
    console.error('Signin error:', err);
    sendError(res, 500, 'Server error');
  }
});

// Check if user is logged in
app.get('/api/session', (req, res) => {
  res.json(req.session.userId 
    ? { loggedIn: true, username: req.session.username }
    : { loggedIn: false }
  );
});

// Logout user
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Save quiz score
app.post('/api/save-score', async (req, res) => {
  if (!req.session.userId) {
    return sendError(res, 401, 'Must be logged in to save score');
  }

  try {
    const scores = getCollection('scores');
    const { score, total } = req.body;
    
    await scores.insertOne({
      userId: req.session.userId,
      username: req.session.username,
      score,
      total,
      playedAt: new Date()
    });

    res.json({ success: true, message: 'Score saved!' });
  } catch (err) {
    console.error('Save score error:', err);
    sendError(res, 500, 'Failed to save score');
  }
});

// Get user's quiz history
app.get('/api/profile', async (req, res) => {
  if (!req.session.userId) {
    return sendError(res, 401, 'Not logged in');
  }

  try {
    const scores = getCollection('scores');
    const userScores = await scores
      .find({ userId: req.session.userId })
      .sort({ playedAt: -1 })
      .toArray();

    res.json({ 
      success: true,
      username: req.session.username,
      scores: userScores
    });
  } catch (err) {
    console.error('Profile error:', err);
    sendError(res, 500, 'Failed to load profile');
  }
});

// Get leaderboard - top 10 players
app.get('/api/leaderboard', async (req, res) => {
  try {
    const scores = getCollection('scores');
    const allScores = await scores.find({}).sort({ score: -1 }).toArray();

    // Keep only best score per user
    const bestScores = {};
    allScores.forEach(entry => {
      if (!bestScores[entry.username] || entry.score > bestScores[entry.username].score) {
        bestScores[entry.username] = entry;
      }
    });

    const leaderboard = Object.values(bestScores)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    // Find current user's rank
    let userRank = null;
    if (req.session.username && bestScores[req.session.username]) {
      const allRanked = Object.values(bestScores).sort((a, b) => b.score - a.score);
      userRank = allRanked.findIndex(s => s.username === req.session.username) + 1;
    }

    res.json({ success: true, leaderboard, userRank });
  } catch (err) {
    console.error('Leaderboard error:', err);
    sendError(res, 500, 'Failed to load leaderboard');
  }
});

// Serve static files
app.use(express.static("public"));

// ============= START SERVER =============
(async () => {
  await connectToDB();
  console.log("✅ Connected to MongoDB");
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
})();


const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const corsOptions = require('./config/corsOptions.js');

const authRoutes = require('./routes/authRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const articleRoutes = require('./routes/articleRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'DevSphere REST API is running',
    healthCheck: '/api/health'
  });
});

// Database health check
app.get('/api/health', async (req, res) => {
  try {
    await connectDB();

    res.json({
      success: true,
      message: 'DevSphere API is running',
      database: 'Connected to MongoDB',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(503).json({
      success: false,
      message: 'Database connection failed',
      database: 'Disconnected'
    });
  }
});

// Connect to MongoDB before processing API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

app.use((err, req, res, next) => {
  console.error('[Error]:', err.message);

  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

// Export Express app for Vercel
module.exports = app;

// Start local server only during local development
if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`DevSphere API running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Database startup failed:', err.message);
      process.exit(1);
    });
}


const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db.js');
const corsOptions = require('./config/corsOptions.js');

const authRoutes = require('./routes/authRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const articleRoutes = require('./routes/articleRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB before handling API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    res.status(503).json({
      success: false,
      message: 'Database connection unavailable'
    });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'DevSphere REST API is running',
    healthCheck: '/api/health'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'DevSphere API is operating normally',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('[Error]:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

// Local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`DevSphere API running on port ${PORT}`);
  });
}

module.exports = app;

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
const PORT = process.env.PORT || 5000;

// Initialize MongoDB connection on startup
connectDB();

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'DevSphere REST API is running',
    userWebsite: 'http://localhost:5173',
    adminWebsite: 'http://localhost:5174',
    healthCheck: '/api/health'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'DevSphere API Server is operating normally',
    database: require('mongoose').connection.readyState === 1 ? 'Connected to MongoDB' : 'In-Memory Store',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  console.error('[Error]:', err.message);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`[DevSphere API] Server listening on http://localhost:${PORT}`);
});

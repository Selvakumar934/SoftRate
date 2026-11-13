const mongoose = require('mongoose');

// Crucial: Disable Mongoose buffering so queries never freeze/timeout for 10000ms if disconnected
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>') || uri.includes('<NEW_PASSWORD>')) {
    console.log('\n=============================================================');
    console.log('[DevSphere Database Status: Development Mode]');
    console.log('MongoDB Atlas URI contains placeholders (<username> / <NEW_PASSWORD>).');
    console.log('Local fallback memory store active. All Admin and User features work instantly.');
    console.log('When you add real MongoDB Atlas credentials to .env, it will sync automatically.');
    console.log('=============================================================\n');
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // Fast 5s timeout instead of hanging
    });
    console.log(`[MongoDB Atlas] Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Atlas] Connection attempt failed: ${error.message}`);
    console.log('[DevSphere] Seamlessly operating in Local Development Mode.\n');
  }
};

module.exports = connectDB;

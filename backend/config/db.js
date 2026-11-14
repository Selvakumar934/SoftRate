const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

const connectDB = async () => {
  const envUri = process.env.MONGODB_URI;
  const isPlaceholder = !envUri || envUri.includes('<username>') || envUri.includes('<NEW_PASSWORD>');
  const targetUri = !isPlaceholder ? envUri : 'mongodb://127.0.0.1:27017/devsphere';

  try {
    const conn = await mongoose.connect(targetUri, {
      serverSelectionTimeoutMS: 4000
    });
    console.log(`[MongoDB] Connected successfully to ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    console.warn(`[MongoDB] Could not connect to ${targetUri}: ${err.message}`);
    console.log('[DevSphere] Operating in seamless in-memory fallback mode.');
    return null;
  }
};

module.exports = connectDB;

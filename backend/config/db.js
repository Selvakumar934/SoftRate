
const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

let connectionPromise = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    })
    .then(() => {
      console.log(
        `[MongoDB] Connected successfully to ${mongoose.connection.host}/${mongoose.connection.name}`
      );

      return mongoose.connection;
    })
    .catch((err) => {
      connectionPromise = null;

      console.error('[MongoDB] Connection failed:', err.message);

      throw err;
    });
  }

  return connectionPromise;
};

module.exports = connectDB;

const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) return;

  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('CRITICAL ERROR: MONGO_URI is undefined in process.env!');
    return;
  }

  try {
    const db = await mongoose.connect(mongoUri);
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB Connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;
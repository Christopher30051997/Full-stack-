const mongoose = require('mongoose');

const connectDB = async (uri) => {
  if (!uri) throw new Error('MONGODB_URI not provided');
  try {
    await mongoose.connect(uri, {
      autoIndex: true,
      maxPoolSize: 10
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err);
    throw err;
  }
};

module.exports = connectDB;
  

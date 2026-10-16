const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI;
    console.log(connUri);
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Server will continue running, but DB operations will fail until MongoDB is started or MONGODB_URI is updated in backend/.env');
  }
};

module.exports = connectDB;

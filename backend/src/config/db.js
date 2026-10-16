import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || "mongodb+srv://sachinsingh9272:8JSFr7d6qvjNUwnV@databases.0nr1tnl.mongodb.net/arquette-digital?retryWrites=true&w=majority&appName=Databases";
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Server will continue running, but DB operations will fail until MongoDB is started or MONGODB_URI is updated in backend/.env');
  }
};

export default connectDB;

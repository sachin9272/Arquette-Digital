import mongoose from 'mongoose';
import 'dotenv/config';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  const connUri = process.env.MONGODB_URI || "mongodb+srv://sachinsingh9272:8JSFr7d6qvjNUwnV@databases.0nr1tnl.mongodb.net/arquette-digital?retryWrites=true&w=majority&appName=Databases";

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(connUri, opts).then((mongooseInstance) => {
      console.log(`✅ MongoDB Connected Successfully: ${mongooseInstance.connection.host}/${mongooseInstance.connection.name}`);
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null;
      console.error(`❌ MongoDB Connection Error: ${err.message}`);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.warn('⚠️ Server will continue running, but DB operations will fail until MongoDB is accessible.');
  }
};

export default connectDB;

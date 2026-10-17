import mongoose from 'mongoose';
import dns from 'dns';
import 'dotenv/config';

// Fix for Windows / ISP DNS resolving mongodb+srv:// SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore in restricted environments
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  const rawUri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    'mongodb+srv://sachinsingh9272:8JSFr7d6qvjNUwnV@databases.0nr1tnl.mongodb.net/arquette-digital?retryWrites=true&w=majority&appName=Databases';
  const connUri = rawUri.trim().replace(/^['"]|['"]$/g, '');

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(connUri, opts)
      .then((mongooseInstance) => {
        console.log(`✅ MongoDB Connected Successfully: ${mongooseInstance.connection.host}/${mongooseInstance.connection.name}`);
        return mongooseInstance;
      })
      .catch((err) => {
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

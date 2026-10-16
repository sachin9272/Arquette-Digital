import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { verifySmtpConnection } from './services/emailService.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import themeRoutes from './routes/themeRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB on launch
connectDB();

// Dynamic CORS configuration supporting local dev and Vercel deployments
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests or same-origin requests
    if (!origin) return callback(null, true);

    const isExplicitlyAllowed = allowedOrigins.includes(origin);
    const isVercelDomain = origin.endsWith('.vercel.app');
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');

    if (isExplicitlyAllowed || isVercelDomain || isLocalhost) {
      return callback(null, true);
    }

    // Fallback: permissive in development
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Ensure MongoDB is connected for every serverless request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection middleware error:', err);
    next();
  }
});

// Health check route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    clinic: 'PRALASH Dermystique & Dentique Healthcare Backend',
    version: '1.0.0',
    environment: process.env.VERCEL ? 'vercel-serverless' : 'node-server',
    endpoints: {
      appointments: '/api/appointments',
      doctors: '/api/doctors',
      adminStats: '/api/appointments/stats/overview',
      health: '/api/health',
    },
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: process.env.VERCEL ? 'vercel-serverless' : 'node-server',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// Mount Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/theme', themeRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Endpoint not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Only bind to local port when running as a standalone server, NOT on Vercel serverless
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 PRALASH Healthcare Backend Server listening on http://localhost:${PORT}`);
    console.log(`📋 Admin Appointments API ready at: http://localhost:${PORT}/api/appointments`);
    verifySmtpConnection();
  });
}

export default app;

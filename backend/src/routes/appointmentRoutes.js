import express from 'express';
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentStats,
  seedAppointments,
  resendConfirmationEmail,
  resendRejectionEmail,
} from '../controllers/appointmentController.js';

const router = express.Router();

// Seed dummy data
router.post('/seed', seedAppointments);

// Admin Analytics Overview
router.get('/stats/overview', getAppointmentStats);

// Manual trigger to send/resend booking confirmation or rejection email
router.post('/:id/send-confirmation', resendConfirmationEmail);
router.post('/:id/send-rejection', resendRejectionEmail);

// List all appointments (Admin) / Create appointment (Public)
router.route('/')
  .get(getAllAppointments)
  .post(createAppointment);

// Single appointment routes
router.route('/:id')
  .get(getAppointmentById)
  .patch(updateAppointmentStatus)
  .delete(deleteAppointment);

export default router;

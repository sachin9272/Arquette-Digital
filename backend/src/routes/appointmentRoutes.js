const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentStats,
  seedAppointments,
} = require('../controllers/appointmentController');

// Seed dummy data
router.post('/seed', seedAppointments);

// Admin Analytics Overview
router.get('/stats/overview', getAppointmentStats);

// List all appointments (Admin) / Create appointment (Public)
router.route('/')
  .get(getAllAppointments)
  .post(createAppointment);

// Single appointment routes
router.route('/:id')
  .get(getAppointmentById)
  .patch(updateAppointmentStatus)
  .delete(deleteAppointment);

module.exports = router;

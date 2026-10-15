const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  seedDoctors,
  uploadDoctorImage,
} = require('../controllers/doctorController');

// Seed doctors endpoint
router.post('/seed', seedDoctors);

// Dedicated direct photo upload to Cloudinary
router.post('/upload-image', upload.single('image'), uploadDoctorImage);

// List / Create (supports multipart form-data or JSON with auto-Cloudinary upload)
router.route('/')
  .get(getAllDoctors)
  .post(upload.single('image'), createDoctor);

// Single Doctor CRUD
router.route('/:id')
  .get(getDoctorById)
  .patch(upload.single('image'), updateDoctor)
  .delete(deleteDoctor);

module.exports = router;

import express from 'express';
import upload from '../middleware/upload.js';
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  seedDoctors,
  uploadDoctorImage,
} from '../controllers/doctorController.js';

const router = express.Router();

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

export default router;

import express from 'express';
import upload from '../middleware/upload.js';
import {
  getAllBlogs,
  getBlogBySlugOrId,
  createBlog,
  updateBlog,
  deleteBlog,
  seedBlogs,
  uploadBlogImage,
} from '../controllers/blogController.js';

const router = express.Router();

// Seed existing blogs endpoint
router.post('/seed', seedBlogs);

// Dedicated photo upload to Cloudinary for blog covers
router.post('/upload-image', upload.single('image'), uploadBlogImage);

// List / Create
router.route('/')
  .get(getAllBlogs)
  .post(upload.single('image'), createBlog);

// Single Blog Item
router.route('/:idOrSlug')
  .get(getBlogBySlugOrId)
  .patch(upload.single('image'), updateBlog)
  .delete(deleteBlog);

export default router;

import express from 'express';
import { getActiveTheme, updateTheme } from '../controllers/themeController.js';

const router = express.Router();

router.route('/')
  .get(getActiveTheme)
  .post(updateTheme)
  .put(updateTheme);

export default router;

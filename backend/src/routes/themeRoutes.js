const express = require('express');
const router = express.Router();
const { getActiveTheme, updateTheme } = require('../controllers/themeController');

router.route('/')
  .get(getActiveTheme)
  .post(updateTheme)
  .put(updateTheme);

module.exports = router;

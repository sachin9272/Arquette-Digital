require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const cloudName = (process.env.CLOUDINARY_CLOUD_NAME || '').replace(/['"\s]/g, '');
const apiKey = (process.env.CLOUDINARY_API_KEY || '').replace(/['"\s]/g, '');
const apiSecret = (process.env.CLOUDINARY_API_SECRET || '').replace(/['"\s]/g, '');

console.log('Configuring Cloudinary with cloudName:', cloudName);

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

cloudinary.api.ping()
  .then((res) => {
    console.log('CLOUDINARY_PING_SUCCESS:', res);
  })
  .catch((err) => {
    console.error('CLOUDINARY_PING_ERROR:', err.message || err);
  });

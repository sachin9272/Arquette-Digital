import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

const cloudName = (process.env.CLOUDINARY_CLOUD_NAME || '').replace(/['"\s]/g, '');
const apiKey = (process.env.CLOUDINARY_API_KEY || '').replace(/['"\s]/g, '');
const apiSecret = (process.env.CLOUDINARY_API_SECRET || '').replace(/['"\s]/g, '');

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

/**
 * Uploads a file buffer directly to Cloudinary
 * @param {Buffer} buffer
 * @param {Object} options
 * @returns {Promise<string>} Secure Cloudinary image URL
 */
export const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'pralash_doctors',
        transformation: [
          { width: 800, height: 800, crop: 'fill', gravity: 'face' },
          { quality: 'auto:best', fetch_format: 'auto' },
        ],
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};

/**
 * Uploads a remote image URL or local file to Cloudinary
 * @param {string} sourceUrl
 * @param {Object} options
 * @returns {Promise<string>} Secure Cloudinary image URL
 */
export const uploadUrlToCloudinary = async (sourceUrl, options = {}) => {
  // If already hosted on cloudinary, return as is
  if (typeof sourceUrl === 'string' && sourceUrl.includes('res.cloudinary.com')) {
    return sourceUrl;
  }

  const result = await cloudinary.uploader.upload(sourceUrl, {
    folder: options.folder || 'pralash_doctors',
    transformation: [
      { width: 800, height: 800, crop: 'fill', gravity: 'face' },
      { quality: 'auto:best', fetch_format: 'auto' },
    ],
    ...options,
  });

  return result.secure_url;
};

export { cloudinary };
export default cloudinary;

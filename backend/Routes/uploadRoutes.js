import express from 'express';
import { uploadImage } from '../Controllers/uploadController.js';
import { upload } from '../config/cloudinaryConfig.js'; // Cloudinary configuration

const router = express.Router();

// POST route for uploading images
router.post('/', upload.single('image'), uploadImage);

export default router;

import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage configuration for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2, // Using v2 for Cloudinary instance
  params: {
    folder: 'mern_app_uploads', // Your desired folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file types
    upload_preset: 'ahmed', // Optional: Add your unsigned preset here
  },
});

const upload = multer({ storage }); // Multer instance with Cloudinary storage

export { cloudinary, upload }; // Export both cloudinary and upload

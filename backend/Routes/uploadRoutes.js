import express from 'express';
import { upload } from '../config/cloudinaryConfig.js'; 

const router = express.Router();

// Route to handle profile picture upload
router.post('/upload', upload.single('profile_picture'), (req, res) => {
  if (req.file) {
    res.json({ imageUrl: req.file.path });
  } else {
    res.status(400).send('File upload failed');
  }
});

export default router;

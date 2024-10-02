import express from 'express';
import { submitContactForm } from '../Controllers/contactController.js';

const router = express.Router();

// Route to handle contact form submission
router.post('/', submitContactForm);

// Fallback route for handling invalid routes
router.use((req, res) => {
  res.status(404).json({ message: 'Not Found - Invalid route' });
});

export default router;

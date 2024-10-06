import express from 'express';
import { authenticate, authorizeAdmin } from '../Middlewares/authMiddleware.js';

const router = express.Router();

// Protect the /admin route, accessible only to authenticated admins
router.get('/', authenticate, authorizeAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
});

export default router;

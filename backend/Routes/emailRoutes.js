import express from 'express';
import { sendWelcomeEmail } from '../Controllers/emailController.js';

const router = express.Router();

router.post('/send-email', sendWelcomeEmail);

export default router;

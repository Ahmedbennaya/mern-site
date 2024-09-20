// File: routes/orderRoutes.js
import express from 'express';
import { createOrder } from '../Controllers/orderController.js';

const router = express.Router();

// POST route to create an order
router.post('/create', createOrder);

export default router;

import express from 'express';
import { createOrder, getAllOrders, confirmOrder } from '../Controllers/orderController.js';

const router = express.Router();

// POST route to create an order
router.post('/create', createOrder);

// GET route to fetch all orders (for admin)
router.get('/', getAllOrders);

// PUT route to confirm an order
router.put('/:orderId/confirm', confirmOrder);

export default router;

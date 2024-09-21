import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../Controllers/cartController.js';

const router = express.Router();

router.get('/:userId', getCart);
router.post('/', addToCart);
router.delete('/:userId/:productId', removeFromCart);
router.delete('/:userId', clearCart);

export default router;

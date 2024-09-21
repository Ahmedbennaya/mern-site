import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../Controllers/cartController.js';
import { authenticate } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/:userId', authenticate, getCart);          // Get cart
router.post('/', authenticate, addToCart);              // Add to cart
router.delete('/:userId/:productId', authenticate, removeFromCart); // Remove from cart
router.delete('/:userId', authenticate, clearCart);     // Clear cart

export default router;

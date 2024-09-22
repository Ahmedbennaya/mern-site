import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../Controllers/cartController.js';
import { authenticate } from '../Middlewares/authMiddleware.js';


const router = express.Router();

router.get('/:userId', authenticate, getCart);          
router.post('/', authenticate, addToCart);              
router.delete('/:userId/:productId', authenticate, removeFromCart); 
router.delete('/:userId', authenticate, clearCart);     

export default router;

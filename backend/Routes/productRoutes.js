import express from 'express';
import { 
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getBlindsShades,
  getCurtainsDrapes,
  getFurnishings,
} from '../Controllers/productController.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/category/blinds-shades', getBlindsShades);
router.get('/category/curtains-drapes', getCurtainsDrapes);
router.get('/category/furnishings', getFurnishings);

// Admin routes (require admin authentication middleware)
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;

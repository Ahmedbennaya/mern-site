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
  addBlindsShadesProduct,
  addCurtainsDrapesProduct,
  addFurnishingsProduct,
  addSmartHomeProduct,
  getSmartHome
} from '../Controllers/productController.js';

const router = express.Router();

// General product routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// Category-specific routes
router.get('/category/blinds-shades', getBlindsShades);
router.get('/category/curtains-drapes', getCurtainsDrapes);
router.get('/category/furnishings', getFurnishings);
router.get('/category/smart-home', getSmartHome);

// Add products to specific categories
router.post('/category/blinds-shades', addBlindsShadesProduct);
router.post('/category/curtains-drapes', addCurtainsDrapesProduct);
router.post('/category/furnishings', addFurnishingsProduct);
router.post('/category/smart-home', addSmartHomeProduct);

export default router;

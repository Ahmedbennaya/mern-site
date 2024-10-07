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
  getSmartHome,
  searchProducts  // Import the search function
} from '../Controllers/productController.js';

import { authenticate, authorizeAdmin } from '../Middlewares/authMiddleware.js';

const router = express.Router();

// General product routes (accessible by all users)
router.get('/', getProducts);  // Get all products
router.get('/:id', getProductById);  // Get a product by ID

// Protected routes (only admins can create, update, and delete products)
router.post('/', createProduct);  // Create a product (now public, remove authenticate)
router.put('/:id', updateProduct);  // Update a product by ID (now public, remove authenticate)
router.delete('/:id', deleteProduct);  // Delete a product by ID (now public, remove authenticate)

// Category-specific routes (accessible by all users)
router.get('/category/blinds-shades', getBlindsShades);  // Get all products in Blinds & Shades category
router.get('/category/curtains-drapes', getCurtainsDrapes);  // Get all products in Curtains & Drapes category
router.get('/category/furnishings', getFurnishings);  // Get all products in Furnishings category
router.get('/category/smart-home', getSmartHome);  // Get all products in Smart Home category

// Add products to specific categories (public, removing admin-only restriction)
router.post('/category/blinds-shades', addBlindsShadesProduct);
router.post('/category/curtains-drapes', addCurtainsDrapesProduct);
router.post('/category/furnishings', addFurnishingsProduct);
router.post('/category/smart-home', addSmartHomeProduct);

// Search products within a category (accessible by all users)
router.get('/search', searchProducts);  // Search products within a category

export default router;

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
} from '../controllers/productController.js';

import { authenticate, authorizeAdmin } from '../Middlewares/authMiddleware.js';

const router = express.Router();

// General product routes (accessible by all users)
router.get('/', getProducts);  // Get all products
router.get('/:id', getProductById);  // Get a product by ID

// Protected routes (only admins can create, update, and delete products)
router.post('/', authenticate, authorizeAdmin, createProduct);  // Create a product
router.put('/:id', authenticate, authorizeAdmin, updateProduct);  // Update a product by ID
router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);  // Delete a product by ID

// Category-specific routes (accessible by all users)
router.get('/category/blinds-shades', getBlindsShades);  // Get all products in Blinds & Shades category
router.get('/category/curtains-drapes', getCurtainsDrapes);  // Get all products in Curtains & Drapes category
router.get('/category/furnishings', getFurnishings);  // Get all products in Furnishings category
router.get('/category/smart-home', getSmartHome);  // Get all products in Smart Home category

// Add products to specific categories (only admins can add products)
router.post('/category/blinds-shades', authenticate, authorizeAdmin, addBlindsShadesProduct);  // Add a product to Blinds & Shades
router.post('/category/curtains-drapes', authenticate, authorizeAdmin, addCurtainsDrapesProduct);  // Add a product to Curtains & Drapes
router.post('/category/furnishings', authenticate, authorizeAdmin, addFurnishingsProduct);  // Add a product to Furnishings
router.post('/category/smart-home', authenticate, authorizeAdmin, addSmartHomeProduct);  // Add a product to Smart Home

// Search products within a category (accessible by all users)
router.get('/search', searchProducts );  // Search products within a category

export default router;

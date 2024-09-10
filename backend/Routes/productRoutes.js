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
  addFurnishingsProduct
} from '../Controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/category/blinds-shades', getBlindsShades);
router.get('/category/curtains-drapes', getCurtainsDrapes);
router.get('/category/furnishings', getFurnishings);

router.post('/', createProduct);
router.post('/category/blinds-shades', addBlindsShadesProduct);
router.post('/category/curtains-drapes', addCurtainsDrapesProduct);
router.post('/category/furnishings', addFurnishingsProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
import express from 'express';
import { getStores, createStore, getStoreById } from '../Controllers/StoreController.js'; 
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

// @desc Get all stores
// @route GET /api/stores
// @access Public
router.route('/').get(getStores);

// @desc Create a new store
// @route POST /api/admin/stores/create
// @access Private/Admin
router.route('/create').post(authenticate, authorizeAdmin, createStore); 

// @desc Get a store by ID
// @route GET /api/stores/:id
// @access Public
router.route('/:id').get(getStoreById);

export default router;
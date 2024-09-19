import express from 'express';
import { getStores, getStoreById } from '../Controllers/storeController.js';

const router = express.Router();

// @desc Get all stores
// @route GET /api/stores
// @access Public
router.route('/').get(getStores);

// @desc Get a single store by ID
// @route GET /api/stores/:id
// @access Public
router.route('/:id').get(getStoreById);  // New route for fetching a store by its ID

export default router;

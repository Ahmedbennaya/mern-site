import express from 'express';
import { getStores } from '../Controllers/storeController.js';

const router = express.Router();

// @desc Get all stores
// @route GET /api/stores
// @access Public
router.route('/').get(getStores);

export default router;

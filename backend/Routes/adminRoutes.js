import express from "express";
import { createStore } from "../Controllers/storeController.js";
import { authenticate, authorizeAdmin } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// @desc Create a new store
// @route POST /api/admin/stores/create
// @access Private/Admin
router.post("/stores/create", authenticate, authorizeAdmin, createStore);

export default router;

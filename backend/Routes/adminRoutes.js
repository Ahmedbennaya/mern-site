import express from "express";
import { createStore } from "../Controllers/storeController.js";
import { authenticate, authorizeAdmin } from "../Middlewares/authMiddleware.js";

const router = express.Router();


router.post("/stores/create", authenticate, authorizeAdmin, createStore);

export default router;

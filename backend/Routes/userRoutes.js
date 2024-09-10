import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUserProfile,
  getAllUsers, // Import the getAllUsers function
} from "../Controllers/userController.js";
import { authenticate, authorizeAdmin } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/registerUser", registerUser);

// Log in an existing user
router.post("/login", loginUser);

// Log out the current user
router.post("/logout", logoutUser);

// Handle forgot password
router.post("/forgot-password", forgotPassword);

// Handle reset password
router.post("/reset-password/:token", resetPassword);

// Update user profile (protected route)
router.put("/update", authenticate, updateUserProfile);

// Get all users (admin only)
router.get("/", authenticate, authorizeAdmin, getAllUsers);

export default router;

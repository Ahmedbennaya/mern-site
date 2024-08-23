import express from "express";
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } from "../Controllers/userController.js";

const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);  // Add forgot password route
router.post("/reset-password/:token", resetPassword);  // Add reset password route

export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUserProfile,
  getAllUsers,
  deleteUser, 
  
} from "../Controllers/userController.js";
import { upload } from "../config/cloudinaryConfig.js";

const router = express.Router();

// User routes
router.post("/registerUser", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/update", upload.single("photo"), updateUserProfile);
router.get("/",  getAllUsers);
router.delete("/:id", deleteUser);

export default router;

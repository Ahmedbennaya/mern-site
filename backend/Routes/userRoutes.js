import express from "express";
import { registerUser, loginUser, logoutUser } from "../Controllers/userController.js";

const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;

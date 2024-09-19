import express from "express";
import { bookConsultation } from "../Controllers/bookConsultationController.js";

const router = express.Router();

// Route to handle booking a consultation
router.post("/book-consultation", bookConsultation);

export default router;

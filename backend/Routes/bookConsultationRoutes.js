import express from "express";
import { bookConsultation } from "../Controllers/bookConsultationController.js";

const router = express.Router();

router.post("/book-consultation", bookConsultation);

export default router;

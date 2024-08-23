import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import storeRoutes from "./Routes/StoreRoutes.js";
import { errorHandler, notFound } from "./Middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes); // Admin-specific routes
app.use("/api/stores", storeRoutes);


// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

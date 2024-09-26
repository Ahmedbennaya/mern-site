import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './Routes/userRoutes.js';
import storeRoutes from './Routes/StoreRoutes.js';
import productRoutes from "./Routes/productRoutes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import consultationRoutes from './Routes/bookConsultationRoutes.js';
import emailRoutes from './Routes/emailRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
import uploadRoutes from './Routes/uploadRoutes.js'; 
import cartRoutes from './Routes/cartRoutes.js';
import { errorHandler, notFound } from './Middlewares/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware

// CORS configuration
app.use(cors({
  credentials: true, // This allows cookies to be sent
  origin: [
    "http://localhost:3000",  // Local development
    "https://mern-site-z5gs.onrender.com",  // Backend on Render
    "https://main--bargaoui.netlify.app"  // Deployed frontend
  ],
}));

// Parse incoming JSON and form-urlencoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware for handling JWT cookies
app.use(cookieParser());

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);
app.use("/api", consultationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/v1/emails', emailRoutes);
app.use('/api/cart', cartRoutes);

// File upload route
app.use("/api/uploads", uploadRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

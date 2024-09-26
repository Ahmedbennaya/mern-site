import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Assuming this connects your database
import userRoutes from './Routes/userRoutes.js';
import storeRoutes from './Routes/StoreRoutes.js';
import productRoutes from './Routes/productRoutes.js';
import cookieParser from 'cookie-parser';
import consultationRoutes from './Routes/bookConsultationRoutes.js';
import emailRoutes from './Routes/emailRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
import uploadRoutes from './Routes/uploadRoutes.js';
import cartRoutes from './Routes/cartRoutes.js';
import { errorHandler, notFound } from './Middlewares/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Define the port
const PORT = process.env.PORT || 4000;

// CORS configuration
app.use(cors({
  credentials: true, // Include credentials such as cookies, authorization headers
  origin: [
    "http://localhost:3000", // For local development
    "https://66f213439a9c1452ebba26f4--bargaoui.netlify.app", // The specific frontend causing CORS issue
    "https://main--bargaoui.netlify.app", // If this is your main frontend
    "https://mern-site-z5gs.onrender.com", // Include your own backend URL if needed for internal API calls
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow relevant HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);
app.use("/api", consultationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/v1/emails", emailRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/uploads", uploadRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

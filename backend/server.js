import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  // Database connection
import userRoutes from './Routes/userRoutes.js';
import storeRoutes from './Routes/StoreRoutes.js';
import productRoutes from './Routes/productRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import consultationRoutes from './Routes/bookConsultationRoutes.js';
import emailRoutes from './Routes/emailRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
import uploadRoutes from './Routes/uploadRoutes.js';
import cartRoutes from './Routes/cartRoutes.js';
import contactRoutes from './Routes/contactRoutes.js';
import preferenceRoutes from './Routes/preferenceRoutes.js';
import { errorHandler, notFound } from './Middlewares/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// CORS Configuration
app.use(cors({
  credentials: true,  // Enable credentials (cookies, auth headers)
  origin: [
    "https://mern-site-z5gs.onrender.com",  // Allowed origins
    "https://main--bargaoui.netlify.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],  // Allowed request headers
}));

// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // Parse cookies

// Root route (basic API response)
app.get('/', (req, res) => {
  res.send('Welcome to the MERN eCommerce API');
});

// API Routes
app.use("/api/users", userRoutes);  // User authentication & management
app.use("/api/stores", storeRoutes);  // Store-related operations
app.use("/api/products", productRoutes);  // Product-related operations
app.use("/api", consultationRoutes);  // Book consultation routes
app.use("/api/orders", orderRoutes);  // Order management
app.use("/api/v1/emails", emailRoutes);  // Email-related functionality
app.use("/api/cart", cartRoutes);  // Cart-related functionality
app.use("/api/uploads", uploadRoutes);  // File upload routes
app.use("/api/contact", contactRoutes);  // Contact form submission
app.use('/api/preferences', preferenceRoutes);  // User preferences management

// Error Handling Middleware
app.use(notFound);  // 404 Not Found handler
app.use(errorHandler);  // Custom error handling middleware

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

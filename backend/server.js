import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
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
import { errorHandler, notFound } from './Middlewares/errorMiddleware.js';
import contactRoutes from './Routes/contactRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration
app.use(cors({
  credentials: true,
  origin: [
    "https://mern-site-z5gs.onrender.com",
    "https://main--bargaoui.netlify.app",
    "http://localhost:3000"
  ]
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the MERN eCommerce API');
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/consultations", consultationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/v1/emails', emailRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/uploads", uploadRoutes);  
app.use('/api/contact', contactRoutes);  // Register the contact form route

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

});
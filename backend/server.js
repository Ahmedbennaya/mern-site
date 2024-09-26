import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // Assuming this connects to your MongoDB
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/userRoutes.js';
import storeRoutes from './Routes/StoreRoutes.js';
import productRoutes from './Routes/productRoutes.js';
import consultationRoutes from './Routes/bookConsultationRoutes.js';
import emailRoutes from './Routes/emailRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
import uploadRoutes from './Routes/uploadRoutes.js';
import cartRoutes from './Routes/cartRoutes.js';
import { errorHandler, notFound } from './Middlewares/errorMiddleware.js';

// Initialize environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration
app.use(cors({
  origin: [
    'https://main--bargaoui.netlify.app',  // Production frontend (Netlify)
    'https://66f213439a9c1452ebba26f4--bargaoui.netlify.app' // Temporary frontend URL during builds
  ],
  credentials: true,  // Allow cookies and authentication tokens
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers for token and content
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);
app.use("/api", consultationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/v1/emails', emailRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/uploads', uploadRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

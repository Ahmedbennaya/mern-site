import mongoose from 'mongoose';
import Order from '../Model/orderModel.js';
import User from '../Model/UserModel.js';
import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';

// Create Order and Send Confirmation Email
export const createOrder = asyncHandler(async (req, res) => {
  const { user, orderItems, shippingAddress, paymentMethod, totalAmount } = req.body;

  // Validate user ID
  if (!mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  // Ensure the user exists
  const userExists = await User.findById(user);
  if (!userExists) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Validate each product ID in the order items
  for (const item of orderItems) {
    if (!mongoose.Types.ObjectId.isValid(item.product)) {
      return res.status(400).json({ message: `Invalid product ID: ${item.product}` });
    }
  }

  // Validate phone number format (International E.164 format)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phoneRegex.test(shippingAddress.phone)) {
    return res.status(400).json({ message: 'Invalid phone number. It must follow the E.164 international format.' });
  }

  // Create the new order
  const order = new Order({
    user,
    orderItems,
    shippingAddress, // shippingAddress includes the phone number
    paymentMethod,
    totalAmount,
  });

  // Save the order
  const savedOrder = await order.save();

  // Extract phone number from shippingAddress
  const phone = shippingAddress.phone;

  // Log or use the phone number for sending confirmation
  console.log(`Phone number for this order: ${phone}`);

  // Send confirmation email
  try {
    await sendOrderConfirmationEmail(user, savedOrder);
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Order created but failed to send confirmation email', order: savedOrder });
  }
});

// Helper function to send an order confirmation email
const sendOrderConfirmationEmail = async (userId, order) => {
  try {
    // Find the user by ID and check if they have an email
    const user = await User.findById(userId);
    if (!user || !user.email) {
      throw new Error('User email not found');
    }

    // Access phone number from the order's shippingAddress
    const phone = order.shippingAddress.phone;

    // Create the email content for the order confirmation
    const orderItemsHTML = order.orderItems
      .map(item => `
        <li>
          <strong>Product ID:</strong> ${item.product}<br/>
          <strong>Quantity:</strong> ${item.quantity}<br/>
          <strong>Price:</strong> $${item.price.toFixed(2)}
        </li>
      `)
      .join('');

    // Create a nodemailer transporter (separate function for better testing)
    const transporter = createEmailTransporter();

    // Define the email options, including phone number in the content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Order Confirmation',
      html: `
        <h2>Order Confirmation</h2>
        <p>Thank you for your order! Here are the details:</p>
        <ul>
          ${orderItemsHTML}
        </ul>
        <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
        <p><strong>Phone:</strong> ${phone}</p> <!-- Include phone number in the email -->
        <p>Order ID: ${order._id}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully!');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw new Error('Email could not be sent');
  }
};

// Function to create nodemailer transporter for better modularity
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Controller to fetch all orders (for admin)
export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    // Populate user details and product details in orderItems
    const orders = await Order.find()
      .populate('user', 'FirstName LastName')  // Populate user info (FirstName, LastName)
      .populate('orderItems.product', 'name image');  // Populate product name and image

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// Controller to confirm an order
export const confirmOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Mark order as confirmed
    order.isConfirmed = true;
    const updatedOrder = await order.save();

    res.status(200).json({
      message: 'Order confirmed successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ message: 'Failed to confirm order', error: error.message });
  }
});

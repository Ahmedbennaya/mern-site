import mongoose from 'mongoose';
import Order from '../Model/orderModel.js';
import User from '../Model/UserModel.js';
import nodemailer from 'nodemailer';

export const createOrder = async (req, res) => {
  const { user, orderItems, shippingAddress, paymentMethod, totalAmount } = req.body;

  try {
    // Ensure the user field is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Ensure each item in orderItems has a valid product field
    const validOrderItems = orderItems.map((item) => {
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        throw new Error(`Invalid product ID for item: ${item.product}`);
      }
      return item;
    });

    const order = new Order({
      user,
      orderItems: validOrderItems,
      shippingAddress,
      paymentMethod,
      totalAmount
    });

    const savedOrder = await order.save();
    await sendOrderConfirmationEmail(user, savedOrder);

    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// Send email function
const sendOrderConfirmationEmail = async (userId, order) => {
  const user = await User.findById(userId);
  if (!user || !user.email) {
    throw new Error('User email not found');
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Order Confirmation',
    html: `
      <h2>Order Confirmation</h2>
      <p>Order ID: ${order._id}</p>
      <p>Total: $${order.totalAmount}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

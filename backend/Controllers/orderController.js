import mongoose from 'mongoose';
import Order from '../Model/orderModel.js';
import User from '../Model/UserModel.js';
import nodemailer from 'nodemailer';

// Controller to create an order and send a confirmation email
export const createOrder = async (req, res) => {
  const { user, orderItems, shippingAddress, paymentMethod, totalAmount } = req.body;

  try {
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
    const validOrderItems = orderItems.map((item) => {
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        throw new Error(`Invalid product ID for item: ${item.product}`);
      }
      return item;
    });

    // Create a new order object
    const order = new Order({
      user,
      orderItems: validOrderItems,
      shippingAddress,
      paymentMethod,
      totalAmount
    });

    // Save the order to the database
    const savedOrder = await order.save();

    // Send order confirmation email after the order is successfully saved
    await sendOrderConfirmationEmail(user, savedOrder);

    // Respond with success
    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// Helper function to send an order confirmation email
const sendOrderConfirmationEmail = async (userId, order) => {
  try {
    // Find the user by ID and check if they have an email
    const user = await User.findById(userId);
    if (!user || !user.email) {
      throw new Error('User email not found');
    }

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

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Define the email options
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
        <p>Order ID: ${order._id}</p>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully!');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw new Error('Email could not be sent');
  }
};

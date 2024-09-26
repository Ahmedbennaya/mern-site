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

// Controller to fetch all orders (for admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email'); // Optionally populate user details
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// Controller to confirm an order
export const confirmOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isConfirmed = true;  // Assuming `isConfirmed` is a field in the Order schema
    const updatedOrder = await order.save();

    res.status(200).json({
      message: 'Order confirmed successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ message: 'Failed to confirm order', error: error.message });
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

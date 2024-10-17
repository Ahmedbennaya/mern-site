import mongoose from 'mongoose';
import Cart from '../Model/CartModel.js';
import Product from '../Model/ProductModel.js';
import Order from '../Model/orderModel.js';

// Purchase Items
export const purchaseItems = async (req, res) => {
  const { userId, shippingAddress, paymentMethod } = req.body;

  try {
    const cart = await Cart.findOne({ user: mongoose.Types.ObjectId(userId) }).populate('cartItems.product');

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or not found' });
    }

    // Check stock and prepare order items
    const orderItems = [];
    for (const item of cart.cartItems) {
      const product = await Product.findById(mongoose.Types.ObjectId(item.product._id));
      
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.product.name}` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      // Add to orderItems array
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create new order
    const totalAmount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const newOrder = new Order({
      user: mongoose.Types.ObjectId(userId),
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    await newOrder.save();

    // Update stock quantities for each product
    for (const item of cart.cartItems) {
      const product = await Product.findById(mongoose.Types.ObjectId(item.product._id));
      product.quantity -= item.quantity;
      await product.save();
    }

    // Clear the user's cart after successful purchase
    await Cart.findOneAndDelete({ user: mongoose.Types.ObjectId(userId) });

    res.status(200).json({ message: 'Purchase successful', order: newOrder });
  } catch (error) {
    console.error('Error purchasing items:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: mongoose.Types.ObjectId(req.params.userId) }).populate('cartItems.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error fetching cart' });
  }
};

// Add to Cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Product ID and valid quantity are required' });
  }

  try {
    const product = await Product.findById(mongoose.Types.ObjectId(productId));

    if (!product || !product.inStock || product.quantity < quantity) {
      return res.status(400).json({ message: 'Product is not available or insufficient stock' });
    }

    let cart = await Cart.findOne({ user: mongoose.Types.ObjectId(userId) });

    if (cart) {
      // Update quantity if item already exists
      const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        // Add new item if it doesn't exist
        cart.cartItems.push({ product: mongoose.Types.ObjectId(productId), quantity });
      }
    } else {
      // Create a new cart if none exists
      cart = new Cart({ user: mongoose.Types.ObjectId(userId), cartItems: [{ product: mongoose.Types.ObjectId(productId), quantity }] });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Server error adding item to cart' });
  }
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: mongoose.Types.ObjectId(userId) });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the item to be removed
    cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);

    if (cart.cartItems.length === 0) {
      // If cart is empty after removal, delete the cart
      await Cart.findOneAndDelete({ user: mongoose.Types.ObjectId(userId) });
    } else {
      await cart.save(); // Otherwise, just save the updated cart
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Server error removing item from cart' });
  }
};

// Clear Cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: mongoose.Types.ObjectId(req.params.userId) });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error clearing cart' });
  }
};

import mongoose from 'mongoose';
import Cart from '../Model/CartModel.js';
import Product from '../Model/ProductModel.js';
import Order from '../Model/orderModel.js';

// Purchase Items
export const purchaseItems = async (req, res) => {
  const { userId, shippingAddress, paymentMethod } = req.body;

  try {
    const cart = await Cart.findOne({ user: mongoose.Types.ObjectId(userId) }).populate('cartItems.product');

    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or not found' });
    }

    const orderItems = [];
    for (const item of cart.cartItems) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.product.name}` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      // Prepare order items
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Calculate total amount
    const totalAmount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Create new order
    const newOrder = new Order({
      user: mongoose.Types.ObjectId(userId),
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });
    await newOrder.save();

    // Update product stock and clear the cart
    for (const item of cart.cartItems) {
      const product = await Product.findById(item.product._id);
      product.quantity -= item.quantity;
      await product.save();
    }

    // Clear user's cart after purchase
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

    // Find the user's cart
    let cart = await Cart.findOne({ user: mongoose.Types.ObjectId(userId) });

    if (cart) {
      // Check if the product is already in the cart
      const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        // Increment the quantity
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        // Add the new product to the cart
        cart.cartItems.push({ product: mongoose.Types.ObjectId(productId), quantity });
      }
    } else {
      // If no cart exists, create a new one
      cart = new Cart({
        user: mongoose.Types.ObjectId(userId),
        cartItems: [{ product: mongoose.Types.ObjectId(productId), quantity }],
      });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
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

    // Remove the product from cartItems
    cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);

    if (cart.cartItems.length === 0) {
      await Cart.findOneAndDelete({ user: mongoose.Types.ObjectId(userId) });
    } else {
      await cart.save();
    }

    res.status(200).json({ message: 'Item removed from cart', cart });
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

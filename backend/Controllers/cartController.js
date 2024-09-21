import Cart from '../Model/CartModel.js';
import Product from '../Model/ProductModel.js';
import Order from '../Model/orderModel.js';

// Purchase Items and Remove from Stock
export const purchaseItems = async (req, res) => {
  const { userId, shippingAddress, paymentMethod } = req.body;

  try {
    // Find the cart and populate the cartItems with product details
    const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');

    // Check if the cart exists and has items
    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or not found' });
    }

    // Create the order items from the cart
    const orderItems = cart.cartItems.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    // Create the order
    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount: orderItems.reduce((total, item) => total + item.price * item.quantity, 0),
    });

    // Save the order
    await order.save();

    // Update stock for each product in the cart and remove purchased items
    for (const item of cart.cartItems) {
      const product = await Product.findById(item.product._id);
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      product.quantity -= item.quantity;
      await product.save();  // Save updated product stock
    }

    // Clear the cart after purchase
    await Cart.findOneAndDelete({ user: userId });

    // Send a success response
    res.status(200).json({ message: 'Purchase successful', order });
  } catch (error) {
    console.error('Error purchasing items:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// Get Cart for a User
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('cartItems.product');
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

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }

  try {
    const product = await Product.findById(productId);

    if (!product || !product.inStock || product.quantity < quantity) {
      return res.status(400).json({ message: 'Product is not available or insufficient stock' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        cart.cartItems.push({ product: productId, quantity });
      }
    } else {
      cart = new Cart({ user: userId, cartItems: [{ product: productId, quantity }] });
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
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Server error removing item from cart' });
  }
};

// Clear Cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error clearing cart' });
  }
};

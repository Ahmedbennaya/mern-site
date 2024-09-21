import Cart from '../Model/CartModel.js';

// @desc Get cart for a user
// @route GET /api/cart/:userId
// @access Private
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('cartItems.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching cart' });
  }
};

// @desc Add item to cart
// @route POST /api/cart
// @access Private
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      const productIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

      if (productIndex !== -1) {
        cart.cartItems[productIndex].quantity += quantity;
      } else {
        cart.cartItems.push({ product: productId, quantity });
      }
    } else {
      cart = new Cart({ user: userId, cartItems: [{ product: productId, quantity }] });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error adding item to cart' });
  }
};

// @desc Remove item from cart
// @route DELETE /api/cart/:userId/:productId
// @access Private
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
    res.status(500).json({ message: 'Server error removing item from cart' });
  }
};

// @desc Clear cart
// @route DELETE /api/cart/:userId
// @access Private
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error clearing cart' });
  }
};

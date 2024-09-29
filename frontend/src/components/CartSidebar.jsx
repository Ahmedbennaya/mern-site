import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addToCart, removeFromCart, clearCart } from '../redux/features/cartSlice';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const CartSidebar = ({ isCartOpen, toggleCart }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems = [], totalAmount } = useSelector((state) => state.cart);

  const userId = userInfo?._id;

  // Check for valid userId
  useEffect(() => {
    if (!userId) {
      console.error('User ID is missing');
    }
  }, [userId]);

  // Handle updating the quantity of items in the cart
  const handleUpdateQuantity = useCallback(
    (id, quantity) => {
      if (!userId) {
        console.error('User ID is required to add to cart');
        return;
      }
      dispatch(addToCart({ userId, productId: id, quantity }));
    },
    [dispatch, userId]
  );

  // Handle removing items from the cart
  const handleRemoveItem = useCallback(
    (id) => {
      if (!userId) {
        console.error('User ID is required to remove from cart');
        return;
      }
      dispatch(removeFromCart({ userId, productId: id }));
    },
    [dispatch, userId]
  );

  // Handle clearing the cart
  const handleClearCart = useCallback(() => {
    if (!userId) {
      console.error('User ID is required to clear the cart');
      return;
    }
    dispatch(clearCart(userId));
  }, [dispatch, userId]);

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-transform duration-300 ${
        isCartOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="w-80 bg-white p-6 shadow-lg relative h-full">
        <button
          onClick={toggleCart}
          className="absolute top-4 right-4 text-gray-500 text-2xl font-bold hover:text-red-500 transition duration-200"
          aria-label="Close Cart"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</h3>
              <button
                onClick={handleClearCart}
                className="w-full bg-red-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-red-600 transition duration-200"
                aria-label="Clear Cart"
              >
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition duration-200 block text-center"
                aria-label="Proceed to Checkout"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
      <div
        onClick={toggleCart}
        className="flex-grow bg-black bg-opacity-50 cursor-pointer"
        aria-hidden="true"
      />
    </div>
  );
};

CartSidebar.propTypes = {
  isCartOpen: PropTypes.bool.isRequired,
  toggleCart: PropTypes.func.isRequired,
};

export default CartSidebar;

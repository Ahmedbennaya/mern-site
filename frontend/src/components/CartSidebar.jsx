import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, clearCart, updateItemQuantity } from '../redux/features/cartSlice';
import { Link } from 'react-router-dom';

const CartItem = React.memo(({ item, onUpdateQuantity, onRemove }) => (
  <div className="flex justify-between items-center mb-6">
    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-sm" />
    <div className="ml-4 flex-grow">
      <h3 className="font-medium text-lg">{item.name}</h3>
      <p className="text-gray-500">
        ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
      </p>
      <div className="flex items-center mt-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          disabled={item.quantity === 1}
          aria-label={`Decrease quantity of ${item.name}`}
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          aria-label={`Increase quantity of ${item.name}`}
        >
          +
        </button>
      </div>
    </div>
    <button
      onClick={() => onRemove(item.id)}
      className="text-red-500 hover:text-red-600 transition duration-200 ml-4"
      aria-label={`Remove ${item.name} from cart`}
    >
      Remove
    </button>
  </div>
));

const CartSidebar = ({ isCartOpen, toggleCart }) => {
  const dispatch = useDispatch();
  const { cartItems = [], totalAmount } = useSelector((state) => state.cart);

  const handleEsc = useCallback((event) => {
    if (event.keyCode === 27) {
      toggleCart();
    }
  }, [toggleCart]);

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleEsc]);

  const handleUpdateQuantity = useCallback((id, quantity) => {
    dispatch(updateItemQuantity({ id, quantity }));
  }, [dispatch]);

  const handleRemoveItem = useCallback((id) => {
    dispatch(removeItemFromCart(id));
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className={`fixed inset-0 z-50 flex transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="w-80 bg-white p-6 shadow-lg relative">
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
                key={item.id}
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
        className="flex-grow bg-black bg-opacity-50"
        aria-hidden="true"
      />
    </div>
  );
};

export default CartSidebar;

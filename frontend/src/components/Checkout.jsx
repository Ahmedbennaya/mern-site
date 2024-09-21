import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { purchaseCart } from '../redux/features/cartSlice';
import axios from 'axios';

const Checkout = () => {
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrderSubmit = () => {
    const orderData = {
      user: 'USER_ID',  // Replace this with the logged-in user ID
      orderItems: cartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      shippingAddress,
      paymentMethod,
      totalAmount
    };

    // Dispatch purchaseCart thunk
    dispatch(purchaseCart(orderData));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Place Your Order</h2>

      <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium">Street:</label>
        <input
          type="text"
          name="street"
          placeholder="Enter street"
          value={shippingAddress.street}
          onChange={handleShippingChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">City:</label>
        <input
          type="text"
          name="city"
          placeholder="Enter city"
          value={shippingAddress.city}
          onChange={handleShippingChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">State:</label>
        <input
          type="text"
          name="state"
          placeholder="Enter state"
          value={shippingAddress.state}
          onChange={handleShippingChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Zip Code:</label>
        <input
          type="text"
          name="zipCode"
          placeholder="Enter zip code"
          value={shippingAddress.zipCode}
          onChange={handleShippingChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Country:</label>
        <input
          type="text"
          name="country"
          placeholder="Enter country"
          value={shippingAddress.country}
          onChange={handleShippingChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium">Payment Method:</label>
        <select
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <div className="text-lg font-semibold mb-4">
        Total Amount: ${totalAmount.toFixed(2)}
      </div>

      <button
        onClick={handleOrderSubmit}
        className="w-full px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Submit Order
      </button>
    </div>
  );
};

export default Checkout;

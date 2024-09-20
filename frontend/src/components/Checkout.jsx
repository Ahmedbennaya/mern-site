import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [orderData, setOrderData] = useState({
    user: '', // User ID
    orderItems: [{ productId: '', quantity: 1, price: 0 }], // Initialize with one item
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    paymentMethod: 'Credit Card', // Default payment method
    totalAmount: 0 // Will be calculated dynamically
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: value
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      shippingAddress: {
        ...prevOrderData.shippingAddress,
        [name]: value
      }
    }));
  };

  const handleOrderItemChange = (index, field, value) => {
    const updatedItems = [...orderData.orderItems];
    updatedItems[index][field] = value;
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      orderItems: updatedItems
    }));
  };

  const handleAddItem = () => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      orderItems: [...prevOrderData.orderItems, { productId: '', quantity: 1, price: 0 }]
    }));
  };

  const handleRemoveItem = (index) => {
    const updatedItems = orderData.orderItems.filter((_, i) => i !== index);
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      orderItems: updatedItems
    }));
  };

  useEffect(() => {
    const total = orderData.orderItems.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity), 0
    );
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      totalAmount: total
    }));
  }, [orderData.orderItems]);

  const handleOrderSubmit = async () => {
    const updatedOrderItems = orderData.orderItems.map(item => ({
      ...item,
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));

    const updatedOrderData = {
      ...orderData,
      orderItems: updatedOrderItems,
      totalAmount: Number(orderData.totalAmount),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/orders/create', updatedOrderData);
      console.log('Order created successfully:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Place Your Order</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">User Name:</label>
        <input
          type="text"
          name="user"
          placeholder="Enter user Name"
          value={orderData.user}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <h3 className="text-xl font-semibold mb-2">Order Items</h3>
      {orderData.orderItems.map((item, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium">Product Name:</label>
          <input
            type="text"
            placeholder="Enter Product Name"
            value={item.productId}
            onChange={(e) => handleOrderItemChange(index, 'productId', e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <label className="block text-sm font-medium">Quantity:</label>
          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) => handleOrderItemChange(index, 'quantity', e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <label className="block text-sm font-medium">Price:</label>
          <input
            type="number"
            value={item.price}
            min="0"
            onChange={(e) => handleOrderItemChange(index, 'price', e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <button
            onClick={() => handleRemoveItem(index)}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Remove Item
          </button>
        </div>
      ))}
      <button
        onClick={handleAddItem}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
      >
        Add Another Item
      </button>

      <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
      {/* Shipping Address Inputs */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Street:</label>
        <input
          type="text"
          name="street"
          placeholder="Enter street"
          value={orderData.shippingAddress.street}
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
          value={orderData.shippingAddress.city}
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
          value={orderData.shippingAddress.state}
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
          value={orderData.shippingAddress.zipCode}
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
          value={orderData.shippingAddress.country}
          onChange={handleShippingChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium">Payment Method:</label>
        <select
          name="paymentMethod"
          value={orderData.paymentMethod}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <div className="text-lg font-semibold mb-4">
        Total Amount: ${orderData.totalAmount.toFixed(2)}
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

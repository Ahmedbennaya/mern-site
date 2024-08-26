import React, { useState } from 'react';
import axios from 'axios';

const PaymeeCheckout = () => {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      // Replace with your Paymee API endpoint
      const response = await axios.post('https://api.paymee.tn/v1/payments', {
        vendor: 'YOUR_VENDOR_ID', // Replace with your Paymee vendor ID
        amount: amount,
        note: 'Payment for Order #12345', // Description of the payment
        email: email,
        success_url: 'https://your-website.com/success', // Replace with your success URL
        cancel_url: 'https://your-website.com/cancel', // Replace with your cancel URL
      });

      // Redirect the user to Paymee's payment page
      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        setError('Failed to create payment. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6">Pay with Paymee</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 p-4 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-100 p-4 rounded-lg w-full"
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-200 ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay ${amount} TND`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymeeCheckout;

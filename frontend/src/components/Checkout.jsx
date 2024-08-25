import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-stripe-public-key');

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Mock API call to create payment intent
    const { error, paymentIntent } = await stripe.confirmCardPayment('client-secret', {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Customer Name',
        },
      },
    });

    if (error) {
      setError(error.message);
      setIsProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      dispatch(clearCart());
      setIsProcessing(false);
      navigate('/order-confirmation'); // Replace history.push with navigate
    }
  };

  const handleCardChange = useCallback((event) => {
    setError(event.error ? event.error.message : '');
  }, []);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
      <CardElement
        onChange={handleCardChange}
        className="bg-gray-100 p-4 rounded-lg mb-4"
      />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-200 ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        disabled={isProcessing || !stripe}
      >
        {isProcessing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

const OrderSummary = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);

  return (
    <div className="bg-white p-8 shadow-md rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg">{item.name}</h3>
            <p className="text-gray-500">Quantity: {item.quantity}</p>
          </div>
          <p className="text-lg">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <div className="flex justify-between items-center mt-6">
        <h3 className="text-xl font-semibold">Total</h3>
        <p className="text-xl font-semibold">${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <OrderSummary />
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;

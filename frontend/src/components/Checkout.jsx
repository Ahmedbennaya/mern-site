import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/features/orderSlice';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const dispatch = useDispatch();
  
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.order);

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [paymentDetails, setPaymentDetails] = useState({
    email: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    securityCode: '',
    cardName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrderSubmit = () => {
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.country) {
      toast.error('Please fill in all shipping address fields');
      return;
    }

    if (!userInfo || !userInfo._id) {
      toast.error('You must be logged in to place an order');
      return;
    }

    const orderData = {
      user: userInfo._id,
      orderItems: cartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      shippingAddress,
      paymentDetails,
      totalAmount
    };

    dispatch(createOrder(orderData))
      .unwrap()
      .then((response) => {
        toast.success('Order submitted successfully!');
        console.log('Order response:', response);
      })
      .catch((err) => {
        toast.error(`Order submission failed: ${err.message}`);
        console.error('Order error:', err);
      });
  };

  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
              Secure Checkout
              <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
            </h1>
            <form className="mt-10 flex flex-col space-y-4">
              <div>
                <label htmlFor="email" className="text-xs font-semibold text-gray-500">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.capler@fang.com"
                  value={paymentDetails.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="relative">
                <label htmlFor="cardNumber" className="text-xs font-semibold text-gray-500">Card number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234-5678-XXXX-XXXX"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
                <img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" className="absolute bottom-3 right-3 max-h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Expiration date</p>
                <div className="mr-6 flex flex-wrap">
                  <div className="my-1">
                    <select
                      name="expirationMonth"
                      value={paymentDetails.expirationMonth}
                      onChange={handleInputChange}
                      className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Month</option>
                      {/* Add month options here */}
                    </select>
                  </div>
                  <div className="my-1 ml-3 mr-6">
                    <select
                      name="expirationYear"
                      value={paymentDetails.expirationYear}
                      onChange={handleInputChange}
                      className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Year</option>
                      {/* Add year options here */}
                    </select>
                  </div>
                  <div className="relative my-1">
                    <input
                      type="text"
                      id="securityCode"
                      name="securityCode"
                      placeholder="Security code"
                      value={paymentDetails.securityCode}
                      onChange={handleInputChange}
                      className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  placeholder="Name on the card"
                  value={paymentDetails.cardName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </form>
            <p className="mt-10 text-center text-sm font-semibold text-gray-500">
              By placing this order you agree to the{' '}
              <a href="#" className="whitespace-nowrap text-teal-400 underline hover:text-teal-600">Terms and Conditions</a>
            </p>
            <button
              onClick={handleOrderSubmit}
              className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          {/* Add your order summary, support and other information here */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

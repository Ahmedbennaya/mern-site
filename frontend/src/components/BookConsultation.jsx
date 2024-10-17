import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../redux/features/authSlice'; // Import your auth slice actions

const BookConsultation = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    textConsent: false,
  });

  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth); // Select userInfo from auth slice

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!userInfo) {
      toast.error('Please log in to book a consultation.');
      return;
    }

    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://mern-site-z5gs.onrender.com/api/book-consultation',
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: `Zip Code: ${formData.zipCode}`,
          recaptchaToken,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Show success toast with a professional UI
      toast.success(`Thank you, ${formData.firstName}, for booking a consultation!`, {
        duration: 5000,
        style: {
          borderRadius: '10px',
          background: '#4caf50',
          color: '#fff',
        },
      });

      // Reset the form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        zipCode: '',
        textConsent: false,
      });
      setRecaptchaToken(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred.', {
        style: {
          borderRadius: '10px',
          background: '#f44336',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {/* Toaster to render toast notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          We do it all for you: design, measure & install.
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zip Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="textConsent"
              checked={formData.textConsent}
              onChange={handleChange}
              className="h-4 w-4 border-gray-300"
            />
            <label className="text-sm text-gray-700">
              You may text me to assist in scheduling my appointment. I understand I may opt-out at any time.
            </label>
          </div>

          <ReCAPTCHA sitekey="6Ldc-1UqAAAAAOZdWFyGcolXctfpPEDdaBI-ujPL" onChange={handleRecaptchaChange} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded mt-4"
          >
            {loading ? 'Booking...' : 'BOOK FREE CONSULTATION'}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-500">
          or call <span className="font-semibold text-black">(+216)50929292</span>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;

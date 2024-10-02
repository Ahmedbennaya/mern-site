import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../redux/features/contactSlice';
import ReCAPTCHA from 'react-google-recaptcha'; // Import reCAPTCHA component
import { toast } from 'react-hot-toast'; // Import toast and Toaster

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [recaptchaToken, setRecaptchaToken] = useState(null); // reCAPTCHA token
  const dispatch = useDispatch();
  const { loading, successMessage, errorMessage } = useSelector((state) => state.contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Capture reCAPTCHA token on success
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA.'); // Display error toast
      return;
    }

    // Add the reCAPTCHA token to the form data
    const submissionData = {
      ...formData,
      recaptchaToken,
    };

    // Dispatch form data to Redux
    dispatch(submitContactForm(submissionData));
  };

  // Add an effect to listen for changes in success or error messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [successMessage, errorMessage]); // Dependencies for when to show toast

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* reCAPTCHA widget */}
          <ReCAPTCHA
            sitekey="6Ldc-1UqAAAAAOZdWFyGcolXctfpPEDdaBI-ujPL" // Your reCAPTCHA site key
            onChange={handleRecaptchaChange}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded mt-4 ${loading ? 'bg-gray-400' : 'bg-teal-700 hover:bg-teal-800'}`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

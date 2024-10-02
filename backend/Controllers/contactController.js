import asyncHandler from 'express-async-handler';
import axios from 'axios';
import User from '../Model/UserModel.js';
import ContactForm from '../Model/ContactModel.js';
import sendEmail from '../Utils/sendEmail.js';

// Helper function to validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to verify reCAPTCHA token
const verifyRecaptcha = async (recaptchaToken) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`
  );
  return response.data.success;
};

// @desc Submit a contact form
// @route POST /api/contact
// @access Public
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message, recaptchaToken } = req.body;

  // Verify reCAPTCHA
  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isRecaptchaValid) {
    return res.status(400).json({ message: 'Invalid reCAPTCHA. Please try again.' });
  }

  // Check for required fields
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // General phone number validation (allowing global numbers)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number format.' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    // Save the contact form data
    const newContactForm = new ContactForm({ name, email, phone, subject, message });
    await newContactForm.save();

    // Send confirmation email to admin
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: `Contact Form: ${subject}`,
        message: `Name: ${name}\nUser: ${user.FirstName} ${user.LastName}\nEmail: ${user.email}\nPhone: ${phone}\nMessage: ${message}`,
      });

      // Respond with success if everything is processed
      res.status(201).json({
        message: 'Contact form submitted successfully.',
      });
    } catch (emailError) {
      console.error('Email error:', emailError.message || emailError);
      return res.status(500).json({
        message: 'Failed to send confirmation email. Contact form submitted.',
      });
    }
  } catch (dbError) {
    console.error('Database error:', dbError.message || dbError);
    return res.status(500).json({ message: 'Server error. Failed to process submission.' });
  }
});

export { submitContactForm };

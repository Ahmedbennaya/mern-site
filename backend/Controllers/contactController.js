import asyncHandler from 'express-async-handler';
import User from '../Model/UserModel.js';
import sendEmail from '../Utils/sendEmail.js';

// Helper function to validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// @desc Submit a contact form
// @route POST /api/contact
// @access Public
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Check for required fields
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // Tunisian phone number validation (+216 8 digits)
  const phoneRegex = /^\+216\s?[0-9]{8}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Invalid Tunisian phone number format.' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    // Send confirmation email to admin
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: `Contact Form: ${subject}`,
        message: `Name: ${name}\nUser: ${user.FirstName} ${user.LastName}\nEmail: ${user.email}\nPhone: ${phone}\nMessage: ${message}`,
      });

      // Respond with success if email is sent successfully
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

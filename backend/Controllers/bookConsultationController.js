import asyncHandler from "express-async-handler";
import Consultation from "../Model/consultationModel.js";
import sendEmail from "../Utils/sendEmail.js";

// Helper function to validate email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// @desc Book a consultation
// @route POST /api/book-consultation
// @access Public
const bookConsultation = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !phone || !message) {
    res.status(400).json({ message: "All fields are required." });
    return;
  }

  // Validate email
  if (!validateEmail(email)) {
    res.status(400).json({ message: "Invalid email format." });
    return;
  }

  // New regex to allow various phone number formats
  const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;

  // Validate phone number
  if (!phoneRegex.test(phone)) {
    res.status(400).json({ message: "Invalid phone number format. Please ensure it includes only numbers, spaces, dashes, parentheses, and optionally starts with a '+'." });
    return;
  }

  try {
    // Create a new consultation entry in the database
    const consultation = new Consultation({
      name,
      email,
      phone,
      message,
    });

    // Save consultation to the database
    await consultation.save();

    // Send confirmation email
    try {
      await sendEmail({
        email: consultation.email, 
        subject: 'Consultation Request Received',
        message: `Dear ${consultation.name},

Thank you for reaching out to us! We have received your consultation request and our team will contact you soon.

Here are the details you submitted:
- **Name**: ${consultation.name}
- **Email**: ${consultation.email}
- **Phone**: ${consultation.phone}
- **Message**: ${consultation.message}

We will get back to you shortly.

Best regards,
[Bargaoui rideux Tahar]
        `, 
      });
    } catch (emailError) {
      console.error('Email error:', emailError.message || emailError);
      res.status(500).json({ 
        message: "Consultation saved, but failed to send confirmation email.",
        consultationId: consultation._id
      });
      return;
    }

    // Respond with success
    res.status(201).json({
      message: "Consultation booked successfully.",
      consultationId: consultation._id,
    });

  } catch (dbError) {
    console.error('Database error:', dbError.message || dbError);
    res.status(500).json({ message: "Failed to book consultation. Please try again later." });
  }
});

export { bookConsultation };
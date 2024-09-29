import asyncHandler from "express-async-handler";
import Consultation from "../Model/consultationModel.js"; 
import sendEmail from "../Utils/sendEmail.js";

// @desc Book a consultation
// @route POST /api/book-consultation
// @access Public
const bookConsultation = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Check if all fields are provided
  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  // Optional: Basic validation for email and phone format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email format.");
  }

  if (!phoneRegex.test(phone)) {
    res.status(400);
    throw new Error("Invalid phone number.");
  }

  // Create a new consultation entry in the database
  const consultation = new Consultation({
    name,
    email,
    phone,
    message,
  });

  // Save consultation to the database
  await consultation.save();

  // Try to send the email
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
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500);
    throw new Error('Consultation saved, but failed to send confirmation email.');
  }

  // Respond with success
  res.status(201).json({
    message: "Consultation booked successfully.",
    consultationId: consultation._id,
  });
});

export { bookConsultation };

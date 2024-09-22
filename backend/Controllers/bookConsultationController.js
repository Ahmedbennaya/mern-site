import asyncHandler from "express-async-handler";
import Consultation from "../Model/consultationModel.js"; 
import sendEmail from "../Utils/sendEmail.js";

// @desc Book a consultation
// @route POST /api/book-consultation
// @access Public
const bookConsultation = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error("All fields are required.");
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

  // Send email to the user with the consultation details
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

  res.status(201).json({
    message: "Consultation booked successfully.",
  });
});

export { bookConsultation };

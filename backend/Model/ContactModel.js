import mongoose from 'mongoose';

const contactFormSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation
    },
    phone: {
      type: String,
      required: true,
      match: /^\+?[1-9]\d{1,14}$/, // General phone number validation for international use
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const ContactForm = mongoose.model('ContactForm', contactFormSchema);
export default ContactForm;

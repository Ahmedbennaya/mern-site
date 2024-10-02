// File: sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const sendEmail = async (options) => {
  try {
    // Create a transporter using Gmail's SMTP server
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app-specific password
      },
    });

    // Define the email options for admin notification
    const adminMailOptions = {
      from: '"Admin Notification" <admin@yourdomain.com>', // Custom sender address
      to: 'aopenking95@gmail.com', // Hardcoded admin email
      subject: `New message from ${options.email}`, // Subject for admin
      text: `You have received a new message from ${options.email}.\n\nMessage: ${options.message}`, // User's message for admin
    };

    // Send email to the admin
    await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent successfully!');

    // Define the thank you email for the user
    const userMailOptions = {
      from: '"Bargaoui-Rideux-Tahar" <no-reply@yourdomain.com>', // Custom sender address
      to: options.email, // Recipient's email
      subject: 'Thank you for your message', // Thank you email subject
      text: 'Thank you for reaching out to us. We have received your message and will get back to you shortly.', // Thank you message body
    };

    // Send thank you email to the user
    await transporter.sendMail(userMailOptions);
    console.log('Thank you email sent to user successfully!');

  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;

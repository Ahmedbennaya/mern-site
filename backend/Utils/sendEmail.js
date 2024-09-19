import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

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

    // Define the email options
    const mailOptions = {
      from: `"Bargaoui-Rideux-Tahar" <${process.env.EMAIL_USER}>`, // Sender address
      to: options.email, // Recipient's email
      subject: options.subject, // Subject of the email
      text: options.message, // Plain text body of the email
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;

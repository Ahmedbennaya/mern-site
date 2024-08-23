import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  try {
    // Create a transporter using Gmail's SMTP server
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'Your Company <aopenking95@gmail.com>', 
      to: options.email, // Recipient's email
      subject: options.subject, // Subject of the email
      text: options.message, // Plain text body of the email
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;

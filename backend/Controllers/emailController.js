import sendEmail from "../utils/sendEmail.js"

export const sendWelcomeEmail = async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Please provide all required fields (email, subject, message).' });
  }

  try {
    await sendEmail({
      email,
      subject,
      message,
    });
    res.status(200).json({ success: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send the email' });
  }
};

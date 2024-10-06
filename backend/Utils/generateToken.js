import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  // Generate JWT
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token valid for 30 days
  });

  // Set the cookie with token
  res.cookie('JWT', token, {
    httpOnly: true, // Prevent access to cookie from JavaScript
    secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax', // Strict for cross-site protection in production
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
};

export default generateToken;

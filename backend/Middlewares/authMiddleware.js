import jwt from 'jsonwebtoken';
import User from '../Model/UserModel.js';

// Middleware to verify the user is authenticated
export const authenticate = async (req, res, next) => {
  let token;
  
  // Check for token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
      
      // Find the user by ID and attach to the request object
      req.user = await User.findById(decoded.userId).select('-password');
      
      next(); // Proceed to next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to verify the user is an admin
export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // Proceed if user is admin
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

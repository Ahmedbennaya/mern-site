import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../Model/userModel.js";

const authenticate = expressAsyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt; // Corrected the cookie name to lowercase 'jwt'

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const authorizeAdmin = expressAsyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({
      message: "Admin authorization required",
    });
  }
});

export { authenticate, authorizeAdmin };

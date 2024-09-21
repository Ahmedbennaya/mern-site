import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../Model/UserModel.js";

const authenticate = expressAsyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized , invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized , expired token");
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
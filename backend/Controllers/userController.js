import asyncHandler from "express-async-handler";
import User from "../Model/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from "../Utils/sendEmail.js";




// @desc Register a new user
// @route POST /api/users/registerUser
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { FirstName, LastName, email, password, profileImage } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    FirstName,
    LastName,
    email,
    password,
    profileImage,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      email: user.email,
      profileImage: user.profileImage,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      email: user.email,
      profileImage: user.profileImage,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Logout user & clear cookie
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc Send password reset email
// @route POST /api/users/forgot-password
// @access Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const resetToken = crypto.randomBytes(20).toString("hex");

  user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
  await user.save();

  const resetUrl = `${req.protocol}://${req.get("host")}/api/users/reset-password/${resetToken}`;

  const message = `
    You are receiving this email because you (or someone else) has requested the reset of a password. 
    Please make a put request to: \n\n ${resetUrl}
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(500);
    throw new Error("Email could not be sent");
  }
});

// @desc Reset user password
// @route POST /api/users/reset-password/:token
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid token or token has expired");
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  generateToken(res, user._id);
  res.status(200).json({ message: "Password reset successfully" });
});

export { registerUser, loginUser, logoutUser, forgotPassword, resetPassword };

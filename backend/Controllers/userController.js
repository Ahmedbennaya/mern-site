import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import JWT from 'jsonwebtoken'; 
import User from '../Model/UserModel.js';
import sendEmail from '../Utils/sendEmail.js';
import generateToken from '../Utils/generateToken.js';

// @desc    Register a new user  
// @route   POST /api/users/registerUser  
// @access  Public  
const registerUser = asyncHandler(async (req, res) => {  
  const { FirstName, LastName, email, password, profileImage, isAdmin } = req.body; 

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
    isAdmin,  
    profileImage,  
  });  

  if (user) {  
    generateToken(res, user._id);  
    res.status(201).json({  
      _id: user._id,  
      FirstName: user.FirstName,  
      LastName: user.LastName,    
      email: user.email,  
      isAdmin: user.isAdmin,  
      photo: user.profileImage,  
    });  
  } else {  
    res.status(400);  
    throw new Error("Invalid user data");  
  }  
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = JWT.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: user._id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user & clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "strict",
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Send password reset email
// @route   POST /api/users/forgot-password
// @access  Public
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

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. 
    Please click the link below to reset your password: \n\n ${resetUrl}`;

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

// @desc    Reset user password
// @route   POST /api/users/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.password = password; // Ensure to hash the password in the model's pre-save hook
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
});

// @desc    Update user profile
// @route   PUT /api/users/update
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.FirstName = req.body.FirstName || user.FirstName;
  user.LastName = req.body.LastName || user.LastName;
  user.email = req.body.email || user.email;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pictures",
    });
    user.profileImage = result.secure_url;
  }

  if (req.body.password) {
    user.password = await bcrypt.hash(req.body.password, 10); // Ensure password is hashed
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    FirstName: updatedUser.FirstName,
    LastName: updatedUser.LastName,
    email: updatedUser.email,
    photo: updatedUser.profileImage,
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

// @desc    Delete a user by ID
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();
  res.json({ message: "User deleted successfully" });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUserProfile,
  getAllUsers,
  deleteUser,
};
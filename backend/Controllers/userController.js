import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import JWT from 'jsonwebtoken'; 
import User from '../Model/UserModel.js';
import sendEmail from '../Utils/sendEmail.js';

// @desc    Register a new user  
// @route   POST /api/users/registerUser  
// @access  Public  
const registerUser = asyncHandler(async (req, res) => {  
  const { FirstName, LastName, email, password, profileImage, isAdmin } = req.body; 

  // Check if user already exists
  const userExists = await User.findOne({ email });  
  if (userExists) {  
    res.status(400);  
    throw new Error("User already exists");  
  }  

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await User.create({  
    FirstName, 
    LastName,   
    email,  
    password: hashedPassword,  // Save hashed password
    isAdmin,  
    profileImage,  
  });  

  // Send a response if user is successfully created
  if (user) {  
    const token = JWT.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }  // Token expiry from env
    );

    res.status(201).json({  
      _id: user._id,  
      FirstName: user.FirstName,  
      LastName: user.LastName,    
      email: user.email,  
      isAdmin: user.isAdmin,  
      profileImage: user.profileImage,  
      token,
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

  // Find user by email
  const user = await User.findOne({ email });

  // Check if the user exists and if the password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = JWT.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }  // Token expires in 30 days
    );

    // Set JWT in cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Send user info with token
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
    secure: process.env.NODE_ENV !== "development",
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

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set token and expiration on user model
  user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) requested the reset of a password. Please click the link below to reset your password: \n\n ${resetUrl}`;

  try {
    // Send reset email
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    // Reset user fields if email fails to send
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

  // Hash token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user by token and check expiry
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // Hash and save the new password
  user.password = await bcrypt.hash(password, 10);
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
    user.password = await bcrypt.hash(req.body.password, 10); // Hash new password
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    FirstName: updatedUser.FirstName,
    LastName: updatedUser.LastName,
    email: updatedUser.email,
    profileImage: updatedUser.profileImage,
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
  console.log(`Received request to delete user with ID: ${req.params.id}`);

  const user = await User.findById(req.params.id);
  console.log('User found:', user);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Remove the user from the database
  await user.deleteOne();  // Correct usage of Mongoose's deleteOne for the found document

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

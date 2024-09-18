import asyncHandler from "express-async-handler";
import User from "../Model/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import JWT from "jsonwebtoken"; // Import jsonwebtoken

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { FirstName, LastName, email, password, photo, isAdmin} = req.body;

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
    photo,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      FirstName: user.firstName,
      LastName: user.LastName,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      photo: user.photo,
    });
  } else {
    res.status(400);
    throw new Error("Try again ..");
  }
});
// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  
  if (user && (await bcrypt.compare(password, user.password))) {
      // Generate a JWT token including the isAdmin field
      const token = JWT.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
          expiresIn: "30d",
      });

      res.cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "development", 
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      // Return user data along with admin status
      res.json({
          _id: user._id,
          FirstName: user.FirstName,
          LastName: user.LastName,
          email: user.email,
          isAdmin: user.isAdmin, // Include isAdmin field
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
    secure: process.env.NODE_ENV === "production",
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

  const resetUrl = `${req.protocol}://${req.get("host")}/api/users/reset-password/${resetToken}`;

  const message = `
    You are receiving this email because you (or someone else) has requested the reset of a password. 
    Please make a PUT request to: \n\n ${resetUrl}
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

// @desc    Reset user password
// @route   POST /api/users/reset-password/:token
// @access  Public
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

// @desc    Update user profile
// @route   PUT /api/users/update
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update user details
  user.FirstName = req.body.FirstName || user.FirstName;
  user.LastName = req.body.LastName || user.LastName;
  user.email = req.body.email || user.email;

  // Handle image upload
  if (req.file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_pictures" },
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    // Save the uploaded image URL to the user's profile
    user.photo = result.secure_url;
  }

  // Update password if provided
  if (req.body.password) {
    user.password = req.body.password; // Ensure to hash the password in the model
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    FirstName: updatedUser.FirstName,
    LastName: updatedUser.LastName,
    email: updatedUser.email,
    photo: updatedUser.photo,
  });
});


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

export {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUserProfile,
  getAllUsers
};
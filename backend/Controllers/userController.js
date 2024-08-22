import asyncHandler from "express-async-handler";
import User from "../Model/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcryptjs';

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

export { registerUser, loginUser, logoutUser };

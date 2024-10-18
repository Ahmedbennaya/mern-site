// Model/UserModel.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    profileImage: {
      type: String,
      default: "https://res.cloudinary.com/dc1zy9h63/image/upload/v1726415737/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws_eqk1sd.jpg",
    },
    isAdmin: { type: Boolean, required: true, default: false },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, minlength: 8 },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

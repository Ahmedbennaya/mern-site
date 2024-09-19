import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/dc1zy9h63/image/upload/v1726679186/icon-5359553_640_kkdoli.webp",
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

// hashing passowrd
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// comparing password for login
userSchema.methods.matchPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
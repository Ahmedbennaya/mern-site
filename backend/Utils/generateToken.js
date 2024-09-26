import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token will expire in 30 days
  });

  res.cookie("JWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensures secure cookies in production (HTTPS only)
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Allows cookies for cross-domain requests
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;

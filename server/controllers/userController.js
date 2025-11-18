import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { validationResult } from "express-validator";

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPass,
    });
    await user.save();
    return res
      .status(201)
      .json({ message: "User created successfully", data: user });
  } catch (error) {
    return res.status(500).json({
      message: "Error while sign up",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentils" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentails" });
    }
    const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email, id: user._id },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while login:" + error.message });
  }
};

import {
  isValidEmail,
} from "../validation/validaton.js";
import { User } from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { fullName, email,password } = req.body;
        
    // validation check of email
    const isValidEm = isValidEmail(email);

    if (!isValidEm) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    
    // email exists or not
    
    const user = await User.findOne({ email: email });
    
    if (user) {
      return res.json({
        success: false,
        message: "This email already exists!",
      });
    }
    
    await User.create({
      fullName,
      email,
      password,
    });

    return res.json({ success: true, message: "User created successfully!"});
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation check of email
    const isValidEm = isValidEmail(email);

    if (!isValidEm) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // email exists or not

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({ success: false, message: "User Does not exist" });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ success: true, message: "Login successfully!",token,user });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};




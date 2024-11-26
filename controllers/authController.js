import { compare } from "bcrypt";
import userModel from "../models/userModel.js";
import { hashPassword } from "./../helpers/authHelper.js"; // Temporary comment due to error!
import JWT from "jsonwebtoken";
import { comparePassword } from "./../helpers/authHelper.js";

// Register Controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // Validations
    if (!name) return res.send({ message: "Name is Required" });
    if (!email) return res.send({ message: "Email is Required" });
    if (!password) return res.send({ message: "Password is Required" });
    if (!phone) return res.send({ message: "Phone is Required" });
    if (!address) return res.send({ message: "Address is Required" });
    if (!answer) return res.send({ message: "Answer is Required" });

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already Registered! Please Login.",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Save the new user
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: "Registration Successful!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong During Registration!",
      error,
    });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare passwords
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successful!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    // Validation
    if (!email) return res.status(400).send({ message: "Email Required!" });
    if (!answer) return res.status(400).send({ message: "Answer Required!" });
    if (!newPassword)
      return res.status(400).send({ message: "New Password Required!" });

    // Check if user exists with the provided email and answer
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email or Security Answer is Incorrect!",
      });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's password
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.status(200).send({
      success: true,
      message: "Password Reset Successful!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong During Password Reset!",
      error,
    });
  }
};

// Test Controller (for protected routes)
export const testController = (req, res) => {
  res.send("Protected Route!");
};

const Users = require("../models/UserModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// update code 
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (error) {
    // console.error("Error getting all users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// created user 
exports.createUser = async (req, res) => {
  try {
    const user = req.body;

    // Check if a user with the same email already exists
    const existingUser = await Users.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create a new user if the email doesn't exist
    const newUser = new Users(user);
    const result = await newUser.save();

    // Create a JWT token
    const token = jwt.sign({ email: result.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60d' });
    // console.log("token", token);

    // Send the token in a cookie
    res.cookie('token', token, {
      httpOnly: true, // To prevent client-side access to the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict', // Prevent CSRF
    });

    res.status(201).json({
      message: 'User created successfully',
      user: result,
    });
  } catch (error) {
    // console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};






exports.getOneUser = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await Users.findOne({ email });
    // console.log("user" , user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};










// update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await Users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updateUser);
  } catch (error) {
    // console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 
exports.getUserRoles = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await Users.findOne({ email }).select("isAdmin");
    res.send(user);
  } catch (error) {
    // console.error("Error getting user roles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

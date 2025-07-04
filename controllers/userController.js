const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");
const userModel = require("../models/userModel");
const cookieParser = require("cookie-parser");
const User = require("../models/userModel"); // without .js

//Registering New User
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  console.log("Registering user:", { email, password, username });

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  } 

  // ✅ Proper hashing with await
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log("Hashed password:", hashedPassword);

  // ✅ Make sure to await the user creation
  const user = await userModel.create({
    email,
    username,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // ✅ Set token and respond
  const token = generateToken(user._id);
  // console.log("Generated token:", token);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  // console.log("Cookie set with token");

  res.status(201).json({
    _id: user._id,
    email: user.email,
    username: user.username,
  });
});


//Login User


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (!user.password) {
    res.status(500);
    throw new Error("User password is missing in the database");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  console.log(token ,"Token");
  

  res.json({
    _id: user._id,
    email: user.email,
    token,
    username: user.username,
    message: "Login successful",
  });
});
//Logout User

const LogoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(),
  });
  res.status(200).json({ message: "Logged out succesfully" });
});


const findAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  console.log("All users:", users);
  res.json(users);
});


module.exports = { LogoutUser, loginUser, registerUser ,findAllUsers };

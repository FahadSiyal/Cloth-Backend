const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const generateToken = require("../utils/generateToken");
const userModel = require("../models/userModel");
const cookieParser = require("cookie-parser");
const User = require('../models/userModel'); // without .js


//Registering New User
  const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Registering user:", {  email, password });

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedPassword = bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt);

    const user = userModel.create({ email, password: hashedPassword });
    if (user) {
      const token = generateToken(user._id);

      res.cookie('token',token,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:30 * 24 * 60 * 60 * 1000,
      })
      res.status(201).json({
        _id: user._id,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  });
});

//Login User

 const loginUser = asyncHandler(async (req, res) => {
  const { email,password } = req.body;

  const user = userModel.findOne({ email });

  if (user) {

    const token=generateToken(user._id)
    res.cookie('token',token,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:30 * 24 * 60 * 60 * 1000,
    })
    res.json({
      _id: user._id,
      email: user.email,
     
    });
  } else {
    res.status(400);
    throw new Error("invalid Credentials");
  }
});

//Logout User

  const LogoutUser= asyncHandler( async(req,res)=>{
  res.cookie('token','',{
    httpOnly:true,
    sameSite:'strict',
    expires:new Date()
  })
  res.status(200).json({message:"Logged out succesfully"})
})
module.exports={LogoutUser,loginUser,registerUser}
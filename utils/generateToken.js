const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "8h" });
};

module.exports=generateToken;

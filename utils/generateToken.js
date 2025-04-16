const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "SECRET", { expiresIn: "8h" });
};

module.exports=generateToken;

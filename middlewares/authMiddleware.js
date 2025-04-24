const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } 
  // Or check Authorization header (for Bearer tokens)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
   
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
    res.redirect("/login");
  }
});

module.exports = isLoggedIn;
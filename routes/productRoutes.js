const {
  createProducts,
  findProducts,
} = require("../controllers/productController");

const express = require("express");
const router = express.Router();

//Finding Products

router.get("/", findProducts);
// //Creating Products
router.post("/", createProducts);

module.exports = router;

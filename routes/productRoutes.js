const {
  createProducts,
  findProducts,
  deleteProduct
} = require("../controllers/productController");

const express = require("express");
const router = express.Router();

//Finding Products

router.get("/", findProducts);
// //Creating Products
router.post("/", createProducts);


router.post("/", createProducts);

// router.delete("/", deleteProduct);




module.exports = router;

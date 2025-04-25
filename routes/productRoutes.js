


const express = require("express");
const router = express.Router();


const {
  createProducts,
  findProducts,
  deleteproduct
} = require("../controllers/productController");



//Finding Products

router.get("/", findProducts);
// //Creating Products
router.post("/", createProducts);
// //Deleting Products
router.delete("/:id",deleteproduct)






module.exports = router;

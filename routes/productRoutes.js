


const express = require("express");
const router = express.Router();


const {
  createProducts,
  findProducts,
  deleteProduct
} = require("../controllers/productController");



//Finding Products

router.get("/", findProducts);
// //Creating Products
router.post("/", createProducts);
// //Deleting Products
router.delete("/:id",deleteProduct)


// router.post("/", createProducts);

router.delete('/:id', deleteProduct);




module.exports = router;

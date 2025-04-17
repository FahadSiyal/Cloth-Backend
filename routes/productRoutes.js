const {createProducts,findProducts}=require('../controllers/productController');

const express = require("express");
const router = express.Router();

//Finding Products
router.get("/find", findProducts);
//Creating Products
 router.post("/create", createProducts);

module.exports = router;
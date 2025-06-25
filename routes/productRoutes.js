
const {
  createProducts,
  findProducts,
  deleteProduct
} = require("../controllers/productController");

const express = require("express");
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const asyncHandler = require('express-async-handler');
// const Product = require('../models/Product');

//  Cloudinary config
cloudinary.config({
  cloud_name: 'dxi11gwxb',
  api_key: '839265276771622',
  api_secret: 'GqBsJ7bz_egbxjjSsY1S64zgSRU'
});

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif']
  }
});
const upload = multer({ storage: storage });










// ⬇ Route with upload middleware

router.get("/", findProducts);
// //Creating Products
router.post("/", upload.single('image'), createProducts);
// //Deleting Products
router.delete("/:id",deleteProduct)







module.exports = router;

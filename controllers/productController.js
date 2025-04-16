const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const findProducts = asyncHandler(async (req, res) => {
  const products = Product.find();
  res.status(200).json(products);
});

const createProducts = asyncHandler(async (req, res) => {
  const { name, title, desc, quantity, price, image, size, color, category } =
    req.body;
    const product=Product.create()
});

const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const findProducts = asyncHandler(async (req, res) => {
  const productLimit = parseInt(req.query.limit) || 8;
  const productPage = parseInt(req.query.page) || 1;

  const totalProducts = await Product.countDocuments();
  const products = await Product.find({})
    .limit(productLimit)
    .skip((productPage - 1) * productLimit);

  const totalPages = Math.ceil(totalProducts / productLimit);
  const currentPage = productPage;

  res.status(200).json({
    products,
    totalPages,
    currentPage,
  });
})



const createProducts = asyncHandler(async (req, res) => {
  const { name, desc, price, category } =req.body;

  // if (name || price || desc || category === " " ) {
  //   res.status(400)
  //   throw new Error('please fill all the required fields ')
  // }
  const product = await Product.create({
    name,
    price,
    desc,
    category
  });
  res.json(product);

});
module.exports = { findProducts, createProducts };

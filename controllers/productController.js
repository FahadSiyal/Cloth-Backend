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
  const { name, title, desc, quantity, price, image, size, color, category } =
    req.body;
  if(!name || !title || !quantity || !price || !size ){
    res.status(400)
    throw new Error('please fill all the required fields ')
  }
  console.log("hdbvuhvd");
  const product = await Product.create({ Name: "Fahad", title: "Fahad" });
  res.json(products);

});
module.exports = { findProducts, createProducts };'''

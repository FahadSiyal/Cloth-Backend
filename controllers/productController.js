const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const findProducts = asyncHandler(async (req, res) => {
  const productLimit = parseInt(req.query.limit) || 8;
  const productPage = parseInt(req.query.page) || 1;
  const category = req.query.category; // ✅ Get category from query

  const query ={}
  if(category){
    query.category = category; // ✅ Filter by category if provided
  } // ✅ Use category if exists

  const totalProducts = await Product.countDocuments(query);
  const products = await Product.find(query)
    .limit(productLimit)
    .skip((productPage - 1) * productLimit);

  const totalPages = Math.ceil(totalProducts / productLimit);
  const currentPage = productPage;

  res.status(200).json({
    products,
    totalPages,
    currentPage,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.remove(); 
  res.status(200).json({ message: "Product deleted successfully" });
});



const createProducts = asyncHandler(async (req, res) => {
  const { name, desc, price, category,actualprice } =req.body;

  // if (name || price || desc || category === " " ) {
  //   res.status(400)
  //   throw new Error('please fill all the required fields ')
  // }
  const product = await Product.create({
    name,
    price,
    desc,
    category,
    actualprice
  });
  console.log("hdbvuhvd");

  // const product = await Product.create({ name: "Aarij", title: "Aarij" });
  res.json(product);

});





module.exports = { findProducts, createProducts , deleteProduct };


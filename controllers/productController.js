const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");








const findProducts = asyncHandler(async (req, res) => {
  const productLimit = parseInt(req.query.limit) || 30;
  const productPage = parseInt(req.query.page) || 1;

  const category = req.query.category;
  const search = req.query.search;

  const query = {};

  // Filter by category if provided
  if (category) {
    query.category = category;
  }

  // Filter by search if provided
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { desc: { $regex: search, $options: "i" } },
      // optionally match brand or other fields too:
      { brand: { $regex: search, $options: "i" } },
    ];
  }

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
    totalProducts,
  });
});



const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("Trying to delete product with ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid product ID');
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.public_id) {
    await cloudinary.uploader.destroy(product.public_id);
  }

  await product.deleteOne();

  res.status(200).json({ message: 'Product and image deleted successfully' });

});


const createProducts = asyncHandler(async (req, res) => {
  const { name, desc, price, category,actualprice,image } =req.body;
  console.log("product data", req.body);

  // if (name || price || desc || category === " " ) {
  //   res.status(400)
  //   throw new Error('please fill all the required fields ')
  // }
const product = await Product.create({
  name,
  price,
  desc,
  category,
  actualprice,
  image: req.file?.path, // ✅ Use req.file.path for the image URL
  public_id: req.file?.filename  
});
  console.log("product created", product);

  // const product = await Product.create({ name: "Aarij", title: "Aarij" });
  res.status(201).json(product);



});






module.exports = { findProducts, createProducts , deleteProduct };


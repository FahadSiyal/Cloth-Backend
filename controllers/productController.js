const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const findProducts = asyncHandler(async (req, res) => {
  const products = Product.find();
  res.status(200).json(products);
});

const createProducts = asyncHandler(async (req, res) => {
  const { name, title, desc, quantity, price, image, size, color, category } =
    req.body;
    if(!name || !title || !quantity || !price || !size ){
      res.status(400)
      throw new Error('please fill all the required fields ')
    }
    const product=Product.create(
      name,
       title,
        desc,
         quantity,
          price, 
          image,
           size,
            color,
             category 
    )
    res.status(201).json(products)
});
module.exports={findProducts,createProducts}
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

const placeOrder = asyncHandler(async (req, res) => {
    const { name, email, phone, address, CartItems,city } = req.body;
  
   
  
    const Orders = await Order.create({
      name,
      email,
      phone,
      address,
      city,
      cartItems: CartItems, // ensure field name matches schema
    });
  
    res.json(Orders);
  });

const findOrder = asyncHandler(async (req, res) => {
  const Orders = await Order.find({});
  res.json(Orders);
});

module.exports = { placeOrder, findOrder };

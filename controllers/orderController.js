const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

const placeOrder = asyncHandler(async (req, res) => {
  const { name, email, phone, address, CartItems, city } = req.body;
  console.log(req.user);
  let userId = req.user
  console.log("User ID:", userId);
  
  try {
    const Orders = await Order.create({
      name,
      email,
      phone,
      address,
      city,
      userId: userId, // ensure field name matches schema
      cartItems: CartItems, // ensure field name matches schema
    });
    res.json(Orders);
  } catch (error) {
    console.error("Error creating order:", error);
  }
 


 
});

const findOrder = asyncHandler(async (req, res) => {
  const Orders = await Order.find({});
  res.json(Orders);
});



module.exports = { placeOrder, findOrder };


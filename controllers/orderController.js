const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel"); // Assuming you have a Product model

const placeOrder = asyncHandler(async (req, res) => {
  const { name, email, phone, address, city, CartItems } = req.body;
  const userId = req.user; // because middleware sets req.user = user id

  // 1️⃣ Validate that all product IDs exist in the database
  for (const item of CartItems) {
    const product = await Product.findById(item.productId);
    if (!product) {
      // Product not found, send error
      return res.status(400).json({
        message: `Product with ID ${item.productId} (${item.name}) is not available in our store.`,
      });
    }
  }

  // 2️⃣ If all products exist, create the order
  try {
    const order = await Order.create({
      name,
      email,
      phone,
      address,
      city,
      userId,
      cartItems: CartItems, // make sure this matches your schema!
    });

    res.status(201).json({
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
});

const findOrder = asyncHandler(async (req, res) => {
  const Orders = await Order.find({});
  res.json(Orders );
});



module.exports = { placeOrder, findOrder };


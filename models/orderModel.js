const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, },
  email: { type: String, },
  phone: { type: String, },
  address: { type: String, },
  city: { type: String, },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
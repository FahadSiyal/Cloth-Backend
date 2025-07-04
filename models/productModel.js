const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  public_id: {
    type: String,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  category: {
    type: String,
  },
  discount: {
    type: String,
  },
  actualprice: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", productSchema);

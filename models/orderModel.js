const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: String,
  },
  address:{
    type:String
  },
  city:{
type:String
  }
});

module.exports=mongoose.model('Order',orderSchema)
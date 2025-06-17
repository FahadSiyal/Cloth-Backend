const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    //Shop details
    shopName: { type: String, required: true },
    shopLogo: String,
    description: String,

    //Bussiness Details
    businessEmail: String,
    phone: String,
    businessAddress: String,

    //Banking Details
    CNIC: String,
    bankName: String,
    accountNumber: String,

    isVerified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "banned"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seller", sellerSchema);

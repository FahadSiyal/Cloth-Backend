const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Shop details
    shopName: { type: String, required: true },
    shopLogo: String,
    description: String,

    // Business Details
    businessEmail: String,
    phone: String,
    alternatePhoneNo: String,
    businessAddress: String,
    warehouseAddress: String,
    secpNumber: String,
    ntnNumber: String,
    businessLicense: String,
    taxId: String,

    // Authentication
    password: {
      type: String,
      required: true,
    },

    // Banking Details
    CNIC: String,
    bankName: String,
    accountNumber: String,
    bankAccountTitle: String,

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
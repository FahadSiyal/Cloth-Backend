const asyncHandler = require('express-async-handler');
const Seller = require('../models/sellerModel');
const User = require('../models/userModel');

// @desc    Register or upgrade to seller
// @route   POST /api/sellers/register
// @access  Public or Protected (based on your app)
const registerSeller = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    shopName,
    shopLogo,
    description,
    businessEmail,
    phone,
    businessAddress,
    businessLicense,
    CNIC,
    taxId,
    bankName,
    accountNumber,
    bankAccountTitle
  } = req.body;

  // Step 1: Check if user exists
  let user = await User.findOne({ email });

  if (!user) {
    // Create new user (if user doesn't exist)
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'seller',
    });
  } else {
    // If user exists but not a seller, upgrade role
    if (user.role !== 'seller') {
      user.role = 'seller';
      await user.save();
    }
  }

  // Step 2: Check if seller profile already exists
  const existingSeller = await Seller.findOne({ user: user._id });
  if (existingSeller) {
    res.status(400);
    throw new Error('Seller profile already exists');
  }

  // Step 3: Create seller profile
  const seller = await Seller.create({
    user: user._id,
    shopName,
    shopLogo,
    description,
    businessEmail,
    phone,
    businessAddress,
    businessLicense,
    CNIC,
    taxId,
    bankName,
    accountNumber,
    bankAccountTitle,
  });

  res.status(201).json({
    message: 'Seller account created successfully',
    seller,
  });
});

// @desc    Get all sellers (admin only)
// @route   GET /api/sellers
// @access  Admin
const getAllSellers = asyncHandler(async (req, res) => {
  const sellers = await Seller.find().populate('user', 'name email role');
  res.json(sellers);
});

// @desc    Get seller by ID
// @route   GET /api/sellers/:id
// @access  Public
const getSellerById = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id).populate('user', 'name email');

  if (!seller) {
    res.status(404);
    throw new Error('Seller not found');
  }

  res.json(seller);
});

// @desc    Update seller (seller only)
// @route   PUT /api/sellers/:id
// @access  Private (seller)
const updateSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id);

  if (!seller) {
    res.status(404);
    throw new Error('Seller not found');
  }

  // (Optional) Check if req.user._id === seller.user

  Object.assign(seller, req.body);

  const updatedSeller = await seller.save();

  res.json(updatedSeller);
});

module.exports = {
  registerSeller,
  getAllSellers,
  getSellerById,
  updateSeller,
};

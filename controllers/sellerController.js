const asyncHandler = require("express-async-handler")
const Seller = require("../models/sellerModel")
const User = require("../models/userModel")
const generateToken = require("../utils/generateToken")
const bcrypt = require("bcryptjs")
const sendEmail = require("../utils/sendEmail")

const registerSeller = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    shopName,
    shopLogo,
    secpNumber,
    ntnNumber,
    warehouseAddress,
    alternatePhoneNo,
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
  } = req.body

  // Step 1: Check if user exists
  let user = await User.findOne({ email })
  let hashedPassword

  if (!user) {
    // Create new user (if user doesn't exist)
    hashedPassword = await bcrypt.hash(password, 10)
    user = await User.create({
      username: name,
      email,
      password: hashedPassword,
      role: "seller",
    })
  } else {
    // If user exists but not a seller, upgrade role
    if (user.role !== "seller") {
      user.role = "seller"
      await user.save()
    }
    // Use existing hashed password
    hashedPassword = user.password
  }

  // Step 2: Check if seller profile already exists
  const existingSeller = await Seller.findOne({ user: user._id })
  if (existingSeller) {
    res.status(400)
    throw new Error("Seller profile already exists")
  }

  // Step 3: Create seller profile (default to pending approval)
  const seller = await Seller.create({
    user: user._id,
    shopName,
    shopLogo,
    secpNumber,
    ntnNumber,
    warehouseAddress,
    description,
    businessEmail,
    password: hashedPassword,
    phone,
    alternatePhoneNo,
    businessAddress,
    businessLicense,
    CNIC,
    taxId,
    bankName,
    accountNumber,
    bankAccountTitle,
    isApproved: false, // Default to pending
  })

  await sendEmail(
    user.email,
    "Welcome to the Seller Platform!",
    `<p>Your seller account has been successfully created with the shop name: <strong>${shopName}</strong>.</p>
    <p>Your account is currently pending approval. You will be notified once approved.</p>
    <br />
    <p>Thanks for joining us!</p>`,
  )

  await sendEmail(
    "aarijfarhan74@gmail.com",
    "New Seller Registered",
    `<h2>New Seller Registration Alert</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Shop Name:</strong> ${shopName}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Status:</strong> Pending Approval</p>
    <br />
    <p>This seller just registered and needs approval.</p>`,
  )

  const token = generateToken(seller._id)
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })

  res.status(201).json({
    message: "Seller account created successfully. Pending approval.",
    seller,
  })
})

// Seller Login with approval check
const loginSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error("Email and password are required")
  }

  const seller = await Seller.findOne({
    businessEmail: email,
  })

  if (!seller) {
    res.status(400)
    throw new Error("Seller not found")
  }

  // Check if seller is approved
  if (!seller.isApproved) {
    res.status(403)
    throw new Error("Your account is pending approval. Please wait for admin approval.")
  }

  if (!seller.password) {
    res.status(500)
    throw new Error("Seller password is missing in the database")
  }

  const isMatch = await bcrypt.compare(password, seller.password)

  if (!isMatch) {
    res.status(400)
    throw new Error("Invalid Password credentials")
  }

  const token = generateToken(seller._id)
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })

  res.json({
    _id: seller._id,
    email: seller.businessEmail,
    token,
    shopName: seller.shopName,
    isApproved: seller.isApproved,
    message: "Seller Login successful",
  })
})

// Update seller approval status
const updateSellerApproval = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { isApproved } = req.body

  const seller = await Seller.findById(id)

  if (!seller) {
    res.status(404)
    throw new Error("Seller not found")
  }

  seller.isApproved = isApproved
  const updatedSeller = await seller.save()

  // Send email notification to seller
  const user = await User.findById(seller.user)
  if (user) {
    const status = isApproved ? "approved" : "pending"
    const message = isApproved
      ? "Congratulations! Your seller account has been approved. You can now login and start selling."
      : "Your seller account has been set to pending. Please contact support for more information."

    await sendEmail(
      user.email,
      `Seller Account ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      `<p>${message}</p>`,
    )
  }

  res.json({
    message: `Seller ${isApproved ? "approved" : "set to pending"} successfully`,
    seller: updatedSeller,
  })
})

// Get all sellers
const getAllSellers = asyncHandler(async (req, res) => {
  const sellers = await Seller.find().populate("user", "name email role")
  res.json(sellers)
})

// Get seller by ID
const getSellerById = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id).populate("user", "name email")

  if (!seller) {
    res.status(404)
    throw new Error("Seller not found")
  }

  res.json(seller)
})

// Update seller (seller only)
const updateSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id)

  if (!seller) {
    res.status(404)
    throw new Error("Seller not found")
  }

  Object.assign(seller, req.body)
  const updatedSeller = await seller.save()

  res.json(updatedSeller)
})

module.exports = {
  registerSeller,
  getAllSellers,
  getSellerById,
  loginSeller,
  updateSeller,
  updateSellerApproval,
}

const express = require("express")
const {
  registerSeller,
  getAllSellers,
  getSellerById,
  loginSeller,
  updateSeller,
  updateSellerApproval,
} = require("../controllers/sellerController")

const router = express.Router()

// Public routes
router.post("/register", registerSeller)
router.post("/login", loginSeller)


router.get("/", getAllSellers)
router.get("/:id", getSellerById)
router.patch("/:id/approval", updateSellerApproval) // New route for approval
router.put("/:id", updateSeller)

module.exports = router

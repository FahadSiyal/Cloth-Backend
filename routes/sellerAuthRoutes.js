const {
  registerSeller,
  getAllSellers,
  getSellerById,
  updateSeller,
} = require("../controllers/sellerController");
const isLoggedIn = require("../middlewares/authMiddleware");
const express=require('express')

const router=express.Router();

router.post('/register',isLoggedIn,registerSeller)
router.get('/allsellers',getAllSellers)
router.get('/',getAllSellers)
router.put('/',updateSeller)

module.exports=router;

//Localhost:3000/api/seller/register
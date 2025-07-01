const {
  registerSeller,
  getAllSellers,
  getSellerById,
  updateSeller,
  loginSeller
} = require("../controllers/sellerController");
const isLoggedIn = require("../middlewares/authMiddleware");
const express=require('express')

const router=express.Router();

router.post('/register',registerSeller)
router.get('/allsellers',getAllSellers)
router.post('/login',loginSeller)
router.get('/',getAllSellers)
router.put('/',updateSeller)

module.exports=router;

//Localhost:3000/api/seller/register
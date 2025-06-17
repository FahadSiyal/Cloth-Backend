const {
  registerSeller,
  getAllSellers,
  getSellerById,
  updateSeller,
} = require("../controllers/sellerController");

const express=require('express')

const router=express.Router();

router.post('/register',registerSeller)
router.get('/allsellers',getAllSellers)
router.get('/',getAllSellers)
router.put('/',updateSeller)

module.exports=router;
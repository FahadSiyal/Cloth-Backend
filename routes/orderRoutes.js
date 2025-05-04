const {findOrder,placeOrder}=require('../controllers/orderController')
const express=require('express')
const isLoggedIn = require('../middlewares/authMiddleware')

const router=express.Router()

router.post('/',isLoggedIn,placeOrder)
router.get('/',findOrder)

module.exports=router
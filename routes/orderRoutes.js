const {findOrder,placeOrder}=require('../controllers/orderController')
const express=require('express')

const router=express.Router()

router.post('/',placeOrder)
router.get('/',findOrder)

module.exports=router
const Order=require('../models/orderModel')
const asyncHandler=require('express-async-handler')

const placeOrder=asyncHandler(async(req,res)=>{
    // const {name,email,number,address,city}=req.body
    // if(!name || !email || !number || !address || !city ){
    //       res.status(400)
    //       throw new Error('please fill all the required fields ')
    //  }
     const Orders= await Order.create({
        name:"fahad"
     })
    //  const Orders= await Order.create({
    //     name,email,number,address,city
    //  })
     res.json(Orders)
})

const findOrder=asyncHandler(async(req,res)=>{
    const Orders=await Order.find({})
    res.json(Orders)

})

module.exports={placeOrder,findOrder}
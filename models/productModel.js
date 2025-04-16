const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:String,
    title:String,
    desc:String,
    quantity:Number,
    price:Number,
    image:String,
    size:String,
    color:String,
    category:String
})

module.exports=mongoose.model('Product',productSchema)
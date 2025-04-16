const mongoose=require('mongoose')

const dotenv=require('dotenv')
dotenv.config()

const userSchema=mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: [false, "Password is required"],
        minlength: 6,
        select: false, // Don't return password by default
      }
      
})

module.exports=mongoose.model('User',userSchema)
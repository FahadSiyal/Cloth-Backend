const mongoose=require('mongoose')

const dotenv=require('dotenv')
dotenv.config()

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true }, // <-- ✅ Required!
},{timestamps:true});

module.exports=mongoose.model('User',userSchema)
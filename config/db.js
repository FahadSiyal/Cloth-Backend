const mongoose =require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

const connectDB=async ()=>{
    try {
       await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
       console.log("Mongodb connected");
       
    } catch (error) {
        console.log('error');
      process.exit(1)
        
    }
}
module.exports=connectDB

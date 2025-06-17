const express=require('express')
const dotenv=require('dotenv')
const app=express();
const cors=require('cors')
const authRoutes=require('./routes/authRoutes')
const sellerRoutes=require('./routes/sellerAuthRoutes')
const connectDB=require('./config/db')
const productRoutes=require('./routes/productRoutes')
const orderRoutes=require('./routes/orderRoutes')
const cookieParser = require("cookie-parser");

const Order = require("./models/orderModel");
app.use(cookieParser()); // ✅ Add this before your routes
// const deleteproductRoutes = require("./routes/deleteproductRoutes")
  


app.use(cookieParser()); // ✅ Add this before your routes

connectDB()
app.use(express.static('public'));
app.use(express.json())


app.use(cors({
  origin: "http://localhost:5173", // or whatever frontend port
  credentials: true
}));

dotenv.config()

// Product Routes
app.use('/api/products',productRoutes)


app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});


// //Auth Routes
app.use('/api/auth',authRoutes)

//SellerAuth Routes
app.use('/api/seller',sellerRoutes)


// // //Order Routes
app.use('/api/order',orderRoutes)

app.use("/api/Checkout", async (req, res) => {
  const Orders = await Order.find({});
  res.json(Orders);
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});


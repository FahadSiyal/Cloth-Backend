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

app.use(cookieParser()); // ✅ Add this before your routes
const Order = require("./models/orderModel");
// const deleteproductRoutes = require("./routes/deleteproductRoutes")
  



connectDB()
app.use(express.static('public'));
app.use(express.json())


app.use(cookieParser()); // ✅ Add this before your routes
app.use(cors({
  origin:"http://localhost:5173/",
  // origin: "https://merabrandfrontend.vercel.app/", // or whatever frontend port
  // origin: "https://e-comm-wt67.vercel.app/", // or whatever frontend port
  credentials: true             // allow cookies
}));
dotenv.config()



app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Product Routes
app.use('/api/products',productRoutes)

// //Auth Routes
app.use('/api/auth',authRoutes)

//SellerAuth Routes
app.use('/api/seller',sellerRoutes)


// // //Order Routes
app.use('/api/order',orderRoutes)

// app.use("/api/contact",contactRoutes);

app.use("/api/Checkout", async (req, res) => {
  const Orders = await Order.find({});
  res.json(Orders);
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});


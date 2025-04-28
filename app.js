const express=require('express')
const dotenv=require('dotenv')
const app=express();
const cors=require('cors')
const authRoutes=require('./routes/authRoutes')
const connectDB=require('./config/db')
const productRoutes=require('./routes/productRoutes')
const orderRoutes=require('./routes/orderRoutes')
const cookieParser = require("cookie-parser");



app.use(cookieParser()); // ✅ Add this before your routes

connectDB()
app.use(express.static('public'));
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // allow Vite frontend
  credentials: true               // allow cookies / auth headers
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


// // //Order Routes
app.use('/api/order',orderRoutes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});


const express=require('express')
const dotenv=require('dotenv')
const app=express();
const cors=require('cors')
const authRoutes=require('./routes/authRoutes')
const connectDB=require('./config/db')
const productRoutes=require('./routes/productRoutes')
const orderRoutes=require('./routes/orderRoutes')
const cookieParser = require("cookie-parser");
const deleteproductRoutes = require("./routes/deleteproductRoutes")


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

app.use('/api/products/:id',deleteproductRoutes)
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
// //Auth Routes
app.use('/api/auth',authRoutes)

app.get('/api/profile',(req,res)=>{
  res.send('Profile page')
}
)
// // //Order Routes
app.use('/api/order',orderRoutes)

app.get('/',(req,res)=>{
  res.send('API is running. anf running..')
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});


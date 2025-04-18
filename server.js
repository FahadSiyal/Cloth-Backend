const express=require('express')
const dotenv=require('dotenv')
const app=express();
const cors=require('cors')
const authRoutes=require('./routes/authRoutes')
const connectDB=require('./config/db')
const productRoutes=require('./routes/productRoutes')



connectDB()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // allow Vite frontend
  credentials: true               // allow cookies / auth headers
}));
dotenv.config()

//Product Routes
app.use('/api/products',productRoutes)

//Auth Routes
app.use('/api/auth',authRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});


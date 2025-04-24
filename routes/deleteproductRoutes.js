const {deleteProduct} = require("../controllers/productController");


const express = require('express');
const router = express.Router();




router.delete("/",deleteProduct)


module.exports=router






//   const deleteProduct = asyncHandler(async (req, res) => {
//     const { id } = req.params;
  
//     const product = await Product.findById(id);
//     if (!product) {
//       res.status(404);
//       throw new Error("Product not found");
//     }
  
//     await product.remove(); // Or Product.findByIdAndDelete(id);
//     res.status(200).json({ message: "Product deleted successfully" });
//   });
  
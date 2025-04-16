const { LogoutUser,loginUser,registerUser } =require('../controllers/userController')

const express=require('express')
const router=express.Router()

router.post('/login',loginUser)
router.post('/logout',LogoutUser)
router.post('/register',registerUser)

module.exports=router;
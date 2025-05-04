const { LogoutUser,loginUser,registerUser ,findAllUsers} =require('../controllers/userController')

const express=require('express')
const router=express.Router()

router.post('/login',loginUser)
router.post('/logout',LogoutUser)
router.post('/register',registerUser)
router.get('/users',findAllUsers)

module.exports=router;
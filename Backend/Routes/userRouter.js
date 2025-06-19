const express=require('express')
const { userRegister, fetchUsers, fetchUserById, deleteUser, updateUser, userlogin, addCart, viewCart, placeOrder, deleteProduct, removeItem, userOrderview } = require('../controller/userCtrl')
const userRouter=express.Router()

userRouter.post("/register",userRegister)
userRouter.post("/login",userlogin)
userRouter.get("/getUsers",fetchUsers)
userRouter.get("/getuserbyid",fetchUserById)
userRouter.delete("/deluser",deleteUser)
userRouter.put("/update",updateUser)
userRouter.post("/addtocart",addCart)
userRouter.get('/cartitems',viewCart)
userRouter.post('/placeorder',placeOrder)
userRouter.delete('/delproduct',removeItem)
userRouter.get("/vieworder",userOrderview)


module.exports=userRouter;
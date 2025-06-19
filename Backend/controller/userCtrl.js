const usermodel=require('../model/usermodel')
const Cart=require('../model/cartmodel')
const jwt=require('jsonwebtoken')
const Order=require('../model/ordermodel')
const bcrypt=require('bcrypt')

const userRegister=async(req,res)=>{
    try{
       console.log("userRegister")
       const{fullname,email,password,address,phone}=req.body;
       const data=await usermodel.findOne({email})
       const username=await usermodel.findOne({fullname})
       if(username){
        res.json({message:"Username already exists",status:400})
       }else{
            


        if(data){
            res.json({message:"Email already exists",status:400})
        }else{
            const saltRound=10
            const salt=await bcrypt.genSalt(saltRound)
            const hashedPassword = await bcrypt.hash(password,salt)

            const user=await usermodel({
        fullname,
        email,
        password:hashedPassword,
        address,
        phone
       })
        await user.save()
       res.json({message:"User Registration successfull",status:200})
        }  
       }
    }catch(err){
        console.log(err)
    }
}

const userlogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
       if(email=="admin@gmail.com" && password=="admin123"){
            const token=jwt.sign({email,password},"jwtsecret123",{expiresIn:"1h"})
            res.json({message:"Admin Login Successfull",status:200,token:token,role:"admin"})
       }else{
         const loggedUser=await usermodel.findOne({email})
        if(loggedUser){
             const hashpassword=await bcrypt.compare(password,loggedUser.password)
            if(hashpassword){
                const gentoken=jwt.sign({id:loggedUser._id},"jwtsecret123",{expiresIn:"1h"})
                res.json({message:"Login Successfull",status:200,token:gentoken,role:"user"})
            }else{
                res.json({message:"Invalid Password",status:400})
            }
        }else{
            res.json({message:"User not found",status:400})
        }
       }
    }catch(err){
        console.log(err)
    }
}


const fetchUsers=async(req,res)=>{
    try{
       const users=await usermodel.find()
       res.json({userdetails:users})
    }catch(err){
        console.log(err)
    }
}


const fetchUserById=async(req,res)=>{
    try{
        const id=req.headers.id
        console.log(id)
        const user=await usermodel.findById(id)
        res.json({userdetails:user})
    }catch(err){
        console.log(err)
    }
}

const deleteUser=async(req,res)=>{
    try{
     const id=req.headers.id;
     await usermodel.findByIdAndDelete(id)
     res.json("User deleted Successfully")
    }catch(err){
        console.log(err)
    }
}

const updateUser=async(req,res)=>{
    try{
      const id=req.headers.id;
      const user=await usermodel.findByIdAndUpdate(id,req.body)
      user.save()
      res.json({message:"User updated successfully",status:200})
    }catch(err){
        console.log(err)
    }
}



const addCart=async(req,res)=>{
    try{
      const userId=req.headers.id
      const {productId,quantity}=req.body
      const cart=await Cart.findOne({userId:userId,status:"cart"})
      if(cart){
        const productIndex=cart.product.findIndex(pro=>pro.productId==productId)
        if(productIndex > -1){
              cart.product[productIndex].quantity+=quantity || 1
        }else{
            cart.product.push({productId,quantity})
        }
        await cart.save()
      }else{
        const cart=await Cart({
            userId,
            product:[{
                productId,
                quantity
            }]
        })
        await cart.save()
      }
      res.json("Product Added to Cart")
    }catch(err){
        console.log(err)
    }
}


const viewCart=async (req,res)=>{
    try{
        const id=req.headers.id
        const cart=await Cart.findOne({userId:id,status:'cart'}).populate('product.productId')
        
        res.json(cart)
    }catch(err){
        console.log(err)
    }
}

const placeOrder=async(req,res)=>{
    try{
     const id=req.headers.id
     console.log("userId",id)
     const {cartId,deliveryAddress,payment,totalAmount}=req.body
     const orders=await Order({
        userId:id,
        cartId,
        deliveryAddress,
        payment,
        totalAmount
     })
     await orders.save()
     const cartItems=await Cart.findOne({_id:cartId})
    
     cartItems.status="ordered"
     await cartItems.save()
     res.json("Order Placed Successfully")
    }catch(err){
        console.log(err)
    }
}

const removeItem=async(req,res)=>{
    try{
      const userId=req.headers.id
      const productId=req.headers.productid
    
      const cart=await Cart.findOne({userId:userId,status:"cart"})
     
      if(cart){
        const productIndex=cart.product.findIndex(pro=>pro.productId==productId)
        
        if(productIndex>-1){
            cart.product.splice(productIndex,1)
            await cart.save()
        }
            
      }
      
      res.json("product removed")
    }
    catch(err){
        console.log(err)
    }}


    const userOrderview=async(req,res)=>{
    try{
      const id=req.headers.id
      const order=await Order.find({userId:id}).populate({
        path:"cartId",
        populate:{
            path:"product.productId"
        }
      })
      res.json(order)
    }catch(err){
        console.log(err)
    }
}




module.exports={userRegister,fetchUsers,fetchUserById,deleteUser,updateUser,userlogin,addCart,viewCart,placeOrder,removeItem,userOrderview}


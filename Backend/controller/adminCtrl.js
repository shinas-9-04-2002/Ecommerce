const Product=require('../model/productmodel');
const User=require('../model/usermodel')
const Order=require('../model/ordermodel')

const adminaddProduct=async(req,res)=>{
    try{
        const {productName,productPrice,productDescription,productQuantity}=req.body;
        const image=req.file.filename
        const addproduct=await Product({
            productName,
            productPrice,
            productDescription,
            productQuantity,
            image
        })
        await addproduct.save()
        res.json({message:"Product added successfully",status:200})
    }catch(err){
        console.log(err)
    }
}

const countDetails=async(req,res)=>{
    try{
     const userCount=await User.countDocuments()
     const productCount=await Product.countDocuments()
     res.json({user:userCount,products:productCount})
    }catch(err){
        console.log(err)
    }
}

const fetchProduct=async(req,res)=>{
    try{
        const viewproducts=await Product.find()
        res.json(viewproducts)
    }catch(err){
        console.log(err)
    }
}

const deleteProduct=async(req,res)=>{
    try{
     const id=req.params.id;
     await Product.findByIdAndDelete(id)
     res.json("Product deleted Successfully")
    }catch(err){
        console.log(err)
    }
}

const adminOrderview=async(req,res)=>{
    try{
     
      const order=await Order.find().populate({
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

const updateOrderStatus=async(req,res)=>{
    try{
    const id=req.headers.id;
    const {status}=req.body
    const order=await Order.findOne({_id:id})
    order.status=status
    await order.save()
    res.json("Status updated successfully")
    }catch(err){
        console.log(err)
    }
}






module.exports={adminaddProduct,countDetails,fetchProduct,deleteProduct,adminOrderview,updateOrderStatus};


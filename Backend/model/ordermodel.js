const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    cartId:{type:mongoose.Schema.Types.ObjectId,
        ref:"cart_tbl"},
    deliveryAddress:{type:String},
    payment:{type:String},
    totalAmount:{type:Number},
    status:{type:String,
        default:"ordered"
    }
    },{timestamps:true})

    const Order=mongoose.model("order_tbl",orderSchema)

    module.exports=Order;
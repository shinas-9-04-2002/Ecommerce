const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    productName:{type:String},
    productPrice:{type:Number},
    productDescription:{type:String},
    productQuantity:{type:Number},
    image:{type:String}
},{timestamps:true})

const Product=mongoose.model('product_tbl',productSchema)
module.exports=Product


const express=require('express')
const { adminaddProduct, countDetails, fetchProduct, deleteProduct, adminOrderview, updateOrderStatus } = require('../controller/adminCtrl')
const multer=require('multer')
const path=require('path') 
const verifyToken  = require('../Authentication/Auth')
const adminRouter=express.Router()

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        console.log(req)
         cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage})


adminRouter.post('/addproduct',upload.single("Image"),adminaddProduct)
adminRouter.get('/countdoc',countDetails)
adminRouter.get('/fetchproduct',verifyToken,fetchProduct)
adminRouter.delete('/delproduct/:id',deleteProduct)
adminRouter.get('/fetchorder',adminOrderview)
adminRouter.put('/updatestatus',updateOrderStatus)

module.exports=adminRouter
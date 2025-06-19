const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
// middlewares
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const dbConnect=async(req,res)=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/expressconnect")
        console.log("Database connected successfully")
    }catch(err){
        console.log(err)
    }
}
dbConnect()

app.use('/uploads',express.static('uploads'))

const userRouter=require('./Routes/userRouter')
app.use("/user",userRouter)

const adminRouter=require('./Routes/adminRouter')
app.use("/admin",adminRouter)

app.listen(9000,()=>{
    console.log("Server running successfully @ http://localhost:9000")
})
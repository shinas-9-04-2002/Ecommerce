const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
  try{
    const token=req.headers.token
    if(!token){
      return res.status(400).json("No token found. Access denied")
    }
    jwt.verify(token,"jwtsecret123",(err,decoded)=>{
      if(err){
        return res.status(400).json("invalid or token expired")
      }
      next()
    })
  }

  catch(err){
    console.log(err)
  }

}

module.exports=verifyToken
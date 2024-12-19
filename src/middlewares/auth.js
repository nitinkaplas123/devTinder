const cookieParser =require('cookie-parser');
const jwt=require('jsonwebtoken');
// const {User} =require('./models/user')
const {User} =require('../models/user')

const userAuth=async(req,res,next)=>{
    try{
       //read the token from req.cookies
    const {token}=req.cookies;
    if(!token){
      throw new Error("token is not valid");
    }
  
    //verify the token 
    const decodedMessage=await jwt.verify(token,"DEV@TINDER123");
    const {_id}=decodedMessage;
    
    //find the user that exist in my database or not 
    const user=await User.findById({_id});

    if(!user){
      throw new Error("invalid user");
    }else{
      console.log("means middleware is correct working!!")
      req.user=user;
      next();
    }

  }catch(err){
    res.status(400).send(err.message);
  }
   
}

module.exports={
    userAuth,
}
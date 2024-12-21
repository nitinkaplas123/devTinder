const express=require('express');
const requestRouter=express.Router();
const {userAuth}=require('../middlewares/auth');


const {authRouter}=require('./auth');


//sending the connection request 
requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user;
    console.log("sending the connection request");
    res.send(user.firstName+" "+ "sending the connection request!!");
})


module.exports={
    requestRouter,
}



const express=require('express');
const authRouter=express.Router();
const {validationSignUpData}=require('../utils/validation')
const validator=require('validator');
const {User} =require('../models/user')

const bcrypt = require('bcrypt');


//post the data or say store the data in dataBase
authRouter.post("/signup",async(req,res)=>{
    try{
        //step1  validate the userData 
        validationSignUpData(req);
    
        //step2 encrypte the password 
        const {firstName,lastName,email,password}=req.body;
        const passwordHash=await bcrypt.hash(password,10);
        //step 3 
        const newUser=new User({
         firstName,
         lastName,
         email,
         password:passwordHash,
        });
 
        await newUser.save();
        res.send("data saved successfully!!");
    }catch(err){
     res.status(400).send("ERROR:"+err.message);
    }
 }) 
 

//login the user
authRouter.post("/login",async(req,res)=>{
    try{
     const {email,password}=req.body;

     // email is valid or not 
     if(!validator.isEmail(email)){
      throw new Error("email is not valid");
     }

     //email is present in my dB or not 
     const user=await User.findOne({email:email});
     
     if(!user){
      throw new Error("InValid Credentials!");
     }
     
     //password matching 
     const isPasswordValid=await user.validatePassword(password);

     if(isPasswordValid){

      //step1 -> create the jwt token 
      const token=await user.getJWT();

      //step2 -> create the cookie and put the jwt token inside it and give in terms of response.
      res.cookie("token",token,{ expires: new Date(Date.now()+1*3600000), httpOnly: true });

      res.send("Login Successfully");
     }else{
      throw new Error("InValid Credentials!!")
     }


    }catch(err){
      res.status(400).send(err.message);
    }
})




module.exports={
    authRouter,
}


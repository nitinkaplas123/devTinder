const express=require('express');
const app=express();
const {connectDB}=require('./config/dataBase')
const {User} =require('./models/user')
const {validationSignUpData}=require('./utils/validation')
const bcrypt = require('bcrypt');
const validator=require('validator');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const {userAuth}=require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());





//post the data or say store the data in dataBase
app.post("/signup",async(req,res)=>{
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
app.post("/login",async(req,res)=>{
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
     const isPasswordValid=await bcrypt.compare(password,user.password);
     if(isPasswordValid){

      //step1 -> create the jwt token 
      const token=await jwt.sign({_id:user._id},"DEV@TINDER123",{expiresIn:'0d'});

      //step2 -> create the cookie and put the jwt token inside it and give in terms of response.
      res.cookie("token",token,{ expires: new Date(Date.now()+10000), httpOnly: true });

      res.send("Login Successfully");
     }else{
      throw new Error("InValid Credentials!!")
     }


    }catch(err){
      res.status(400).send(err.message);
    }
})


// get the profile of user 
app.get("/profile",userAuth,async(req,res)=>{
  try{
    const user=req.user;
    res.send(user);
  }catch(err){
    res.status(400).send("Error:"+err.message);
  }
  
})

//sending the connection request 
app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  const user=req.user;
  console.log("sending the connection request");
  res.send(user.firstName+" "+ "sending the connection request!!");
})


connectDB().then(()=>{
       console.log("db connected");
       app.listen(7777,()=>{
        console.log("server is running on port 7777")
      })
}).catch((err)=>{
  console.log("something went wrong!!");
})


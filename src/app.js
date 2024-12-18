const express=require('express');
const app=express();
const {connectDB}=require('./config/dataBase')
const {User} =require('./models/user')
const {validationSignUpData}=require('./utils/validation')
const bcrypt = require('bcrypt');
const validator=require('validator');




app.use(express.json());


//get all the user by emailId 
app.get("/user",async(req,res)=>{
    const userEmail=req.body.email;
    
    try{
      const users= await User.find({email:userEmail});
      if(users.length === 0)
      res.status(404).send("user not found");
      else
      res.send(users);
    }catch(err){
      res.send("something went wrong!!");
    }
})

//get the whole userData from dataBase
app.get("/feed",async(req,res)=>{
    try{
      const users=await User.find({});
      res.send(users);
    }catch(err){
      console.log("something went wrong!!");
    }
})

//delete userData by using userId
app.delete("/user",async(req,res)=>{
      const userId=req.body.userId;

      try{
        await User.findByIdAndDelete({_id:userId});
        res.send("delete user by userId successfully!!")
      }catch(err){
        res.send("something went wrong!!");
      }
})

//update using patch method 
app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
   
    const data=req.body;

    try{
       const allowedUpdates=["skills","_id","photoUrl","gender","age","about"];

       const isUpdatedAllowed=Object.keys(data).every((k)=>
        allowedUpdates.includes(k)
       )
       if(!isUpdatedAllowed){
        throw new Error("Update not allowed!!")
       }

       await User.findByIdAndUpdate({_id:userId},data,{
        runValidators:true,
       });
     
      res.send("updated the user data by userId successfully!!")
    }catch(err){
      res.send("updation is not happen bcz of "+err.message);
    }
})


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

app.post("/login",async(req,res)=>{
    try{
      const {email,password}=req.body;

      //validate email 
      if(!validator.isEmail(email)){
        throw new Error("pls enter the valid emailId");
       }

       // check email is present in my database or not 
       const user=await User.findOne({email:email});
      
       if(!user){
        throw new Error("InValid Credentials!!")
       }
       
       const isPasswordValid=await bcrypt.compare(password,user.password);
       if(!isPasswordValid){
        throw new Error("InValid Credentials!!")
       }
       else{
        res.send("Login Successfully!!")
       }

    }catch(err){
      res.status(400).send("ERROR:"+err.message);
     }
})

connectDB().then(()=>{
       console.log("db connected");
       app.listen(7777,()=>{
        console.log("server is running on port 7777")
      })
}).catch((err)=>{
  console.log("something went wrong!!");
})


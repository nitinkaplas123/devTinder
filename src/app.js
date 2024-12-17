const express=require('express');
const app=express();
const {connectDB}=require('./config/dataBase')
const {User} =require('./models/user')

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
app.patch("/user/:userId/:rollNo",async(req,res)=>{
    const userId=req.params?.userId;
    console.log(userId);
    console.log("roll no :"+ req.params.rollNo);
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
   console.log(req.body);
   const newUser=new User(req.body);
   try{
       await newUser.save();
       res.send("data saved successfully!!");
   }catch(err){
    res.status(400).send("error is:"+err.message);
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


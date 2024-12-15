const express=require('express');
const app=express();
const {connectDB}=require('./config/dataBase')
const {User} =require('./models/user')

app.use(express.json());

app.post("/signup",async(req,res)=>{
   console.log(req.body);
   const newUser=new User(req.body);
   try{
       await newUser.save();
       res.send("data saved successfully!!");
   }catch(err){
    res.send("something went wrong!!");
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


const express=require('express');
const app=express();
const {connectDB}=require('./config/dataBase')

const cookieParser=require('cookie-parser');



app.use(express.json());
app.use(cookieParser());


const {authRouter}=require('./Routes/auth');
const {profileRouter}=require('./Routes/profile');
const {requestRouter}=require('./Routes/request');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


connectDB().then(()=>{
       console.log("db connected");
       app.listen(7777,()=>{
        console.log("server is running on port 7777")
      })
}).catch((err)=>{
  console.log("something went wrong!!");
})





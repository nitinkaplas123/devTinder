const express=require("express");
const app=express();

app.use("/ok",(req,res)=>{
    res.send("Hi i am from server team...")
})


app.get("/about",(req,res)=>{
    res.send("Hi i am from about page!!!")
})

app.get("/home",(req,res)=>{
    res.send("Hi i am from home page!!!")
})

app.listen(3000,()=>{
    console.log("We are listening at port 3000...")
})


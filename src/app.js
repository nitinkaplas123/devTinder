const express=require("express");
const app=express();


app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({firstName:"Nitin",lastName:"Kaplas"});
})


app.post("/user",(req,res)=>{
    res.send("data saved successfully to the db!!")
})

app.delete("/user",(req,res)=>{
    res.send("data deleted successfully!!")
})

app.listen(3000,()=>{
    console.log("server is running at 3000");
})
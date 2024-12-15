const adminAuth=(req,res,next)=>{
    console.log("we are in admin middleware")
    const token="abc";
    const isAuthorized= token==="abc";
    if(!isAuthorized){
     res.status(401).send("you are not admin");
    }
    else{
      console.log("adminAuth file")
      next();
    }
}
const userAuth=(req,res,next)=>{
    console.log("we are in admin middleware")
    const token="abc";
    const isAuthorized= token==="abc";
    if(!isAuthorized){
     res.status(401).send("you are not admin");
    }
    else{
      console.log("adminAuth file")
      next();
    }
}

module.exports={
    adminAuth,
    userAuth
}
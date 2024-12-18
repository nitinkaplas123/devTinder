const validator=require('validator');

const validationSignUpData=(req)=>{
   const {firstName,lastName,email,password}=req.body;
   
   console.log("firstName: "+firstName);
   console.log("lastName: "+lastName)
   if(!firstName || !lastName){
    throw new Error("pls enter the valid name");
   }
   else if(!validator.isEmail(email)){
    throw new Error("pls enter the valid emailId");
   }else if(!validator.isStrongPassword(password)){
    throw new Error("pls enter the strong password");
   }
}

module.exports={
    validationSignUpData,
}


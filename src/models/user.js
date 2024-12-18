const mongoose=require('mongoose');
const validator=require("validator");

const userSchema=mongoose.Schema({
      firstName:{
        type:String,
        minLength:4,
        maxLength:50,
        required:true,
      },
      lastName:{
        type:String,
      },
      email:{
        type:String,
        required:true,
        lowercase:true,
        validate(value){
          if(!validator.isEmail(value)){
            throw new Error("invalid email address "+value);
          }
        }
      },
      password:{
        type:String,
        required:true,
        validate(value){
          if(!validator.isStrongPassword(value)){
            throw new Error("Pls enter a strong password!!")
          }
        }
      },
      age:{
        min:18,
        type:Number
      },
      gender:{
        type:String,
        validate(value){
          if(!["male","female","others"].includes(value)){
            throw new Error("This is not a valid gender!")
          }
        },
        lowercase:true,
      },
      photoUrl:{
        type:String,
        default:"https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
        validate(value){
          if(!validator.isURL(value)){
            throw new Error("invalid URL "+value);
          }
        }
      },
      about:{
        type:String,
        default:"This is default value for about field"
      },
      skills:{
        type:[String],
        validate(value){
          if(value.length>5)
          throw new Error("you have max limit of 5 skills pls remove till 5!!")

        }

      }
},{timestamps:true})

userSchema.path('email').validate(async function(value){
  const count = await this.model('User').countDocuments({ email: value });
  return count === 0;  // If count is greater than 0, it means the email exists.
}, 'Email already exists');


const User=mongoose.model("User",userSchema);

module.exports={
   User,
}
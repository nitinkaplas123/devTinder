const mongoose=require('mongoose');

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
      },
      password:{
        type:String,
        required:true,
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
      },
      about:{
        type:String,
        default:"This is default value for about field"
      },
      skills:{
        type:[String],
      }
},{timestamps:true},{collections:"user"})

userSchema.path('email').validate(async function(value){
  const count = await this.model('User').countDocuments({ email: value });
  return count === 0;  // If count is greater than 0, it means the email exists.
}, 'Email already exists');


const User=mongoose.model("User",userSchema);

module.exports={
   User,
}
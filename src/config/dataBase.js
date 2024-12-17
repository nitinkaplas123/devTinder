const mongoose=require('mongoose');
const connectDB=async()=>{
   await  mongoose.connect(
      // 'mongodb+srv://nitinkap90643:Mt4D4oLKsAxxb1p3@cluster0.nbb7a.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0'
      'mongodb+srv://nitinkap90643:Mt4D4oLKsAxxb1p3@cluster0.nbb7a.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0'
    )
}


module.exports={
   connectDB,
}



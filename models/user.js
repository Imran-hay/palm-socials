var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
   
    username:String,
    password:String,
  

    
})

//const User = mongoose.model("User",userSchema) //Token is collection name and will be saved as a plural


module.exports = mongoose.models.User || mongoose.model("User", userSchema);
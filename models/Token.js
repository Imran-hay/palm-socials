
var mongoose = require('mongoose')

var tokenSchema = new mongoose.Schema({
   
    PALM_INSTAGRAM_ID:String,
    PALM_FB_ID:String,
    TELEGRAM_TOKEN:String,
    TELEGRAM_CHANNEL:String,
    TOKEN_PALM:String,
    PAGETOKEN_PALM:String,
    YTOKEN:String,
   YREFRESH:String,
   ID:String,
   SECRET:String,
    CHANNEL:String,
    DROPBOX_TOKEN:String,
    DROPBOX_REFRESH_TOKEN:String,
    DROPBOX_KEY:String,
    DROPBOX_SECRET:String

    
},{strict:false})




//const Token = mongoose.model.Token || mongoose.model("Token",tokenSchema)

//var Token = mongoose.model("Token",tokenSchema)

 



//module.exports= Token
module.exports = mongoose.models.Token || mongoose.model("Token", tokenSchema);
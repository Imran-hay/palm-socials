var mongoose = require('mongoose')

var updateSchema = new mongoose.Schema({
   
    update_id:String,
    channel_post:Object,
  

    
})




module.exports = mongoose.models.Update || mongoose.model("Update", updateSchema);
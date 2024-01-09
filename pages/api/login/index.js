const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const User = require('../../../models/user')
const handler = async(req,res) =>
{
    try{

      await mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0.gpom6d9.mongodb.net/${process.env.MONGODB}?retryWrites=true&w=majority`)
        console.log("connected")
        const data  = await User.find()
       // console.log(data)

        res.status(200).json(data)



      }
    
      catch(e)
      {
        res.status(500).json({"message":"error"})
      }
    
  
}

export default handler
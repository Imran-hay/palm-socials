const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const Token = require('../../../models/Token')
const handler = async(req,res) =>
{
    try{

      await mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0.gpom6d9.mongodb.net/${process.env.MONGODB}?retryWrites=true&w=majority`)
        console.log("connected")
        const data  = await Token.find()
       // console.log(data)

        res.status(200).json(data)

        //console.log(process.env.MONGOUSER)
        //console.log(process.env.MONGOPASS)
        //console.log(process.env.MONGODB)



      }
    
      catch(e)
      {
        res.status(500).json({"message":"error"})
      }
    
  
}

export default handler
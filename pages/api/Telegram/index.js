const {Api, TelegramClient} = require('telegram');
const {StringSession} = require('telegram/sessions');
const fs = require('fs');
const cors = require('cors')
const handler = async(req,res) =>
{
    //const apiId = 24122795
    const apiId = process.env.ID

//const apiHash = '6d4ab6afa68b3ef40b6a42d15d8d72a0'
const apiHash = process.env.HASH

const session = new StringSession(process.env.SESSION);
 

//const session = new StringSession('1BAAOMTQ5LjE1NC4xNjcuOTEAULVKmHG/eo9Q++jr+5hOXAkInbzxTUxcjIACxPRptY8t/xu1/NoKC6OMwsrPMiFj+JbSTM59mguWCj3Xkods0F1lZWHvnlr5mXH9deGXIKKBxDsuAcFSk+Txm2G3xYBmWy5d4LrVaqHJy4xQCHO746PWoX2ZUlerpJ8G1TvXNJChqClu3vHcc9E95wEqCzpWtn22b1G2T4FtaWv5b7zDx303HyhSngezL2SOb0ZeTLRul1rGWODFayx8a8MVgovzT+6Pbxq9o2A4fUKRPumPeDXZSR14lLfHPGKTPvjXZs+pGJQ9rBA8ioEq+G5Bq4V0LqZX5N2KWhtRS4+LtvahmtU=');
const client = new TelegramClient(session, apiId, apiHash, {});

    try{
      cors()
      await client.connect()
      const result = await client.invoke(new Api.stats.GetBroadcastStats({
  
          channel:"-1001790967767"
         
  
          }));
         // console.log(result);

        // const jsonResult = JSON.stringify(result, null, 2);

    

        res.status(200).json(result)


        client.disconnect()
        



      }
    
      catch(e)
      {
        res.status(500).json({"message":"error"})
      }
    
  
}

export default handler
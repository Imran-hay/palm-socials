"use client"
import React, { useState } from "react";
//import { tewa } from '../../home/page';
import Heade from "@/app/Components/Header";
import Nav from "@/app/Components/Nav";
import isAuth from "@/app/Components/Auth";

interface token{
  PALM_INSTAGRAM_ID:string,
  PALM_FB_ID:string,
  TELEGRAM_TOKEN:string,
  TELEGRAM_CHANNEL:string,
  TOKEN_PALM:string,
  PAGETOKEN_PALM:string,
  YTOKEN:string,
 YREFRESH:string,
 ID:string,
 SECRET:string,
  CHANNEL:string,
  DROPBOX_TOKEN:string,
  DROPBOX_REFRESH_TOKEN:string,
  DROPBOX_KEY:string,
  DROPBOX_SECRET:string


}
var tewa:token = {
    PALM_INSTAGRAM_ID:"",
  PALM_FB_ID:"",
  TELEGRAM_TOKEN:"",
  TELEGRAM_CHANNEL:"",
  TOKEN_PALM:"",
  PAGETOKEN_PALM:"",
  YTOKEN:"",
 YREFRESH:"",
 ID:"",
 SECRET:"",
  CHANNEL:"",
  DROPBOX_TOKEN:"",
  DROPBOX_REFRESH_TOKEN:"",
  DROPBOX_KEY:"",
  DROPBOX_SECRET:""

}


//const base_url = `https://api.telegram.org/file/bot${tewa.TELEGRAM_TOKEN}/`
const paths = []
const ids:any =[]
const urls:any =[]

interface DisplayImageProps {
    Uri: string;
  }

const Display_Image = ({ Uri }: DisplayImageProps) => {
    return (
      <div style={{  margin:"30px",alignItems:"center",marginLeft:"15vw" }}>
        <img src={Uri} style={{height:"500px",width:"600px",marginLeft:"7vw",borderRadius:10}}  alt="img" />
      </div>
    );
  };

const Telegram = () =>
{
    const [URL,setURL] = React.useState([])
    const [tokens,setTokens] = React.useState(tewa)
    const fetchToken = async() =>{

      const res = await fetch("/api/token")
    
      const data:any = await res.json()
    
      //tokens = data[0]
      setTokens(data[0])
      //console.log(data[0])
    
     
     
    
      
    
      
    
      
    
      
    
    
    
    
    
    }

 

    React.useEffect(()=>{
        const fetchData = async() =>{
            const base_url = `https://api.telegram.org/file/bot${tokens.TELEGRAM_TOKEN}/`
           // alert(base_url)
           if(tokens.TELEGRAM_TOKEN !== '')
           {

          
            try{
                const r =await  fetch(`https://api.telegram.org/bot${tokens.TELEGRAM_TOKEN}/getChat?chat_id=@palm_realestate`)
                if(r.ok)
                {
                    const response = await r.json()
                   // console.log(response.result.photo)
                   // ids.push(response.result.photo.big_file_unique_id)
                    ids.push(response.result.photo.big_file_id)
                   // ids.push(response.result.photo.small_file_unique_id)
                   // ids.push(response.result.photo.small_file_id)
    
                    for(let i = 0 ; i < ids.length;i++)
                    {
                        const r2 = await fetch(`https://api.telegram.org/bot${tokens.TELEGRAM_TOKEN}/getFile?chat_id=@palm_realestate&file_id=${ids[i]}`)
                        if(r2.ok)
                        {
                            const response2 = await r2.json()
                           // console.log(response2)
                            paths.push(response2.result.file_path)
                            //alert(response2.result.file_path)
    
                            urls.push(base_url+response2.result.file_path)
                            //alert(urls[i])
    
                        }
                    }
    
                    setURL(urls)
    
    
                }
                setURL(urls)
    
            }
            catch(e)
            {
                console.log(e)
            }
            setURL(urls)

        }
        
        }
        fetchData()
    },[tokens])

    React.useEffect(
        ()=>{
         // if(tewa.PALM_FB_ID === '')
         // {
            fetchToken()
         // }
    
        }
      ,[])


    return(
        <div>
            <Heade/>
           
        <div>
            <h1 className="text-4xl text-center text-cyan-500">Telegram Posts</h1>
      
        

        <div>
       
      <div><Display_Image Uri={URL[0]}/></div>
      
  
        </div>

      
      
     
      
   

        </div>
        <Nav/>
        </div>


    )
}

export default isAuth(Telegram)
"use client"
import React, { useState } from "react";
//import { tewa } from '../../home/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { Activity2 } from "@/app/Components/Activity";
import Heade from "@/app/Components/Header";
import Nav from "@/app/Components/Nav";
import isAuth from "@/app/Components/Auth";

const tewa:any = {}





interface face{
    attachments:any
    id:string,
    likes:any,
    comments:any


}

const x:face[]= [
    {
        attachments:[],
        id:"",
        likes:[],
        comments:[]
        
    }
]




interface DisplayIdProps {
    Id: string;
    url: string;
  }

  interface LikesCommentsComponentProps {
    likes: string;
    comments: string;
  }

  const Display_Id: React.FC<DisplayIdProps> = ({ Id, url }) => {
    return (
      <div className="text-center mx-auto w-3/4 mt-8">
        <p className="text-2xl">
          <span className="text-blue-500">Post-ID: </span>
          <span className="text-blue-600 text-left w-full">{Id}</span>
        </p>
        <p className="text-2xl mt-4">
          <span className="text-blue-500">URL: </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            Click Here
          </a>
        </p>
      </div>
    );
  };
  const LikesCommentsComponent: React.FC<LikesCommentsComponentProps> = ({ likes, comments }) => {
    return (
      <div className="flex justify-center items-center">
        <div className="flex items-center mr-4">
          <FontAwesomeIcon icon={faHeart} className="text-red-500 mr-1" />
          <span className="text-red-500">{likes}</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faComment} className="text-blue-500 mr-1" />
          <span className="text-blue-500">{comments}</span>
        </div>
      </div>
    );
  };
 

const Facebook = () =>
{
    const [Loading,setLoading] = useState(true)
    const [Facebook,setFacebook] = useState(x)
    const [tokens,setTokens] = React.useState(tewa)
    const fetchToken = async() =>{

      const res = await fetch("/api/token")
    
      const data:any = await res.json()
    
      //tokens = data[0]
      setTokens(data[0])
      //console.log(data[0])
    
     
     
    
      
    
      
    
      
    
      
    
    
    
    
    
    }

   
 

  React.useEffect(
    ()=>{
      const get_Data = async() =>{
        try{
            const r = await fetch(`https://graph.facebook.com/v12.0/${tokens.PALM_FB_ID}/published_posts?fields=attachments{media_type,id,url},likes.summary(true),comments.summary(true)&access_token=${tokens.PAGETOKEN_PALM}`)
            const response = await r.json()
            setFacebook(response.data)
           // console.log(response.data)
  
        }
       catch(e)
       {
        console.log(e)
       
       }
       finally{
        setLoading(false)
       }
  
  
    }
      get_Data()

    }

  ,[tokens])

  React.useEffect(
    ()=>{
     // if(tewa.PALM_FB_ID === '')
      //{
        fetchToken()
     // }

    }
  ,[])

    
     
 
  

    return(
      <div className="mb-40">
     
        <div>
          <Heade/>
        {Loading ? (
          <Activity2/>
        ) : (
          <>
            {Facebook && Facebook.length > 0 && (
              <>
             
            
                <h1 className="text-4xl text-center text-cyan-700">Facebook Posted Media</h1>
                {Facebook.map((item) => {
                  if (item.attachments.data[0].media_type === "photo" || item.attachments.data[0].media_type === "album") {
                    return (
                      <div key={item.id}>
                        <Display_Id Id={item.id} url={item.attachments.data[0].url} />
                        <LikesCommentsComponent
                          likes={item.likes.summary.total_count}
                          comments={item.comments.summary.total_count}
                        />
                      </div>
                    );
                  } else if (item.attachments.data[0].media_type === "video") {
                    return (
                      <div key={item.id}>
                      <Display_Id Id={item.id} url={item.attachments.data[0].url} />
                        <LikesCommentsComponent
                          likes={item.likes.summary.total_count}
                          comments={item.comments.summary.total_count}
                        />
                      </div>
                    );
                  } else {
                    return null; // Handle other media types if needed
                  }
                })}
              </>
            )}
          </>
        )}
     
      </div>
      <Nav/>
      </div>


    )
}

export default isAuth(Facebook)
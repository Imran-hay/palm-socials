"use client"
import React, { useState } from "react";
//import { tewa } from '../../home/page';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { Activity } from "@/app/Components/Activity";
import Heade from "@/app/Components/Header";
import Nav from "@/app/Components/Nav";
import isAuth from "@/app/Components/Auth";


interface DisplayImageProps {
    Uri: string;
  }
  interface DisplayVideoProps {
    Uri: string;
  }
  interface LikesCommentsComponentProps {
    likes: string;
    comments: string;
  }
  const Display_Video = ({Uri}: DisplayVideoProps) => {
    return (
      <div>
        <ReactPlayer
          url={Uri}
          controls
          width="100%"
          height="auto"
        />
      </div>
    );
  };

  const Display_Image = ({ Uri }: DisplayImageProps) => {
    return (
      <div style={{ margin: "30px", display: "flex", justifyContent: "center" }}>
        <img src={Uri} style={{ width: "700px", height: "600px", objectFit: "cover",borderRadius:10 }} alt="img" />
      </div>
    );
  };


  const LikesCommentsComponent: React.FC<LikesCommentsComponentProps> = ({ likes, comments }) => {
    return (
      <div className="flex justify-center items-center">
        <div className="flex items-center mr-4">
          <FontAwesomeIcon icon={faHeart} className="text-red-500 mr-1" />
          <span className="text-red-500 text-xl">{likes}</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faComment} className="text-blue-500 mr-1" />
          <span className="text-blue-500 text-xl">{comments}</span>
        </div>
      </div>
    );
  };

  interface Insta{
    id:string,
    media_type:string,
    media_url:string,
    like_count:string,
    comments_count:string


  }

  const x:Insta[]=[ {
    id:"",
    media_type:"",
    media_url:"",
    like_count:"",
    comments_count:""
    

  }
]
const tewa:any = null
const Instagram = () =>
{
    const [Loading,setLoading] = useState(true)
    const [Instagram,setInstagram] = useState(x)
    const [tokens,setTokens] = React.useState(tewa)
   // const tokens = tewa
   const fetchToken = async() =>{

    const res = await fetch("/api/token")
  
    const data:any = await res.json()
  
    //tokens = data[0]
    setTokens(data[0])
   // console.log(data[0])
  
   
   
  
    
  
    
  
    
  
    
  
  
  
  
  
  }

    
 
    React.useEffect(
        () =>{
            const get_Data = async() =>{
                try{
                    const r = await fetch(`https://graph.facebook.com/v12.0/${tokens.PALM_INSTAGRAM_ID}?fields=business_discovery.username(palm.real_estate){media{id,comments_count,like_count,media_url,permalink,media_type}}&access_token=${tokens.TOKEN_PALM}`)
                    const response = await r.json()
                    setInstagram(response.business_discovery.media.data)
                   // console.log(response.business_discovery.media.data)
                      //Alert.alert(response.business_discovery.media.data)
        
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
       
      
        
         
        },[tokens]
     )
     React.useEffect(
      ()=>{
        //if(tewa.PALM_FB_ID === '')
        //{
          fetchToken()
       // }
  
      }
    ,[])
     if (Loading) {
        
        return <><Heade/><Activity/></>;
       
      } else if (Instagram && Instagram.length > 0) {
        return (
            
          <div>
            <Heade/>
          
            <h1 className="text-4xl text-red-600 text-center ">Instagram Posted Media</h1>
            {Instagram.map((item) => {
              if (item.media_type === "IMAGE" ||item.media_type ==="CAROUSEL_ALBUM") {
                return (
                  <div key={item.id}>
                    <Display_Image Uri={item.media_url} />
                    <LikesCommentsComponent likes={item.like_count} comments={item.comments_count} />
                  </div>
                );
              } else if (item.media_type === "VIDEO") {
                return (
                    
                  <div key={item.id}>
                    
                    <Display_Video Uri={item.media_url} />
                    <LikesCommentsComponent likes={item.like_count} comments={item.comments_count} />
                  </div>
                );
              } else {
                return null; // Handle other media types if needed
              }
            })}
            <Nav/>
          </div>
        );
      } else {
        
        
        return <p className="text-2xl text-center text-red-600">No Instagram data available.</p>;
      }
}

export default isAuth(Instagram)
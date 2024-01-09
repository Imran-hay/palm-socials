"use client"
import React, { useState } from "react";
//import { tewa } from '../../home/page';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEye, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Activity } from "@/app/Components/Activity";
import Heade from "@/app/Components/Header";
import Nav from "@/app/Components/Nav";
import isAuth from "@/app/Components/Auth";


let fetchCount = 0;

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

var Data = []
var Data2:any = []
var Ids:any = []
var Id = ""

interface DisplayVideoProps {
    Uri: string;
  }
  interface LikesCommentsComponentProps {
    likes: string;
    comments: string;
    views:string
    saved:string
  }
 

const Display_Video = ({Uri}: DisplayVideoProps) => {
    return (
      <div className="m-7">
        <ReactPlayer
          url={Uri}
          controls
          width="100%"
          height={400}
        />
      </div>
    );
  };

  const LikesCommentsComponent: React.FC<LikesCommentsComponentProps> = ({ likes, comments, views, saved }) => {
    return (
      <div className="flex justify-center items-center">
        <div className="flex items-center mr-8">
          <FontAwesomeIcon icon={faHeart} className="text-red-500 mr-1" />
          <span className="text-red-500">{likes}</span>
        </div>
        <div className="flex items-center mr-8">
          <FontAwesomeIcon icon={faComment} className="text-blue-500 mr-1" />
          <span className="text-blue-500">{comments}</span>
        </div>
        <div className="flex items-center mr-8">
          <FontAwesomeIcon icon={faEye} className="text-green-500 mr-1" />
          <span className="text-green-500">{views}</span>
        </div>
        {saved && (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBookmark} className="text-purple-500 mr-1" />
            <span className="text-purple-500">{saved}</span>
          </div>
        )}
      </div>
    );
  };

  var ytoken = ""


const Youtube = () =>
{
    const [Loading,setLoading] = useState(true)
    const [tokens,setTokens] = React.useState(tewa)
    //const tokens = tewa
    
  
  
      const resetData = ()=>{
        Data2 = [];
        Data2 = [];
        Ids = [];
        Id = ""
  
      }
      const fetchToken = async() =>{

        const res = await fetch("/api/token")
      
        const data:any = await res.json()
      
        //tokens = data[0]
        setTokens(data[0])
        //console.log(data[0])
      
       
       
      
        
      
        
      
        
      
        
      
      
      
      
      
      }
      React.useEffect(
        ()=>{
         // if(tewa.PALM_FB_ID === '')
         // {
            fetchToken()
         // }
    
        }
      ,[])
  
    
      React.useEffect(
          () =>{
            resetData()
            const get_Data = async () => {
              try {
                const value2 = await localStorage.getItem("Youtube");
                if (value2 !== null) {
                  ytoken = value2;
                } else {
                  if (ytoken) {
                    await localStorage.setItem("Youtube", ytoken);
                  } else {
                    console.log("Invalid ytoken value. Cannot set AsyncStorage.");
                  }
                }
              } catch (error) {
                console.log("Failed to retrieve data:", error);
              }
              try {
                const r = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&forMine=false&type=video&channelId=${tokens.CHANNEL}&maxResults=50`, {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${ytoken}`,
                    'Content-Type': 'application/json',
                  },
                });
          
                if (r.ok && r.status === 200) {
                  const response = await r.json();
                  Data = response.items;
                  //console.log(response.items);
            
                  Data.forEach((item:any) => {
                    const videoId = item.id.videoId;
                    Ids.push(videoId);
                  });
            
                  Ids.forEach((item:any) => {
                    Id += item;
                    Id += ',';
                  });
            
                  //alert(Id);
            
                  try {
                    const r2 = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${Id}`, {
                      method: 'GET',
                      headers: {
                        Authorization: `Bearer ${ytoken}`,
                        'Content-Type': 'application/json',
                      },
                    });
            
                    const response2 = await r2.json();
                  //  console.log(response2);
                    Data2 = response2.items;
                  } catch (e) {
                    console.error(e);
                  }
                } else {
                  try {
                    const response = await fetch('https://oauth2.googleapis.com/token', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        client_id: tokens.ID,
                        client_secret: tokens.SECRET,
                        grant_type: 'refresh_token',
                        refresh_token: tokens.YREFRESH,
                      }),
                    });
            
                    const token = await response.json();
            
                  //  console.log(token.access_token);
                    //ytoken = token.access_token;
                    await localStorage.setItem("Youtube", token.access_token);
                    if (fetchCount < 2) {
                      // Your logic for fetching YouTube data goes here
                  
                      // Increment the fetchCount
                      fetchCount++;
                  
                      // Call fetchYoutube again
                      await get_Data();
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }
              } catch (e) {
                console.log(e);
              } finally {
                setLoading(false);
              }
            };
           get_Data()
          
         
        
          
           
          },[tokens]
       )
     
  
       if (Loading) {
          return <><Heade/><Activity/></>;
        } else if (Data2 &&Data2.length > 0) {
          return (
              
          
              <div>
                <Heade/>
                
              <h1 className="text-4xl text-center text-red-800">YouTube Posted Media</h1>
              {Data2.map((item:any) => {
               
                 
                 
               
                  
                 
                  return (
                    <div key={item.id}>
                         <Display_Video Uri={`https://www.youtube.com/watch?v=${item.id}`}/>
                         
                         
              
                    
  
                      <LikesCommentsComponent likes={item.statistics.likeCount} comments={item.statistics.commentCount} views={item.statistics.viewCount} saved={item.statistics.favoriteCount}  />
                    </div>
                  );
                  
                
                } 
              )}
              <Nav/>
              </div>
          
          );
        } else {
          return <h1 className="text-4xl text-center text-red-800">No Youtube data available.</h1>;
        }


   
}

export default isAuth(Youtube)
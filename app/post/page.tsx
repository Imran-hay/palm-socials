"use client"
import React, { useState,createContext, useContext } from 'react';
//import { useTokenContext } from '../home/page';
import Nav from '../Components/Nav';
//import { TokenContext } from '../home/page';
//import { tewa } from '../home/page';
import { Activity,Activity2,Activity3 } from '../Components/Activity';
import Heade from '../Components/Header';
import isAuth from '../Components/Auth';

//const tewa:any = {}

var file_url = ""


let fetchCount = 0;
let uploadCount = 0;
var upload_status = ""
var fb_status = ""
var instagram_status = ""
var telegram_status = ""
var youtube_status = ""



var dropbox_token:string = ""
interface token{
  PALM_INSTAGRAM_ID:String,
  PALM_FB_ID:String,
  TELEGRAM_TOKEN:String,
  TELEGRAM_CHANNEL:String,
  TOKEN_PALM:String,
  PAGETOKEN_PALM:String,

  YTOKEN:string,
 YREFRESH:String,
 ID:String,
 SECRET:String,
  CHANNEL:String,
  DROPBOX_TOKEN:String,
  DROPBOX_REFRESH_TOKEN:String,
  DROPBOX_KEY:String,
  DROPBOX_SECRET:String


}
var tokens:token = {
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
var ytoken = tokens.YTOKEN

const fetchToken = async() =>{

  const res = await fetch("/api/token")

  const data:token[] = await res.json()

  tokens = data[0]
 // console.log(data[0])

 
 

  

  

  

  





}



const Post = () => {
    const [socialMedia, setSocialMedia] = useState([
        { name: 'Facebook', color: '#3b5998', checked: false },
        { name: 'Instagram', color: '#C13584', checked: false },
        { name: 'YouTube', color: '#FF0000', checked: false },
        { name: 'Telegram', color: '#0088cc', checked: false },
      ]);

      //const [tokens,setTokens] = useState({})

     // if(tewa.DROPBOX_KEY !== '')
     //// {
        //tokens = tewa

     // }


       
     dropbox_token = ""
      const [Clicked,setClicked] = useState(true)
      const [uploadStatus, setUploadStatus] = useState("");
    
      const [Loading,setLoading] = useState(true)
    
      const [Loading2,setLoading2] = useState(true)
      const [Loading3,setLoading3] = useState(true)
      const [Loading4,setLoading4] = useState(true)
      const [Loading5,setLoading5] = useState(true)
    
      const [selectedInputs, setSelectedInputs] = useState<string[]>([]);
      const [caption,setCaption] =useState("")
      const [uploadedFile, setUploadedFile] = useState<{
        binaryForm: string | ArrayBuffer | null | undefined|Blob|BlobPart;
    
        name: string;
        type:string;
        // Add any other relevant information here
      }>({
        binaryForm: undefined,
      
        name: '',
        type:""
        // Initialize other relevant information here
      });

      const emptyfile = {
        binaryForm: undefined,
      
        name: '',
        type:""
        
      }
    
      const handleCheckboxToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        if (event.target.checked) {
          setSelectedInputs((prevSelectedInputs) => [...prevSelectedInputs, inputName]);
        } else {
          setSelectedInputs((prevSelectedInputs) =>
            prevSelectedInputs.filter((input) => input !== inputName)
          );
        }
      };
      const renderInputForm = () => {
        if (selectedInputs.includes('Telegram') || selectedInputs.includes('Facebook') || selectedInputs.includes('Instagram')) {
          return (
            <div>
              <h2 className='text-2xl text-cyan-700 text-center m-10'>Write a caption for the post</h2>
              <input
  type="text"
  placeholder="Type here"
  className="input input-bordered input-info w-full max-w-lg mx-auto "
  value={caption}
  style={{marginLeft:"30vw", marginTop:"10px", marginBottom:"20px"}}
  onChange={(e)=>setCaption(e.target.value)}
/>
              {/* Your input form JSX goes here */}
            </div>
          );
        }
        return null;
      };

      const handleReload = ()=>{
        setUploadedFile(emptyfile)
    setUploadStatus("")
    setClicked(true)
    setLoading(true)
    setLoading2(true)
    setLoading3(true)
    setLoading4(true)
    setLoading5(true)
    setCaption("")
    setSelectedInputs([])
    fb_status = ""
    instagram_status = ''
    youtube_status = ""
    telegram_status = ""
    upload_status = ''



    
    
        


          
        
          
      }
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
      
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const binaryForm = e.target?.result;
           
      
            setUploadedFile({
              binaryForm:binaryForm,
              name: file.name,
              type: file.type,
              // Set other relevant information here
            });
          };
          reader.readAsArrayBuffer(file);
        }
      };
      const handleUpload = async () => {
        if (!uploadedFile) {
          return;
        }
    
        setClicked(false)
    
          try {
        const value = await localStorage.getItem("Dropbox");
        if (value !== null) {
          dropbox_token = value
        } else {
           await localStorage.setItem("Dropbox", dropbox_token);
         
        }
      } catch (error) {
        console.log('Failed to retrieve data:', error);
      }
       //localStorage.setItem("Dropbox", dropbox_token);
       
    
        var meta_url = ""
        var sharedLink = ""
        var dropbox = ""
        const uploadUrl = 'https://content.dropboxapi.com/2/files/upload';
        const path = `/Palm/${uploadedFile.name}`
        const headers = {
          'Content-Type': 'application/octet-stream',
          'Authorization': `Bearer ${dropbox_token}`, // Replace with your Dropbox access token
          'Dropbox-API-Arg': JSON.stringify({
            path: `${path}`, // Replace with the desired destination path and filename
            mode: 'add',
            autorename: true,
            mute: false,
          }),
        };
      
        try {
          const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: headers,
            body: uploadedFile.binaryForm,
          });
      
          if (response.ok) {
            const responseData = await response.json();
            console.log('File uploaded successfully:', responseData);
            try{
                const metadataUrl = 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings';
    
                const metadataHeaders = {
                  'Authorization': `Bearer ${dropbox_token}`,
                  'Content-Type': 'application/json',
                };
                const metadataData = {
                  path: path,
                  settings: {
                    requested_visibility: { '.tag': 'public' },
                  },
                };
              
                const metadataResponse = await fetch(metadataUrl, {
                  method: 'POST',
                  headers: metadataHeaders,
                  body: JSON.stringify(metadataData),
                });
                const metadata = await metadataResponse.json();
                 sharedLink = metadata.url;
                file_url = sharedLink
                meta_url = sharedLink.replace("https://www.dropbox.com/","https://dl.dropboxusercontent.com/")
              
                console.log('Shared Link:', sharedLink);
                console.log('meta Link:', meta_url);

                if(selectedInputs.includes('Facebook'))
                {
                  
                  
                  
                  handleFacebook(meta_url)
                }

                if(selectedInputs.includes('Telegram'))
                {
                  
                  
                  
                  handlePostToTelegram(meta_url)
                }

                if(selectedInputs.includes('Instagram'))
                {
                  
                  
                  
                  handlePostToInstagram(meta_url)
                }

                if(selectedInputs.includes('Youtube'))
                {
                  
                  
                  
                  handleYoutube()
                }
    
              
    
            }
    
            catch (error) {
  if (error instanceof Error) {
    console.error('Error selecting file:', error);
    console.log('Error details:', error.message); // Log error message
    console.log('Error stack:', error.stack); // Log error stack trace
    // You can access other properties of the error object as needed
  } else {
    console.error('Error selecting file:', error);
  }
}
            setUploadStatus('File Saved');
            setLoading(false)
            upload_status="Successfully Uploaded to server"
    
          } else {
            console.error('Trying again:', response.statusText);
           // setUploadStatus('Uploading');
           // upload_status="Uploading"
    
            const TokenRequest = await fetch(`https://api.dropbox.com/oauth2/token?grant_type=refresh_token&refresh_token=${tokens.DROPBOX_REFRESH_TOKEN}&client_id=${tokens.DROPBOX_KEY}&client_secret=${tokens.DROPBOX_SECRET}`,{
              method:"post"
            })
    
            if(TokenRequest.ok && TokenRequest.status == 200)
            {
              const Token = await TokenRequest.json()
             // console.log(Token)
              dropbox = Token.access_token
              dropbox_token = Token.access_token
               await localStorage.setItem("Dropbox", Token.access_token);
    
              
               if (uploadCount < 2) {
                // Your logic for fetching YouTube data goes here
            
                // Increment the fetchCount
                uploadCount++;
            
                // Call fetchYoutube again
                await handleUpload();
              }
    
            }
            else{
              console.log("error requesting token")
            }
    
    
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error selecting file:', error);
            console.log('Error details:', error.message); // Log error message
            console.log('Error stack:', error.stack); // Log error stack trace
            // You can access other properties of the error object as needed
          } else {
            console.error('Error selecting file:', error);
          }
        }
      };


      const handleFacebook = async(Uri:string) =>{
        try{
    
        
        var response = null
        
    
        if(uploadedFile.type =="image/jpeg" || uploadedFile.type =="image/jpg" || uploadedFile.type =="image/png")
        {
          response = await fetch(`https://graph.facebook.com/${tokens.PALM_FB_ID}/photos?url=${Uri}&caption=${caption}&access_token=${tokens.PAGETOKEN_PALM}`,{
            "method":"post",
          
          
          
          })
        }
        else if(uploadedFile.type =="video/mp4"){
          response = await fetch(`https://graph-video.facebook.com/113108471894109/videos?file_url=${Uri}&caption=${caption}&access_token=${tokens.PAGETOKEN_PALM}`,{
            "method":"post",
          
          
          
          })
    
          ////////////////////////////////////////////////////////////////////
         /* response = await fetch(`https://graph.facebook.com/${palm_fb_id}/feed?message=palm&link=${Uri}&published=true&access_token=${pagetoken_palm}`, {
            method: 'POST',
            headers:{
              'Content-Type':"application/json",
            },
            body:{
              "message":"Palm-Realestate",
              "link":Uri,
              "published":true,
    
            }
          });*/
          ///////////////////////////////////////////////////////////////////////////
        }
     
    
      if (response !== null && response.ok) {
        const responseData = await response.json();
       // console.log(responseData);
        fb_status="File sucessfully Uploaded to Facebook"
      } else {
        if(response !==null)
        {

        
        const errorText = await response.text();
        console.error('Error posting to facebook:', response.statusText);
        console.error('facebook API Error:', errorText);
        fb_status="File Upload to Facebook was unsuccessful"
        }
      }
    }
     catch (error) {
      console.log('Video upload error:', error);
      fb_status="File Upload to Facebook was unsuccessful"
    }
    
    finally{
      setLoading2(false)
    }
    
    }
    
  const handlePostToTelegram = async (Uri:string) => {
    var response = null
    var formData = null
    try {
      if(uploadedFile.type =="image/jpeg" || uploadedFile.type =="image/jpg" || uploadedFile.type =="image/png")
      {

       formData = new FormData();
      formData.append('photo', Uri);
      formData.append('caption', caption);
  
       response = await fetch(
        `https://api.telegram.org/bot${tokens.TELEGRAM_TOKEN}/sendPhoto?chat_id=@palm_realestate`,
        {
          method: 'POST',
          body: formData,
        }
      );
      }
      else if(uploadedFile.type =="video/mp4"){
        formData = new FormData();
        formData.append('video', Uri);
        formData.append('caption', caption);
    
         response = await fetch(
          `https://api.telegram.org/bot${tokens.TELEGRAM_TOKEN}/sendVideo?chat_id=@palm_realestate`,
          {
            method: 'POST',
            body: formData,
          }
        );

      }

  
      if (  response !==null && response.ok ) {
        const responseData = await response.json();
        //console.log(responseData);
        telegram_status="upload to telegram was successful"
      } else {
        if(response !==null)
        {

        
        const errorText = await response.text();
        console.error('Error posting to Telegram:', response.statusText);
        console.error('Telegram API Error:', errorText);
        telegram_status="upload to telegram was unsuccessful"
        }
      }
    } catch (error) {
      console.error('Error posting to Telegram:', error);
    }
    finally{
      setLoading4(false)
    }
  };

  const handleYoutube = async () => {
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
     /* const formData = new FormData();
      formData.append('video', { 
        uri: videoUri,
        type: 'video/mp4',
        name: 'uploaded_video.mp4',
      });*/

      /*const response = await fetch(
        'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet',
        {
          method: 'POST',
          //mode:"no-cors",
          headers: {
            'Content-Type': 'application/octet-stream',
            Authorization: `Bearer ${ytoken}`,
           
          },
          body:selectedFile.binary
          
           

          
            
           
            
           
        }
      );*/

         const response = await fetch(
        'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status',
        {
          method: 'POST',
          //mode:"no-cors",
          headers: {
            'Content-Type': 'application/octet-stream',
            Authorization: `Bearer ${ytoken}`,
           
          },
          body:
         
              uploadedFile.binaryForm

            
          
          
             
              
            
          
          
           

          
            
           
            
           
        }
      );

      if (response.ok && response.status === 200) {
        const responseData = await response.json();
       // console.log(responseData);
        youtube_status="upload to youtube was successful"

       // const videoId = responseData.id
        ////////////////////////////////////////////////////////////////////////////////////
      
      

        //////////////////////////////////////////////////////////////////////////////////
      
      
         /////////////////////////////////////////////////
      }
    
     

        /////////////////////////////////////////////////
       
       else {
        const errorText = await response.text();
        youtube_status="upload to youtube was unsuccessful"
        console.error('Trying Again:');
        try {
          const response = await fetch('https://oauth2.googleapis.com/token', {
            method:"POST",
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
  
          const token = await response.json()
        
      
         // console.log(token.access_token);
          //ytoken = token.access_token
          await localStorage.setItem("Youtube", token.access_token);

         

          if (fetchCount < 2) {
            // Your logic for fetching YouTube data goes here
        
            // Increment the fetchCount
            fetchCount++;
        
            // Call fetchYoutube again
            await handleYoutube();
          }
     
       
        
        
         
        
  
        } catch (error) {
          console.error(error);
        }
       
      }
    } catch (error) {
      console.log('Video upload error:', error);
    }

    finally{
      setLoading3(false)
    }
  };

  const handlePostToInstagram =  async(Uri:string) => {
    var id = ""
    var response = null
 
    try{
      if(uploadedFile.type =="image/jpeg" || uploadedFile.type =="image/jpg" || uploadedFile.type =="image/png")
    {
       response = await fetch(`https://graph.facebook.com/v16.0/${tokens.PALM_INSTAGRAM_ID}/media?image_url=${Uri}&caption=${caption}&access_token=${tokens.TOKEN_PALM}`,{
        method:"post"
      })
    }
    else if(uploadedFile.type =="video/mp4"){
      response = await fetch(`https://graph.facebook.com/v18.0/${tokens.PALM_INSTAGRAM_ID}/media?video_url=${Uri}&media_type=VIDEO&caption=${caption}&access_token=${tokens.TOKEN_PALM}`,{
        method:"post"
      })


    }
    
      if( response !== null && response.ok && response.status == 200)
      {
        const data = await response.json()
        //console.log("successful")
        
        id = data.id
       // console.log(data.id)
////////////////////////////////////////////////////////////////////////////
        try{
          const response2 = await fetch(`https://graph.facebook.com/v18.0/${tokens.PALM_INSTAGRAM_ID}/media_publish?creation_id=${id}&access_token=${tokens.TOKEN_PALM}`,{
            method:"post"
          })
          if(response2.ok && response2.status == 200)
          {
            const data2 = await response2.json()
           // console.log(data2.id)
            console.log("successful")
            instagram_status = "Upload to instagram was successful"

          }
          else{
            console.log("Error uploading to instagram")
            instagram_status = "Upload to instagram was unsuccessful"
          }

        }

        catch(e)
        {
          console.log("error uploading")
          instagram_status = "Upload to instagram was unsuccessful"
        }
        finally{
          setLoading5(false)
        }

   ///////////////////////////////////////////////////////////////////////////////////

      }
      else{
        console.log("Error uploading file")
      }
    }
    catch(e)
    {
      console.log(e)
    }
  };

  React.useEffect(()=>{
   // if(tewa.DROPBOX_KEY === '')
   // {
      fetchToken()

    //}

  },[])
    
    
      React.useEffect(() => {
        
        console.log(uploadedFile);
       // console.log(tokens)
      },
      )

     

   

    return(
      <>
      <Heade/>
  
        <div className="flex-column flex-1 justify-center items-center mb-40">
            <h1 className='text-4xl text-center text-cyan-600'>Where Do You Want To Post</h1>

            <div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text text-2xl text-cyan-800">Facebook</span>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            name="Facebook"
            onChange={handleCheckboxToggle}
          />
        </label>
      </div>

      <br/>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text text-2xl text-red-500">Instagram</span>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            name="Instagram"
            onChange={handleCheckboxToggle}
          />
        </label>
      </div>
      <br/>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text text-2xl text-rose-700">Youtube</span>
          <input
            type="checkbox"
            className="checkbox checkbox-error"
            name="Youtube"
            onChange={handleCheckboxToggle}
          />
        </label>
      </div>
      <br/>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text text-2xl text-teal-500">Telegram</span>
          <input
            type="checkbox"
            className="checkbox checkbox-accent"
            name="Telegram"
            onChange={handleCheckboxToggle}
          />
        </label>
      </div>
      <br/>

      

      {renderInputForm()}
    </div>
    <input  onChange={handleFileChange} type="file" title='file' className="file-input file-input-bordered   file-input-accent w-full max-w-xs "  style={{marginLeft:"30vw", marginTop:"50px",marginBottom:"30px"}}/>


    <button  className="btn btn-outline btn-success w-60 justify-center" style={{marginLeft:"35vw", marginTop:"10px",marginBottom:"10px"}} onClick={handleUpload}>Upload</button>
    <button onClick={handleReload} className="btn btn-outline btn-error w-60 "  style={{marginLeft:"35vw", marginTop:"10px"}}>Reload</button>


    {uploadStatus && (
          <p className=' text-cyan-800 text-center mt-2 font-bold capitalize text-lg mb-2 mr-2'>{uploadStatus}</p>
        )}
        {Clicked ? null : (
          Loading ? (  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Activity3 />
          <p className=' font-bold capitalize text-lg mb-2' style={{ marginTop: 10,marginLeft:"34vw" }}>Uploading to server...</p>
        </div>) : <p className='mt-2 font-bold capitalize text-lg mb-2' style={{color:"cyan",marginLeft:"34vw"}}>{upload_status}</p>
       
        )

        
        }
        {!Clicked && (() => {
   if(selectedInputs.includes("Facebook"))
   {
    return (
      Loading2 ? (
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Activity2 />
          <p className='mt-2 font-bold capitalize text-lg mb-2' style={{ marginTop: 10,marginLeft:"34vw" }}>Uploading to Facebook...</p>
        </div>
      ) : (
        <p className='mt-2 font-bold capitalize text-lg mb-2' style={{ color: "blue",marginLeft:"34vw" }}>{fb_status}</p>
      )
    );
  } else {
    // Code to execute if the condition is not met
    return null; // or any other fallback UI
  }
})()}
       
       {!Clicked && (() => {
   if(selectedInputs.includes("Youtube"))
   {
    return (
      Loading3 ? (
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Activity />
          <p className='mt-2 font-bold capitalize text-lg mb-2' style={{ marginTop: 10,marginLeft:"34vw" }}>Uploading to youtube...</p>
        </div>
      ) : (
        <p className='mt-2 font-bold capitalize text-lg mb-2' style={{ color: "red",marginLeft:"34vw" }}>{youtube_status}</p>
      )
    );
  } else {
    // Code to execute if the condition is not met
    return null; // or any other fallback UI
  }
})()}

{!Clicked && (() => {
   if(selectedInputs.includes("Telegram"))
   {
    return (
      Loading4 ? (
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Activity2 />
          <p className='mt-2 font-bold capitalize text-lg mb-2' style={{ marginTop: 10,marginLeft:"34vw" }}>Uploading to Telegram...</p>
        </div>
      ) : (
        <p className='mt-2 font-bold capitalize text-lg mb-2' style={{ color: "cyan",marginLeft:"34vw" }}>{telegram_status}</p>
      )
    );
  } else {
    // Code to execute if the condition is not met
    return null; // or any other fallback UI
  }
})()}

{!Clicked && (() => {
   if(selectedInputs.includes("Instagram"))
   {
    return (
      Loading5 ? (
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Activity/>
          <p className='mt-2 font-bold capitalize text-lg mb-2' style={{ marginTop: 10,marginLeft:"34vw" }}>Uploading to Instagram...</p>
        </div>
      ) : (
        <p  className='mt-2 font-bold capitalize text-lg mb-2' style={{ color: "orange",marginLeft:"34vw" }}>{instagram_status}</p>
      )
    );
  } else {
    // Code to execute if the condition is not met
    return null; // or any other fallback UI
  }
})()}
           

     



        </div>
        <Nav/>
        </>


    )





}

  

  
//<p>Selected Inputs: {selectedInputs.join(', ')}</p>
export default isAuth(Post)
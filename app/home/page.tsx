'use client'

import React,{useEffect,useState,createContext,useContext} from 'react';
import { useRouter } from 'next/navigation'
import { Bar } from 'react-chartjs-2';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';
import Nav from '../Components/Nav';
import { Activity,Activity2 } from '../Components/Activity';
import { Telegram_Logo,Instagram_Logo,Youtube_Logo,Facebook_Logo } from '../Components/Logo';
import Heade from '../Components/Header';
//import { auth } from '../login/page';
import { redirect } from 'next/navigation';
import isAuth from '../Components/Auth';
import { TokenContext,TokenProvider } from '@/context/TokenContext';
import { AnyObjectSchema } from 'yup';


var ha =[]
var Tlikes = ""
var Tcomments = ""
var shares = ""
var imp = ""
var reach = ""
var ytoken:string = ""
let fetchCount = 0;

var ytoken_tem = ""


var ed = null //engagment daily
  var ew:string = "" //engagment weekly

  var pped = null
  var ppew:string = ""

  var nfd = null;
  var nfw:string = "";

  var pid = null
  var piw:string = ""



 

  var pi1 = null
  var pi2:string = ""
  var pi3:string = ""


  var li1 = null
  var li2:string = ""
  var li3:string = ""

  var v1 = null
  var v2:string = ""
  var v3:string = "" 

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
var Token:token = {
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
/*var tewa:token = {
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

}*/

var tewa:{} = {}



interface TokenContextType {
  token: token;
  setToken: React.Dispatch<React.SetStateAction<token>>;
}

interface Instagram{
  username:string,
  followers_count:string,
  follows_count:string,
  media_count:string
}

var insta:Instagram = {
  "username":"Loading values",
  "followers_count": "",
  "follows_count": "",
  "media_count": ""
}

interface Facebook{
  name:string,
  followers_count:string,
 
}

var face:Facebook = {
  "name":"Loading values",
  "followers_count": "",
  
}
interface Telegram{
  username:string
}
interface Telegram2{
  result:string
}

var t:Telegram = {
  username:"Loading"
}
var t2:Telegram2 = {
  result:""

}

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const today = `${year}-${month}-${day}`;



const previousDate = new Date();
previousDate.setDate(currentDate.getDate() - 20);

const year2 = previousDate.getFullYear();
const month2 = String(previousDate.getMonth() + 1).padStart(2, '0');
const day2 = String(previousDate.getDate()).padStart(2, '0');

const previous = `${year2}-${month2}-${day2}`;



type AbbreviationCardProps = {
  word: string;
  abbreviation: string;
};

const AbbreviationCard: React.FC<AbbreviationCardProps> = ({ word, abbreviation }) => {
  return (
    <div className=" rounded shadow p-4 mx-auto max-w-sm">
      <h2 className="text-xl font-bold mb-4 text-yellow-600">{word}</h2>
      <p className="text-cyan-600 text-center">{abbreviation}</p>
    </div>
  );
};

///const TokenContext = createContext<token | null>(null);




const Home = () => {
  const router = useRouter()

  const [Instagram,setInstagram] = React.useState(insta);
  const [Instagram2,setInstagram2] = React.useState([]);
  const [Instagram3,setInstagram3] = React.useState([]);
  const [Instagram4,setInstagram4] = React.useState([]);

  const [Facebook,setFacebook] = React.useState(face)
  const [Facebook2,setFacebook2] = React.useState("")

  const [Loading,setLoading] = React.useState(true)
  const [Loading2,setLoading2] = React.useState(true)
  const [Loading3,setLoading3] = React.useState(true)
  const [Loading4,setLoading4] = React.useState(true)
  const [status,setStatus] = React.useState(false)

  const [Yheader,setYheader] = React.useState<any[][]>([]);
  const [Yrow, setYrow] = React.useState<any[][]>([]);

  
 const [Telegram1,setTelegram1] = React.useState(t)
 const [Telegram2,setTelegram2] = React.useState(t2)
 const [Ytoken,setYtoken] = React.useState("")
 const [loggedin, setLoggedin] = React.useState(false)

 const [view,setView] = React.useState("")

 const tokenContext = React.useContext(TokenContext)
  
  

  const [tokens,setTokens] = useState(Token)

  

  const updateToken = (token:string)=>{

    setYtoken(token)

  }

 
  const fetchToken = async() =>{

    const res = await fetch("/api/token")

    const data:token[] = await res.json()

    setTokens(data[0])
    tewa = data[0]
    setStatus(true)
    ytoken = data[0].YTOKEN
   

    

    

    

   // console.log(data[0])





  }
  /*useEffect(() => {
    if(auth === false)
    {
      //router.replace('../login')
      redirect('/')
    }
    setLoggedin(true)
     
     
       
      
  }, [router]);*/

 
  useEffect(() => {
  
  fetchToken()
  
   
     
     
       
      
  }, []);

  useEffect(() => {
    const fetchInstagram = async() =>
    {
      
      try{
        const r = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_INSTAGRAM_ID}?fields=username,followers_count,follows_count,media_count&access_token=${tokens.TOKEN_PALM}`)
       // const r9 = await fetch(`https://graph.facebook.com/${Token.PALM_INSTAGRAM_ID}/tags
       // ?fields=id,username&access_token=${token_palm}`)
        const r8 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_INSTAGRAM_ID}?fields=business_discovery.username(palm.real_estate){media{comments_count,like_count}}&access_token=${tokens.TOKEN_PALM}`)
        const r2 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_INSTAGRAM_ID}/insights?metric=impressions,reach,profile_views&period=day&access_token=${tokens.TOKEN_PALM}`)
        const r3 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_INSTAGRAM_ID}/insights?metric=likes,comments&metric_type=total_value&period=day&access_token=${tokens.TOKEN_PALM}`)
        const r4 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_INSTAGRAM_ID}/insights?metric=impressions&period=days_28&access_token=${tokens.TOKEN_PALM}`)
        const r5 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_INSTAGRAM_ID}/insights?metric=reach&period=days_28&access_token=${tokens.TOKEN_PALM}`)
        const r6 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_INSTAGRAM_ID}/insights?metric=shares&period=day&metric_type=total_value&Breakdown=	
        media_product_type&access_token=${tokens.TOKEN_PALM}`)
      //  const r7 = await fetch(`https://graph.facebook.com/v17.0/${Token.PALM_INSTAGRAM_ID}/insights?metric=engaged_audience_demographics&period=lifetime&timeframe=last_30_days&breakdown=age,
       // city,
       // country,
       // gender&metric_type=total_value&access_token=${token_palm}`)
        const response = await r.json()
        const response2 = await r2.json()
        const response3 = await r3.json()
        const response4 = await r4.json()
        const response5 = await r5.json()
        const response6 = await r6.json()
       // const response7 = await r7.json()
        const response8 = await r8.json()
      //  const response9 = await r9.json()
  
       // console.log("instagram")
       // console.log(response9)
  
        setInstagram4(response8.business_discovery.media.data)
        ha = response8.business_discovery.media.data
          // console.log("instagram")
          //// console.log(response)
          // console.log(response2)
          // console.log(response3)
          // console.log(response4)
          // console.log(response5)
           //console.log(response6) 
       // console.log(response8)
        const result = ha.reduce((accumulator: number, currentObject: { like_count: number }) => accumulator + currentObject.like_count, 0);
        Tlikes = result;
        
        const result2 = ha.reduce((accumulator: number, currentObject: { comments_count: number }) => accumulator + currentObject.comments_count, 0);
        Tcomments = result2;
  
        shares = response6.data[0].total_value.value
  
        imp = response4.data[0].values[1].value
        reach = response5.data[0].values[1].value
  
        setInstagram(response)
        setInstagram2(response2.data)
        setInstagram3(response3.data)
  
       // console.log("instagram")
       // console.log(response)
  
       
        
        
  
  
      }
      catch(e)
      {
        console.log(e)
      }
      finally
      {
          setLoading(false)
      }
   
    }
    
 
   fetchInstagram();
  
    ////////////////////////////////////////////////////////////////////////////////////
    
    const fetchFacebook = async() =>{
      try{

        try {
          const r = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_FB_ID}?fields=name,checkins,followers_count,new_like_count&access_token=${tokens.PAGETOKEN_PALM}`)
          const response = await r.json() 
         // console.log("Facebook")
  
          
          setFacebook(response)
         // console.log(response)
          
        } catch (error:any) {
          console.log("response 1 error")

          console.log(error.message)
          
        }

        try {
          const r2 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_FB_ID}/insights/page_engaged_users?access_token=${tokens.PAGETOKEN_PALM}`)
          const response2 = await r2.json()
          
        
        
          ed=response2.data[0].values[1].value;
          ew=response2.data[1].values[1].value;
          //console.log(response2)
          
        } catch (error:any) {

          console.log("response 2 error")

          console.log(error.message)
          
        }

        try {
          const r3 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_FB_ID}/insights/page_post_engagements?access_token=${tokens.PAGETOKEN_PALM}`)
          const response3 = await r3.json()
  
          console.log("Successfully fetched Facebook")
  
          pped=response3.data[0].values[1].value;
          ppew=response3.data[1].values[1].value;
        //  console.log(response3)
          
        } catch (error:any) {
          console.log("response 3 error")

          console.log(error.message)
          
          
        }

        try {
          
        const r4 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_FB_ID}/insights/page_negative_feedback?access_token=${tokens.PAGETOKEN_PALM}`)
        const response4 = await r4.json()

        nfd=response4.data[0].values[1].value;
        nfw=response4.data[1].values[1].value;

        
        pid=response4.data[0].values[1].value;
        piw=response4.data[1].values[1].value;
        //console.log(response4)
          
        } catch (error:any) {

          console.log("response 4 error")

          console.log(error.message)


          
        }
      

    

      

       


       // const r5 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_FB_ID}/insights/page_impressions?access_token=${tokens.PAGETOKEN_PALM}`)
       // const response5 = await r5.json()

       try {
        const r6 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_FB_ID}/insights/page_posts_impressions?access_token=${tokens.PAGETOKEN_PALM}`)
        const response6 = await r6.json()
                
        pi1=response6.data[0].values[1].value;
        pi2=response6.data[1].values[1].value;
        pi3=response6.data[2].values[1].value;

        
       } catch (error:any) {

        console.log("response 6 error")

        console.log(error.message)
        
       }

     

        //console.log(response6)

        try {
          const r7 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_FB_ID}/insights/page_actions_post_reactions_like_total?access_token=${tokens.PAGETOKEN_PALM}`)
          const response7 = await r7.json()
          li1=response7.data[0].values[1].value;
          li2=response7.data[1].values[1].value;
          li3=response7.data[2].values[1].value;
  
          
        } catch (error:any) {

          console.log("response 7 error")

          console.log(error.message)
          
        }

       
    
      // console.log(response7)

      //const r8 = await fetch(`https://graph.facebook.com/v17.0/${palm_fb_id}/insights/page_fans_country?access_token=${pagetoken_palm}`)
     //// const response8 = await r8.json()
     // console.log(response8)

     try {
      const r9 = await fetch(`https://graph.facebook.com/v17.0/${tokens.PALM_FB_ID}/insights/page_views_total?access_token=${tokens.PAGETOKEN_PALM}`)
      const response9 = await r9.json()
     console.log(response9)

    
      v1=response9.data[0].values[1].value;
    
      v2=response9.data[1].values[1].value;
      setView(response9.data[1].values[1].value)
      setFacebook2(response9.data[1].values[1].value)

      v3=response9.data[2].values[1].value;

     // alert(v2)

      console.log("v2")
      console.log(v2)

      
     } catch (error:any) {

      console.log("response 9 error")

      console.log(error.message)

      
     }

       




     

    

      
      
      
       
      }
      catch(e)
      {
        console.log(e)
      }
      finally
      {
        setLoading2(false)
      }
     
    }
    
   fetchFacebook()

     /////////////////////////////////////////////////////////////////////

     const fetchYoutube = async () => {
      try {
        let ytoken = ''; // Initialize ytoken with a default value
        let fetchCount = 0; // Initialize fetchCount with 0
        let dataReceived = false; // Flag to track whether data has been received
    
        // Retrieve ytoken from localStorage
        const value2 = await localStorage.getItem("Youtube");
        if (value2 !== null) {
          ytoken = value2;
        } else {
          console.log("Invalid ytoken value. Cannot set AsyncStorage.");
        }
    
        console.log("Youtube trial");
    
        while (fetchCount < 3 && !dataReceived) {
          const r = await fetch(`https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==${tokens.CHANNEL}&metrics=views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained,comments,dislikes,likes&startDate=${previous}&endDate=${today}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${ytoken}`,
              'Content-Type': 'application/json',
            },
          });
    
          if (r.ok && r.status === 200) {
            const response = await r.json();
            setYheader(Object.values(response.columnHeaders));
            setYrow(response.rows);
            console.log("Youtube success");
            dataReceived = true; // Set the flag to true
          } else {
            console.log("Youtube fail");
            //console.log(r.status);
    
            // Refresh the token
            const response = await fetch('https://oauth2.googleapis.com/token', {
              method: "POST",
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
            //console.log(token.access_token);
            ytoken = token.access_token;
    
            // Update ytoken in localStorage
            await localStorage.setItem("Youtube", token.access_token);
          }


    
          fetchCount++;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading3(false);
      }
    };
    
    
   
     fetchYoutube()

     ////////////////////////////////////////////////
     const fetchTelegram = async() =>{
      try{
        const r1 = await fetch(`https://api.telegram.org/bot${tokens.TELEGRAM_TOKEN}/getChat?chat_id=${tokens.TELEGRAM_CHANNEL}`)
        const response1 = await r1.json()
        setTelegram1(response1.result)
        //console.log('telegram1')
        //console.log(response1.result)
        const r2 = await fetch(`https://api.telegram.org/bot${tokens.TELEGRAM_TOKEN}/getChatMembersCount?chat_id=${tokens.TELEGRAM_CHANNEL}`)
        const response2 = await r2.json()
        setTelegram2(response2)
       // console.log(response2)



      }
      catch(e)
      {
        console.log(e)

      }
      finally{
        setLoading4(false)
      }

      
      

    }
   
   fetchTelegram()
     
      
      
  }, [tokens]);



  const data4 = []
 
  for (let i = 0; i < Yrow.length; i++) {
    const innerArray = Yrow[i];
    
    for (let j = 0; j < innerArray.length; j++) {
      const element = innerArray[j];
      data4.push(element)
     //alert(element);
    }
  }

  
  const data = [
    { data: 'Views', value: data4[0]},
    { data: 'EMW', value: data4[1] },
    { data: 'AVD', value: data4[2] },
    { data: 'AVP', value: data4[3]},
    { data: 'SG', value: data4[4] },
    { data: 'Comments', value: data4[5]},
    { data: 'Dislikes', value: data4[6] },
    { data: 'Likes', value: data4[7] },

   
  ];
 
  const axisStyle = {
    axis: { stroke: 'white' },
    axisLabel: { fill: 'white' },
    tickLabels: { fill: 'red', fontSize: 15, angle: -45, textAnchor: 'end' }, 
    grid: { stroke: 'none' }, // Remove gridlines
  };

  const barStyle = {
    data: { fill: 'red' },
  };







 
  

  

    return(
     

     
      <>
    
     
        <Heade/>
        

     
        <div className="flex-column flex-1 justify-center items-center mb-40">
           <h1 className="text-center text-cyan-700 font-bold text-4xl m-6">Basic Social Media Analytics</h1>
           <div className="flex items-center justify-center">
      <Instagram_Logo />
      <h2 className="text-center text-red-700 font-bold text-2xl">
        Instagram
      </h2>
    </div>
          {
            Loading?<Activity/>:(
              <div className="overflow-x-auto">
<table className="table w-full" style={{textAlign:"left",margin:"20px"}}>
  {/* head */}
  <thead>
    <tr>
    
    </tr>
  </thead>
  <tbody>
    {/* row 1 */}
    <tr className="hover">
      <th className='text-red-600'>Username</th>
      <td className='text-red-600'>{Instagram.username}</td>
    </tr>
    {/* row 2 */}
    <tr className="hover">
      <th className='text-red-600'>Followers Count</th>
      <td className='text-red-600'>{Instagram.followers_count}</td>
    </tr>
    {/* row 3 */}
    <tr>
      <th className='text-red-600'>Follows Count</th>
      <td className='text-red-600'>{Instagram.follows_count}</td>
    </tr>
    <tr>
      <th className='text-red-600'>Media Count</th>
      <td className='text-red-600'>{Instagram.media_count}</td>
    </tr>
    <tr>
      <th className='text-red-600'>Impressions(Total number of times the Accounts media files have been viewed in the last 28 days)</th>
      <td className='text-red-600'>{imp}</td>
    </tr>
    <tr>
      <th className='text-red-600'>Reach(Total number of times the  Accounts media files have been uniquely viewed in the last 28 days)</th>
      <td className='text-red-600'>{reach}</td>
    </tr>
    <tr>
      <th className='text-red-600'>Total Likes</th>
      <td className='text-red-600'>{Tlikes}</td>
    </tr>
    <tr>
      <th className='text-red-600'>Total Comments</th>
      <td className='text-red-600'>{Tcomments}</td>
    </tr>
  </tbody>
</table>
</div>

            )
          }

<div className="flex items-center justify-center">
      <Facebook_Logo />
      <h2 className="text-center text-cyan-700 font-bold text-2xl">
        Facebook
      </h2>
    </div>

    {
            Loading2?<Activity2/>:(
              <div className="overflow-x-auto">
<table className="table w-full" style={{textAlign:"left",margin:"20px"}}>
  {/* head */}
  <thead>
    <tr>
    
    </tr>
  </thead>
  <tbody>
    {/* row 1 */}
    <tr className="hover">
      <th className='text-cyan-600'>name</th>
      <td className='text-cyan-600'>{Facebook.name}</td>
    </tr>
    {/* row 2 */}
    <tr className="hover">
      <th className='text-cyan-600'>Followers Count</th>
      <td className='text-cyan-600'>{Facebook.followers_count}</td>
    </tr>
    {/* row 3 */}
    <tr>
      <th className='text-cyan-600'>Total Views(The number of times a Pages profile has been viewed)</th>
      <td className='text-cyan-600'>{Facebook2 +" times this week " + "and " +v3 + " times in the last 28 days"}</td>
    </tr>
    <tr>
      <th className='text-cyan-600'>Total Likes(Total post like reactions of a page)</th>
      <td className='text-cyan-600'>{li2 +" times this week " + "and " +li3 + " times in the last 28 days on Average"}</td>
    </tr>
    <tr>
      <th className='text-cyan-600'>Engaged Users(The number of people who engaged with your Page. Engagement includes any click by Unique Users)</th>
      <td className='text-cyan-600'>{ew +" times this week"}</td>
    </tr>
    <tr>
      <th className='text-cyan-600'>post_engagements(The number of times people have engaged with your posts through like, comments and shares and more)</th>
      <td className='text-cyan-600'>{ppew +" people this week"}</td>
    </tr>
    <tr>
      <th className='text-cyan-600'>negative_feedback(The number of times people took a negative action (e.g., un-liked or hid a post).)</th>
      <td className='text-cyan-600'>{nfw +" times this week"}</td>
    </tr>
    <tr>
      <th className='text-cyan-600'>impressions(The number of times any content from your Page or about your Page entered a persons screen. This includes posts, stories, ads, as well other content or information on your Page)</th>
      <td className='text-cyan-600'>{piw +" times this week"}</td>
    </tr>
    <tr>
      <th className='text-cyan-600'>posts_impressions(The number of times your Pages posts entered a persons screen. Posts include statuses, photos, links, videos and more)</th>
      <td className='text-cyan-600'>{pi2 +" times this week " + " and" +pi3 + " times in the last 28 days"}</td>
    </tr>
 
  </tbody>
</table>
</div>

            )
          }

<div className="flex items-center justify-center">
      <Youtube_Logo />
      <h2 className="text-center text-red-900 font-bold text-2xl">
        Youtube
      </h2>
    </div>
    {
      Loading3?<Activity/>:(
        <div style={{marginBottom:"15px"}}>

  
<div style={{ width: '100%', height: '100%' }}>
  <VictoryChart
    theme={VictoryTheme.material}
    domainPadding={{ x: 20 }} // Adjust the domain padding for longer labels
    width={window.innerWidth} // Set the width to the current window width
    height={window.innerHeight} // Set the height to the current window height
  >
    <VictoryAxis dependentAxis style={axisStyle} />
    <VictoryAxis tickFormat={(t) => `${t.slice(0, 3)}.`} style={axisStyle} />
    <VictoryBar
      data={data}
      x="data"
      y="value"
      style={barStyle}
      barWidth={10}
    />
  </VictoryChart>
</div>
<h2 className="text-2xl font-bold mb-4 mr-2 mt-4 text-center text-red-600">Additional Information</h2>
<div className="flex flex-wrap justify-center items-center">
 
  <br/>
  <AbbreviationCard word="Views" abbreviation="Vie" />
  <AbbreviationCard word="Estimated Minutes watched" abbreviation="EMW" />
  <AbbreviationCard word="Average View Duration" abbreviation="AVD" />
  <AbbreviationCard word="Average View Percentage" abbreviation="AVP" />
  <AbbreviationCard word="Subscribers Gained" abbreviation="SG" />
  <AbbreviationCard word="Comments" abbreviation="Com" />
  <AbbreviationCard word="Dislikes" abbreviation="Dis" />
  <AbbreviationCard word="Likes" abbreviation="Lik" />
</div>



     
  
      </div>

      

      
  

      )
    }
    <div className="flex items-center justify-center">
      <Telegram_Logo/>
      <h2 className="text-center text-cyan-500 font-bold text-2xl">
        Telegram
      </h2>
    </div>
    {
            Loading4?<Activity2/>:(
              <div className="overflow-x-auto">
<table className="table w-full" style={{textAlign:"left",margin:"20px"}}>
  {/* head */}
  <thead>
    <tr>
    
    </tr>
  </thead>
  <tbody>
    {/* row 1 */}
   
    {/* row 2 */}
    <tr className="hover">
      <th className='text-cyan-600'>Username</th>
      <td className='text-cyan-600'>{"palm_realestate"}</td>
    </tr>
    <tr className="hover">
      <th className='text-cyan-600'>Followers Count</th>
      <td className='text-cyan-600'>{Telegram2.result}</td>
    </tr>

 
  </tbody>
</table>
</div>

            )
          }
   

      
        
       

   
</div>
<Nav/>
</>


    )

    


}




export default isAuth(Home)
//export const useTokenContext = () => useContext(TokenContext);
//export {TokenContext};
//export {tewa}


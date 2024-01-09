import React from "react";
import { useRouter } from "next/router";
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
interface TokenProviderProps {
    children: React.ReactNode;
  }

  const TokenContext = React.createContext<token | undefined>(undefined);
const { Provider } = TokenContext;


const TokenProvider = ({ children }:TokenProviderProps) => {
    const [tokens, setTokens] = React.useState(Token)

    React.useLayoutEffect(
        ()=>{
            const fetchToken = async() =>{
                console.log("here")

                const res = await fetch("/api/token")
            
                const data:token[] = await res.json()
            
                setTokens(data[0])
            
               
            
                
            
                
            
                
            
               // console.log(data[0])
            
            
            
            
            
              }
              fetchToken();

        }


    ,[])
    
  
   
  
   
   
  
   return (
     <Provider value={tokens}
       
     >
      {children}
     </Provider>
   );
  };
  
  export { TokenContext, TokenProvider };




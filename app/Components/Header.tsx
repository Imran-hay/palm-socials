import React from 'react';
import { useRouter } from 'next/navigation'
import { removeItem } from './Webstorage';
import { redirect } from "next/navigation";

export default function  Heade()
{
  const router = useRouter()
  const handleLogout = ()=>{
    removeItem("Token")
    router.refresh()
    console.log("logging out")
    //redirect("../login")
    router.push("../login")
   


  }
    return(
      
       
    
<div className="navbar bg-base-100 flex flex-wrap items-center justify-between p-4 sm:p-6">
  <a className="btn btn-ghost text-xl flex items-center">
    <img src="/palm.jpg" alt="Icon" className="icon" style={{ width: "50px", height: "auto", borderRadius: 10 }} />
    <span className="ml-2">Palm Real Estate</span>
  </a>
  <button className="btn btn-outline  btn-error mt-4 sm:mt-0" onClick={handleLogout}>Logout</button>
</div>


    )
}
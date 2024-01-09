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
      
       
    
<div className="navbar bg-base-100" style={{ display: "flex", justifyContent: "space-between" }}>
  <a className="btn btn-ghost text-xl">
    <img src={"/palm.jpg"} alt="Icon" className="icon" style={{ width: "50px", height: "auto", borderRadius: 10 }} />
    Palm Realestate
  </a>
  <button className="btn btn-outline btn-error" onClick={handleLogout}>Logout</button>
</div>


    )
}
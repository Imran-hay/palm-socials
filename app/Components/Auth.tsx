"use client";
//import { auth } from "../login/page";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/utils/Auth";
import { getItem } from "./Webstorage";


//var auth:any;


export default   function isAuth(Component: any) {
  return  function IsAuth(props: any) {
    var auth = getItem("Token")
   
    
    


    useEffect(() => {
     
      if (!auth) {
        return redirect("/");
      }
    }, []);


    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
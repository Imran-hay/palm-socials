'use client'
import Image from 'next/image';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import { setItem } from '../Components/Webstorage';
//const jwt = require('jsonwebtoken')
//import { useJwt } from 'react-jwt';








var auth = false;




const Login = () => {
  const router = useRouter()


  const [user,setUser] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [error,setError] = React.useState('')


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError("Logging in....")

    

    try {
      
    const res = await fetch("/api/login");

    if(res.status === 200)
    {
      const data = await res.json();

      if(data[0].username == user && data[0].password == password)
      {
        auth = true
        //localStorage.setItem("Token","True")
        const payload = { userId: user };
        const secretKey = process.env.SECRET;
    
       // const token = jwt.sign(payload, secretKey);
        setItem("Token","verified")
        console.log("welcome")
        router.push("../home")
        
      }
      else{
        console.log("wrong username and password")

        setError("wrong username or password")
      }

    }

    else{
      alert("an error occured please try again")

    }

   
      
    } catch (error) {

      alert(error)
    
      
    }

   
  

    setPassword("")
    setUser("")
   
  };

  
 

  return (
    <div className="flex flex-col items-center justify-center h-screen sm:mb-6 md:mb-6 ">
      <h1 className="text-blue-900 text-5xl mt-16 pt-5 font-bold italic">
        Welcome to Palm Socials
      </h1>
      <Image src="/palm.jpg" alt="hello" width={500} height={330} style={{borderRadius:10}} className="mt-8" />
      <form  className="flex flex-col items-center" onSubmit={handleSubmit}>
      <input
  className="border-2 border-blue-500 w-80 h-12 my-4 rounded px-4 text-blue-500"
  placeholder="Username"
  type="text"
  name="user"
  value={user}
  onChange={(e) => setUser(e.target.value)}
  required
/>

<input
  className="border-2 border-blue-500 w-80 h-12 my-4 rounded px-4 text-blue-500"
  placeholder="Password"
  type="password"
  name="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>

      
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-8 w-25"
          type="submit"
          
       
        >
          LOG IN
        </button>

        <p style={{textAlign:"center", color:"white",marginTop:"5px"}}>{error}</p>
      </form>
    </div>

    

)}

  

export default Login;
//export {auth}
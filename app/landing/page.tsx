"use client"
import React,{useEffect,useState,useRef} from 'react';
import { useRouter } from 'next/navigation'
import animationData from '../../public/Animation.json'
import lottie from 'lottie-web';
import "../../public/color.css"
import "../../public/border.css"

const Landing = () => {

    const router = useRouter()

    const animationContainer = useRef(null!);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      animationData: animationData,
      renderer: 'svg', // Choose the renderer (svg, canvas, html)
      loop: true, // Set loop to true or false
      autoplay: true, // Set autoplay to true or false
    });

    return () => {
      anim.destroy(); // Cleanup on unmount
    };
  }, []);
  return (
    <html data-theme={"light"}>

  
  
  <div data-theme={""}>


    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
     
    </div>
    <a className="btn btn-ghost text-xl text-teal-600">Social Pilot</a>
  </div>
 
  <div className="navbar-end">
    <a className="btn btn-outline btn-info" onClick={()=>router.push("../login")}>Login</a>
  </div>
</div>

<div className='md:grid md:grid-cols-2 '>
        <div className='my-auto pt-5 md:pt-0 px-5 md:px-0'>
          <h1 className='font-bold lg:text-3xl text-2xl animate-charcter ml-5'>Welcome to Social pilot</h1>
           
              <div className="grid grid-cols-4 ml-5">
                <div className="col-span-3">
                <p className='mt-3 text-teal-500'>
                The all-in-one social media manager is a comprehensive tool that provides various functionalities to help users effectively manage their presence on popular social media platforms. It  includes analytics, post management, and scheduling features
                </p>
                </div>
              </div>
              <button className="btn btn-outline btn-info px-8 py-2 mt-3 ml-5">Learn more</button>

        </div>
        <div className='hidden md:inline'>

        <div ref={animationContainer} id='con'></div>
        </div>
      </div>


      
      <div className="container relative ml-5">
         <div className="mt-2 flex justify-center">
             {/* <div className='grid content-center justify-items-center'>
               <h1 className="leading-none text-2xl text-grey-darkest">
                  <a className="no-underline text-grey-darkest hover:text-black" href="#">
                     <img src={Logo} alt='logo'></img>
                  </a>
               </h1>
            </div> */}
            <div className='w-2/3 box'>
               <div className="mt-3">
                  <div className='text-center'>
                  <h2 className="font-bold text-center lg:text-4xl text-2xl animate-charcter">About the app</h2>

                  </div>
                
               </div>
               <div className="mt-3">
                  <p className="font-bold text-2xl text-white" > Welcome to Social Pilot, The Social media management App!</p>
               </div>
               <div className="mt-3">
                  <p className="text-white">
                  An all-in-one social media manager is a tool that combines analytics, post management, and scheduling features. It provides in-depth insights into social media performance, including follower growth, engagement rates, and demographics. Users can make data-driven decisions and optimize their strategies.
                  </p>
                  <p className="text-white md:flex mt-1 hidden">
                  The post management functionality allows users to create, edit, and organize social media posts from a centralized dashboard. They can schedule posts in advance, preview how they will appear, and maintain a consistent brand presence across platforms.
                  </p>
                  <p className="text-white mt-1 " id="">
                  Scheduling capabilities enable users to plan and automate the publishing of social media posts. It saves time, ensures a steady stream of content, and maximizes reach by targeting specific time zones or optimal posting times. Users can maintain an engaging social media presence without constant manual intervention.
                  </p>
                 
               </div>
            </div>
         </div>
      </div>

      <div className=" flex flex-col ml-5 mt-5">
      <h1 className="text-3xl text-center mb-6 text-cyan-700 font-bold">Privacy Policy</h1>
        <h3 className="text-lg mb-4 text-yellow-500 w-full text-center ">
          Our commitment to privacy:
       
        </h3>
        <p className='text-black mb-3'>
        We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our social media management app. By using our app, you consent to the practices described in this policy.

        </p>

        <button className="btn btn-outline btn-info w-1/6 justify-center align-middle text-center" onClick={()=>router.push("../privacy")}>Learm More</button>


        </div>

        <div className="flex flex-col ml-5">
      <h1 className="text-3xl text-center mb-6 text-teal-700 font-bold">Terms of Service</h1>
      <p className="text-lg mb-4 text-cyan-600 text-center">
        By using our app, you agree to certain Terms of Services:
      </p>

      <button className="btn btn-outline btn-info w-1/6 justify-center align-middle items-center text-center mb-5" onClick={()=>router.push("../terms")}>Learm More</button>

      </div>



  </div>

  </html>

  )
};

export default Landing;
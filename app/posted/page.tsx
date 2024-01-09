"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import Heade from "../Components/Header";
import Nav from "../Components/Nav";
import isAuth from "../Components/Auth";

const Posted = () => {
    const router = useRouter()
    const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);

  const handleCheckbox = (checkboxName: string) => {
    setSelectedCheckbox(checkboxName);
  };
  const handleClick = ()=>{
    console.log(selectedCheckbox)

    if(selectedCheckbox === "Instagram")
    {
        router.push("/posted/Instagram")
    }
    if(selectedCheckbox === "Youtube")
    {
        router.push("/posted/Youtube")
    }
    if(selectedCheckbox === "Telegram")
    {
        router.push("/posted/Telegram")
    }
    if(selectedCheckbox === "Facebook")
    {
        router.push("/posted/Facebook")
    }


  }

  

  return (
    <>
    <Heade/>
   
    <div className="flex-column flex-1 justify-center items-center mb-40">
      <h1 className="text-4xl text-center text-cyan-600 mb-10">Choose A Social Media Profile</h1>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text text-2xl text-cyan-800">Facebook</span>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            name="Facebook"
            checked={selectedCheckbox === "Facebook"}
            onChange={() => handleCheckbox("Facebook")}
          />
        </label>
      </div>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text text-2xl text-red-500">Instagram</span>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            name="Instagram"
            checked={selectedCheckbox === "Instagram"}
            onChange={() => handleCheckbox("Instagram")}
          />
        </label>
      </div>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text text-2xl text-rose-700">Youtube</span>
          <input
            type="checkbox"
            className="checkbox checkbox-error"
            name="Youtube"
            checked={selectedCheckbox === "Youtube"}
            onChange={() => handleCheckbox("Youtube")}
          />
        </label>
      </div>

      <div className="form-control mb-10">
        <label className="cursor-pointer label">
          <span className="label-text text-2xl text-teal-500">Telegram</span>
          <input
            type="checkbox"
            className="checkbox checkbox-accent"
            name="Telegram"
            checked={selectedCheckbox === "Telegram"}
            onChange={() => handleCheckbox("Telegram")}
          />
        </label>
      </div>
      <button
        className="btn btn-outline btn-success w-60 justify-center "
        style={{ marginLeft:"30vw", marginTop: "10px", marginBottom: "10px" }}
        onClick={handleClick}>
      
        Go
      </button>
    </div>
    <Nav/>
    </>
  );
}

export default isAuth(Posted)
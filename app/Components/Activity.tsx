'use client'
import React,{useEffect,useState,createContext,useContext} from 'react';

const Activity = () => {
    return (
      <span style={{marginLeft:"42vw"}} className="loading loading-spinner text-error justify-center items-center  text-center mx-auto text-4xl w-10 m-4"></span>
    );
  };
  const Activity2 = () => {
    return (
      <span style={{marginLeft:"42vw"}} className="loading loading-spinner text-primary justify-center items-center  text-center mx-auto text-4xl w-10 m-4"></span>
    );
  }
  const Activity3 = () => {
    return (
      <span style={{marginLeft:"42vw"}} className="loading loading-spinner text-success justify-center items-center  text-center mx-auto text-4xl w-10 m-4"></span>
    );
  };

export {Activity,Activity2,Activity3};

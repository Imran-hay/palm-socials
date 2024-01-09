"use client"
import Cookies from "universal-cookie";

const cookies = new Cookies();


export const setItem = (key: string, value: any): void => {
   
    cookies.set(key, JSON.stringify(value));
  };
  
  export const getItem = (key: string): string | null => {
    const item = cookies.get(key);
    if (item) {
      return item;
    } else {
      return null;
    }
  };
  
  export const removeItem = (key: string): void => {
    
    cookies.remove(key);
  };
  
  export const clearStorage = (): void => {
   
    
  };
  
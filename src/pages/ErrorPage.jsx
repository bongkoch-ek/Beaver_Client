import React from "react";
import { BeaverLogo } from "../icons";
import BeaverErr from "../pictures/Beaver404.png"
import { useNavigate } from 'react-router-dom'



const ErrorPage = () => { 
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate('/home');
  };


  return (
    <div className="flex items-center justify-center gap-[48px] mt-[100px] ml-[150px] ">
        <div className="flex justify-center ">
          <img src={BeaverErr} className="w-[400px] h-[400px]  bg-gray-100" />
        </div>
        <div className="flex flex-col w-full]  justify-around item-center  gap-6 px-4 items-start">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight ">
            Oh No! Error 404
          </h1>
          <p className="mt-4 text-gray-600 w-3/5 font-light text-md">
            Looks like this page wandered off. Let's get you back to the
            homepage!
          </p>
       
        </div>
      </div>
  );
};

export default ErrorPage;

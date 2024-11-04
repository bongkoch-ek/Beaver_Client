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
    <div className="flex items-center justify-center gap-24  bg-gray-100 min-h-screen ">
        <div className="flex justify-center">
          <img src={BeaverErr} className="w-[410px] h-[410px]  bg-gray-100" />
        </div>
        <div className="flex flex-col w-[15%]  justify-around gap-6 px-4 items-start">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight ">
            Oh No! Error 404
          </h1>
          <p className="mt-4 text-gray-600 font-light text-md">
            Looks like this page wandered off. Let's get you back to the
            homepage!
          </p>
          <button onClick={goToHomepage} className="mt-6 px-6 py-2 bg-[#FFE066] text-black rounded-lg hover:bg-yellow-400">
            Back to Homepage
          </button>
        </div>
      </div>
  );
};

export default ErrorPage;

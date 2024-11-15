import React from 'react'
import BeaverErr401 from "../pictures/Beaver401.png"
import { useNavigate } from 'react-router-dom';



const Error401Page = () => {
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate('/home');
  };


  return (
    <div className="flex items-center justify-center gap-24  bg-gray-100 min-h-screen ml-[200px] ">
        <div className="flex justify-center">
          <img src={BeaverErr401} className="w-[410px] h-[410px]  bg-gray-100" />
        </div>
        <div className="flex flex-col w-full]  justify-around item-center  gap-6 px-4  ">
          <p className="text-5xl w-3/5 font-bold text-gray-900 leading-tight ">
          Oops! 401
          Unauthorized
          </p>
          <p className="mt-4 w-[350px] text-gray-600 font-light text-md">
          We're sorry, but you are not authorized to access 
          this page or resource.
          </p>
        
        </div>
      </div>
  )
}

export default Error401Page

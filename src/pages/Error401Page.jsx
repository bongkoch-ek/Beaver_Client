import React from 'react'
import BeaverErr401 from "../pictures/Beaver401.png"

const Error401Page = () => {
  return (
    <div className="flex items-center justify-center gap-24  bg-gray-100 min-h-screen ">
        <div className="flex justify-center">
          <img src={BeaverErr401} className="w-[410px] h-[410px]  bg-gray-100" />
        </div>
        <div className="flex flex-col w-[15%]  justify-around gap-6 px-4 items-start">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight ">
          Oops! 401
          Unauthorized
          </h1>
          <p className="mt-4 text-gray-600 font-light text-md">
          We're sorry, but you are not authorized to access 
          this page or resource.
          </p>
          <button className="mt-6 px-6 py-2 bg-[#FFE066] text-black rounded-lg hover:bg-yellow-400">
          Back to Homepage
          </button>
        </div>
      </div>
  )
}

export default Error401Page

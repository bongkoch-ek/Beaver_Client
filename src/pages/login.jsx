import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button" 
import BeaverLogo from "../../public/beaver-logo.svg"
import GoogleLogo from "../../public/google-logo.svg"


const Login = () => {
  return (
    <div className="flex flex-col items-center justify-start  min-h-screen bg-gray-100">
      {/* Login Form */}
      <div className="bg-white shadow-lg rounded-lg p-10 mt-10 w-[30%]">
        <div className="flex flex-col items-center mb-6"> 
          <div className='flex justify-center items-center'>
          <h2 className="text-3xl font-semibold">Welcome</h2>
          </div>
          <div className='flex  items-center justify-center gap-2 mt-3'>
          <img src={BeaverLogo} alt="Beaver Icon" className="w-16 h-16 rounded-full " />
          <h3 className="text-[#FFE066] text-5xl font-medium">Beaver</h3>
          </div>
          
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Username</label>
            <input type="text" placeholder="Username" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFE066]" />
          </div>
          <div className="mb-6 ">
            <label className="block text-gray-600 mb-1">Password</label>
            <input type="password" placeholder="Password" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFE066]" />
          </div>
          <button type="submit" className="w-full  bg-[#FFE066] hover:bg-yellow-400 text-black py-2 rounded font-semibold">
            Login
          </button> 
          {/* Line */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          <button type="button" className="w-full flex items-center justify-center bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 py-2 rounded">
            <img src= {GoogleLogo} alt="Google logo" className="w-5 h-5 mr-2 text-[#FFE066] font-semibold" />
            Login with Google Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

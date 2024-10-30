import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button" 
import BeaverLogo from "./assets/logo.jpg"



const Login = () => {
  return (
    <div className="flex flex-col items-center justify-start  min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="w-[95%] rounded-lg m-8 bg-white shadow-md py-4">
        <div className=" mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <div className="flex items-center justify-between w-[350px] ">
          <div className='flex items-center gap-2'>
            <img src={BeaverLogo} alt="Beaver Logo" className="w-10 h-10 rounded-full" />
            <span className="text-[#FFE066] font-bold text-xl">Beaver</span>
          </div>

            <a href="#home" className="hover:underline hover:text-yellow-400">Home</a>
            <a href="#project" className="hover:underline hover:text-yellow-400">Project</a>
            
          </div>
          <div className="flex space-x-8 text-gray-700">
            <a href="#register" className="hover:underline hover:text-yellow-400">Register</a>
            <a href="#login" className="hover:underline hover:text-yellow-400">Login</a>
          </div>
        </div>
      </div>
      
      {/* Login Form */}
      <div className="bg-white shadow-lg rounded-lg p-10 mt-10 w-[30%]">
        <div className="flex flex-col items-center mb-6"> 
          <div className='flex justify-center items-center'>
          <h2 className="text-3xl font-semibold">Welcome</h2>
          </div>
          <div className='flex items-start justify-center gap-2 mt-3'>
          <img src={BeaverLogo} alt="Beaver Icon" className="w-16 h-16 rounded-full mb-3" />
          <h3 className="text-[#FFE066] text-6xl font-medium">Beaver</h3>
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
          <button type="submit" className="w-full  bg-[#FFE066] hover:bg-yellow-400 text-black py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

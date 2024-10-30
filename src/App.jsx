import { useState } from 'react'
import { Button } from "@/components/ui/button" 
import {BeaverLogo} from "./assets/logo.jpg "

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="w-full bg-white shadow-md py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={BeaverLogo} alt="Beaver Logo" className="w-10 h-10 rounded-full" />
            <span className="text-yellow-500 font-bold text-xl">Beaver</span>
          </div>
          {/* Navigation Links */}
          <div className="flex space-x-8 text-gray-700">
            <a href="#home" className="hover:text-yellow-500">Home</a>
            <a href="#project" className="hover:text-yellow-500">Project</a>
          </div>
          {/* Auth Links */}
          <div className="flex space-x-8 text-gray-700">
            <a href="#register" className="hover:text-yellow-500">Register</a>
            <a href="#login" className="text-yellow-500 border-b-2 border-yellow-500 pb-1">Login</a>
          </div>
        </div>
      </div>
      
      {/* Login Form */}
      <div className="bg-white shadow-lg rounded-lg p-10 mt-10 w-80">
        <div className="flex flex-col items-center mb-6">
          <img src={BeaverLogo} alt="Beaver Icon" className="w-16 h-16 rounded-full mb-3" />
          <h2 className="text-2xl font-semibold">Welcome</h2>
          <h3 className="text-yellow-500 text-xl font-bold">Beaver</h3>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Username</label>
            <input type="text" placeholder="Username" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-600 mb-1">Password</label>
            <input type="password" placeholder="Password" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            <button type="button" className="absolute right-3 top-8 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3a7 7 0 00-7 7 7 7 0 0014 0 7 7 0 00-7-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                <path d="M10 5a5 5 0 014.95 4H5.05A5 5 0 0110 5z" />
              </svg>
            </button>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App

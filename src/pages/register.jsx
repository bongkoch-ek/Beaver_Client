import React from "react";
import { useState } from 'react'
import { BeaverLogo, HidePasssword } from "../icons";

const Register = () => {

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Container ด้านนอกของฟอร์ม */}
      <div className="w-[776px] p-[64px] bg-white rounded-3xl shadow-lg">
        {/* Title Section */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <h2 className="text-[#333333] text-2xl font-semibold font-['IBM Plex Sans Thai']">
            Create Account
          </h2>
          <div className="flex items-center gap-4">
            <BeaverLogo
              className="w-[62px] h-[62px] rounded-full"
            />
            <h1 className="text-[#ffe066] text-5xl font-semibold font-['IBM Plex Sans Thai'] leading-[64px]">
              Beaver
            </h1>
          </div>
        </div>

        {/* Account Info Section */}
        <div className="mb-8">
          <h3 className="text-[#333333] text-lg font-normal font-['IBM Plex Sans Thai'] mb-3">
            Account Info
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[#333333] text-sm font-normal ">
                Firstname
              </label>
              <input
                type="text"
                placeholder="Firstname"
                className="w-full px-4 py-2 mt-1 bg-white rounded border border-[#91959a] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[#333333] text-sm font-normal ">
                Lastname
              </label>
              <input
                type="text"
                placeholder="Lastname"
                className="w-full px-4 py-2 mt-1 bg-white rounded border border-[#91959a] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="mt-10 mb-8">
          <h3 className="text-[#333333] text-lg font-normal font-['IBM Plex Sans Thai'] mb-3">
            User Info
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[#333333] text-sm font-normal font-['IBM Plex Sans Thai']">
                Display name
              </label>
              <input
                type="text"
                placeholder="Display name"
                className="w-full px-4 py-2 mt-1 bg-white rounded border border-[#91959a] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[#333333] text-sm font-normal font-['IBM Plex Sans Thai']">
                Email
              </label>
              <input
                type="email"
                placeholder="beaver@gmail.com"
                className="w-full px-4 py-2 mt-1 bg-white rounded border border-[#91959a] focus:outline-none"
              />
            </div>
            <div className="relative w-full">
              <label className="text-[#333333] text-sm font-normal font-['IBM Plex Sans Thai']">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-4 py-2 mt-1 bg-white rounded border border-[#91959a] focus:outline-none"
                
              /> 
              <HidePasssword onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 h-5 mt-1 " />
            </div>
            <div className="relative w-full">
              <label className="text-[#333333] text-sm font-normal font-['IBM Plex Sans Thai']">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Please Type your Password Again"
                className="w-full px-4 py-2 mt-1 bg-white rounded border border-[#91959a] focus:outline-none"
              />
              <HidePasssword onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 h-5 mt-1 " />
            </div>
          </div>
        </div>

        {/* Register Button */}
        <div className="flex justify-center mt-10">
          <button className="w-full max-w-xs px-4 py-2 bg-[#ffe066] text-[#333333] rounded-lg font-semibold font-['IBM Plex Sans Thai'] hover:bg-yellow-400 transition duration-300">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

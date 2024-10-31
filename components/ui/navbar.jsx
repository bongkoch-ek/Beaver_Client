// src/components/Navbar.js
import { BeaverLogo } from "@/src/icons";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex bg-gray-100 p-8">
      {/* Navbar */}
      <div className="w-full rounded-lg py-4 bg-white shadow-md ">
        <div className=" mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <div className="flex items-center justify-between w-[350px] ">
            <div className="flex items-center gap-2">
              < BeaverLogo
                
                className="w-10 h-10 rounded-full"
              />
              <span className="text-[#FFE066] font-bold text-xl">Beaver</span>
            </div>

            <a href="#home" className="hover:underline hover:text-yellow-400">
              Home
            </a>
            <a
              href="#project"
              className="hover:underline hover:text-yellow-400"
            >
              Project
            </a>
          </div>
          <div className="flex space-x-8 text-gray-700">
            <a
              href="#register"
              className="hover:underline hover:text-yellow-400"
            >
              Register
            </a>
            <a href="#login" className="hover:underline hover:text-yellow-400">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

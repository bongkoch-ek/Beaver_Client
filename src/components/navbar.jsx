// src/components/Navbar.js
import { BeaverLogo } from "@/src/icons";
import React, { useState } from "react";
import useUserStore from "../stores/userStore";


const Navbar = () => {

  const user = useUserStore(state => state.user)
  const [isOpen, setIsopen] = useState(false)

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

            <a href="/home" className="hover:underline hover:text-yellow-400">
              Home
            </a>
            <a
              href="/project"
              className="hover:underline hover:text-yellow-400"
            >
              Project
            </a>
          </div>

          {
            user ? (
              <div className="relative bg-neutral-900">
                <button

                  className="flex items-center justify-between gap-2
                          hover:text-yellow-400 hover:scale-105 hover:-translate-y-1 hover:duration-200"
                >
                  <img
                    src={"https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
                    className="w-8 h-8"
                    alt="Profile Icon"
                  />
                  Profile

                </button>
                {isOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-lg z-10 shadow-lg">
                    <li

                      className="py-2 px-3 cursor-pointer rounded-sm hover:bg-neutral-700 hover:duration-200 active:bg-green-400"
                    >
                      Setting
                    </li>
                    <li

                      className="py-2 px-3 cursor-pointer rounded-sm hover:bg-neutral-700 hover:duration-200 active:bg-green-400"
                    >
                      LogOut
                    </li>
                  </ul>
                )}
              </div>
            ) :
              <div className="flex space-x-8 text-gray-700">
                <a
                  href="/register"
                  className="hover:underline hover:text-yellow-400"
                >
                  Register
                </a>
                <a href="/login" className="hover:underline hover:text-yellow-400">
                  Login
                </a>
              </div>
          }


        </div>
      </div>
    </div>
  );
};

export default Navbar;

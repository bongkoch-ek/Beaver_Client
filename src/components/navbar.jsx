// src/components/Navbar.js
import { BeaverLogo } from "@/src/icons";
import React, { useState } from "react";
import useUserStore from "../stores/userStore";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import profileIcon from "../pictures/Beaver401.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const actionLogout = useUserStore((state) => state.actionLogout);
  const [isOpen, setIsopen] = useState(false);

  const navigate = useNavigate();

  const hdlLogout = () => {
    actionLogout();
    navigate("/login");
  };

  return (
    <div className="flex bg-transparent p-8 ">
      {/* Navbar */}
      <div className="w-full rounded-lg py-4 bg-white shadow-md ">
        <div className=" mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <div className="flex items-center justify-between w-[350px] ">
            <div className="flex items-center gap-2">
              <BeaverLogo className="w-10 h-10 rounded-full" />
              <span className="text-[#FFE066] font-bold text-xl">Beaver</span>
            </div>

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                ` hover:border-[#ffe066]/50 px-4 py-2 hover:border-b-4 transition-all duration-200 border-[#ffe066] font-normal text-[16px] text-black ${
                  isActive ? "border-b-4 border-[#ffe066] font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/project"
              end
              className={({ isActive }) =>
                ` hover:border-[#ffe066]/50 px-4 py-2 hover:border-b-4 transition-all duration-200 border-[#ffe066] font-normal text-[16px] text-black ${
                  isActive ? "border-b-4 border-[#ffe066] font-semibold" : ""
                }`
              }
            >
              Project
            </NavLink>
          </div>

          {user ? (
            <div className="relative flex gap-2">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex gap-2 items-center">
                      <img
                        src={profileIcon}
                        alt="profile"
                        width="24px"
                        className="rounded-full w-[24px] h-[24px]"
                      />
                      {user.fullname}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col gap-2 p-4 ">
                      <NavigationMenuLink className="w-32 cursor-pointer text-[#767676] hover:font-semibold">
                        <Link to="/profile">Profile</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="w-32 cursor-pointer text-[#767676] hover:font-semibold">
                        <span onClick={hdlLogout}>Log out</span>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {isOpen && (
                <ul className="absolute right-0 mt-2 w-48 rounded-lg z-10 shadow-lg">
                  <li className="py-2 px-3 cursor-pointer rounded-sm hover:bg-neutral-700 hover:duration-200 active:bg-green-400">
                    Setting
                  </li>
                  <li className="py-2 px-3 cursor-pointer rounded-sm hover:bg-neutral-700 hover:duration-200 active:bg-green-400">
                    LogOut
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex space-x-8 text-gray-700">
              <NavLink
                to="/register"
                end
                className={({ isActive }) =>
                  ` hover:border-[#ffe066]/50 px-4 py-2 hover:border-b-4 transition-all duration-200 border-[#ffe066] font-normal text-[16px] text-black ${
                    isActive ? "border-b-4 border-[#ffe066] font-semibold" : ""
                  }`
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                end
                className={({ isActive }) =>
                  ` hover:border-[#ffe066]/50 px-4 py-2 hover:border-b-4 transition-all duration-200 border-[#ffe066] font-normal text-[16px] text-black ${
                    isActive ? "border-b-4 border-[#ffe066] font-semibold" : ""
                  }`
                }
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

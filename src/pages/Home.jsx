import React from "react";
// import { Beaver, BeaverLogo } from "../icons";
import Beaver from "../pictures/Beaver01.png"

const Home = () => {
  return (
    <div className="flex items-center justify-around bg-gray-100 min-h-screen ">
      <div className="flex flex-col w-[25%] justify-around gap-6 items-start">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight ">
          Keep Your Projects on Track from Start to Finish.
        </h1>
        <p className="mt-4 text-gray-600 font-light text-md">
          Effortless planning, task assignment and real-time updates for total
          project control.
        </p>
        <button className="mt-6 px-6 py-2 bg-[#FFE066] text-black rounded-lg hover:bg-yellow-400">
          Let's get Start
        </button>
      </div>
      <div className="flex justify-center ml-6 ">
        <img src={Beaver}
          className="w-[410px] h-[410px]"
        />
      </div>
    </div>
  );
};

export default Home;

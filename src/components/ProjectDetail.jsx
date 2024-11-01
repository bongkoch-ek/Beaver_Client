import React from "react";

const ProjectDetail = () => {
  return (
    <div className="flex flex-col mx-auto  p-8 w-[90%]">
  

      {/* Project Title */}
      <div className="flex items-center gap-4 pb-[40px]">
        <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
        <p className="text-[32px] font-semibold">Project_Name</p>
      </div>

      {/* Project Detail */}
      <div className="flex flex-col gap-[20px]">
        <p className="text-[24px]">Project Detail</p>
        <p className="text-[14px] text-black">Created by: <span className="text-[#767676]">Username</span></p>
        <p className="text-[14px] text-black">Created Date: <span className="text-[#767676]">29 / 10 / 2567</span></p>
      </div>

      {/* Tab Menu */}
      <div className="flex justify-around w-full h-[50px] mt-[80px]">
        <button className="w-[300px] bg-[#ffea98] text-black rounded-full font-semibold">Task</button>
        <button className="w-[300px] bg-[#ffea98] text-black rounded-full font-semibold">Dashboard</button>
        <button className="w-[300px] bg-[#ffea98] text-black rounded-full font-semibold">Schedule</button>
      </div>
    </div>
  );
};

export default ProjectDetail;

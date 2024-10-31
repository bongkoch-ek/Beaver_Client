import React from "react";

const ProjectPage = () => {
  return (
    
    <div className="bg-gray-100">

    <div className="flex flex-col  min-h-screen p-8 w-[95%] mx-auto bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center ">
        <div className="text-black text-[32px] font-semibold font-['IBM Plex Sans Thai'] leading-[48px]">
          Project
        </div>
        <div className="h-[42px] px-4 py-2 bg-[#ffe066] rounded-lg justify-center items-center gap-2 inline-flex">
          <button className="text-center text-[#333333] text-base font-semibold font-['IBM Plex Sans Thai'] leading-relaxed">
            Create New Project
          </button>
        </div>
      </div>

      {/* Today Lists Section */}
      <div>
        <div className="flex justify-between mt-[32px]">
          <p className="text-[24px] font-normal mb-[20px]">Today Lists</p>
          <p className="text-right text-[#767676] text-lg font-normal font-['IBM Plex Sans Thai'] leading-[30px]">
            29 / 10 / 2567
          </p>
        </div>
      </div>

      <div className="h-40 px-10 py-8 bg-white rounded-[32px] flex-col justify-center items-center gap-6 inline-flex">
        <div className="text-right text-[#767676] text-lg font-normal font-['IBM Plex Sans Thai'] leading-[30px]">
          No tasks due today.
        </div>
      </div>



      {/* Recently Section */}
      <p className="text-black text-2xl font-normal leading-9  mt-[40px] mb-[20px]">
        Recently
      </p>

      <div className="h-40 px-10 py-8 bg-white rounded-[32px] flex-col justify-center items-center gap-6 inline-flex">
        <div className="text-right text-[#767676] text-lg font-normal font-['IBM Plex Sans Thai'] leading-[30px]">
          No tasks due today.
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProjectPage;

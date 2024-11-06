import React from "react";
import EditImageProjectModal from "./EditImageProjectModal";
import useDashboardStore from '../stores/dashboardStore';

const ProjectDetail = () => {
  const { project } = useDashboardStore();
  // const { projectName, projectId } = project;
  return (
    <div>
      <div className="flex text-gray-600 text-[16px] ml-[65px]">
        <a href='/'>Home</a>
        <span className="mx-2">{'>'}</span>
        <a href="/project" >Project</a>
        <span className="mx-2">{'>'}</span>
        <a href="/project/detail" className="font-semibold text-black">Project_Name</a>
      </div>

      <div className="flex flex-col mx-auto gap-[40px] p-8 w-[95%]">


        {/* Project Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {/* {project.projectImage && (
              <img
                src={project.projectImage}
                alt="Project"
                className="w-12 h-12 rounded-lg object-cover"
              />
            )} */} 
            <p className="w-10 h-10 rounded-[4px] object-cover bg-slate-500">pic</p>
          </div>
          
          <div className="flex items-center">
            <p>Beaver Group Project</p>
            {/* <p className="text-[32px] font-semibold">{projectName}</p> */}
          </div>

          <div className="flex items-center"> 
            <EditImageProjectModal
              // projectId={projectId}
              // currentName={projectName}
            />
          </div>
        </div>

        {/* Project Detail */}
        <div className="flex flex-col gap-[20px]">
          <p className="text-[24px]">Project Detail</p>
          <p className="text-[14px] text-black">Created by: <span className="text-[#767676]">Username</span></p>
          <p className="text-[14px] text-black">Created Date: <span className="text-[#767676]">29 / 10 / 2567</span></p>
        </div>

        {/* Tab Menu */}
        <div className="flex justify-center gap-9  h-[50px] mt-[80px]">
          <button className="w-[360px] bg-[#ffe066] rounded-2xl border-4 border-[#ffea98] text-[#333333] text-[18px] font-semibold">Task</button>
          <button className="w-[360px] bg-[#ffe066] rounded-2xl border-4 border-[#ffea98] text-[#333333] text-[18px] font-semibold">Dashboard</button>
          <button className="w-[360px] bg-[#ffe066] rounded-2xl border-4 border-[#ffea98] text-[#333333] text-[18px] font-semibold">Schedule</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

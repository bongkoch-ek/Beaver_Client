import React, { useEffect } from "react";
import EditImageProjectModal from "./EditImageProjectModal";
import useDashboardStore from '../stores/dashboardStore';
import useUserStore from "../stores/userStore";
import { ProjectImg } from "../icons";


const ProjectDetail = (props) => {
  // const { project } = useDashboardStore();
  // const { projectName, projectId } = project;
  const {fetchProject,setActiveTab,activeTab} = props


  return (
    <div>
    <div className="flex text-gray-600 text-[16px] ml-[65px]">
      <a href="/">Home</a>
      <span className="mx-2">{">"}</span>
      <a href="/project">Project</a>
      <span className="mx-2">{">"}</span>
      <a href="/project/detail" className="font-semibold text-black">
        {fetchProject?.data?.projectName}
      </a>
    </div>

    <div className="flex flex-col mx-auto gap-[40px] p-8 w-[95%]">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          {fetchProject ? (
            <img
              src={fetchProject.projectImage}
              alt="Project"
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <ProjectImg className="w-12 h-12 rounded-lg object-cover" />
          )}
        </div>

        <div className="flex items-center">
          <p className="text-[32px] font-semibold">
            {fetchProject?.data?.projectName}
          </p>
        </div>

        <div className="flex items-center">
          <EditImageProjectModal />
        </div>
      </div>

      <div className="flex flex-col gap-[20px]">
        <p className="text-[24px]">Project Detail</p>
        <p className="text-[14px] text-black">
          Created by:{" "}
          <span className="text-[#767676]">
            {fetchProject?.data?.user?.fullname}
          </span>
        </p>
        <p className="text-[14px] text-black">
          Created Date:{" "}
          <span className="text-[#767676]">{fetchProject?.data?.createdAt}</span>
        </p>
      </div>

      {/* Tab Menu */}
      <div className="flex justify-center gap-9 h-[50px] mt-[80px]">
      <button
  className={`w-[360px] ${
    activeTab === "task" ? "bg-[#FFE066] border-[#ffea98]" : "bg-[#00000026] "
  } rounded-2xl border-4 text-[#333333] text-[18px] font-semibold`}
  onClick={() => setActiveTab("task")}
>
  Task
</button>
      <button
  className={`w-[360px] ${
    activeTab === "dashboard" ? "bg-[#FFE066] border-[#ffea98]" : "bg-[#00000026] "
  } rounded-2xl border-4 text-[#333333] text-[18px] font-semibold`}
  onClick={() => setActiveTab("dashboard")}
>
  Dashboard
</button>

<button
  className={`w-[360px] ${
    activeTab === "schedule" ? "bg-[#FFE066] border-[#ffea98]" : "bg-[#00000026] "
  } rounded-2xl border-4 text-[#333333] text-[18px] font-semibold`}
  onClick={() => setActiveTab("schedule")}
>
  Schedule
</button>
      </div>
    </div>
  </div>
);
};

export default ProjectDetail;
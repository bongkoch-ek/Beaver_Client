import React, { useEffect, useState } from "react";
import EditImageProjectModal from "./EditImageProjectModal";
import useDashboardStore from "../stores/dashboardStore";
import useUserStore from "../stores/userStore";
import { ProjectImg } from "../icons";
import { useParams } from "react-router-dom";
import moment from "moment";

const ProjectDetail = (props) => {
  const { projectId } = useParams();
  const { fetchProject, setActiveTab, activeTab } = props;
  const token = useUserStore((state) => state.token);
  const actionGetProjectById = useDashboardStore(
    (state) => state.actionGetProjectById
  );
  const actionCreateActivityLog = useDashboardStore(state => state.actionCreateActivityLog)
  const [projectData, setProjectData] = useState({});

  const fetchInitialProjectData = async () => {
    if (!fetchProject?.data) {
      try {
        const response = await actionGetProjectById(projectId, token);
        setProjectData(response);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    } else {
      setProjectData(fetchProject.data);
    }
  };

  const refreshProject = async () => {
    try {
      const response = await actionGetProjectById(projectId, token);
      console.log("response from actionGetProjectById:", response);
      setProjectData(response); 
    } catch (error) {
      console.error("Failed to refresh project data:", error);
    }
  };

  useEffect(() => {
    fetchInitialProjectData();
  }, [projectId]);

  useEffect(() => {
    actionCreateActivityLog(projectId, token)
  }, [])

  return (
    <div>
      <div className="flex text-gray-600 text-[16px] ml-[65px]">
        <a href="/">Home</a>
        <span className="mx-2">{">"}</span>
        <a href="/project">Project</a>
        <span className="mx-2">{">"}</span>
        <a href="/project/detail" className="font-semibold text-black">
          {projectData?.projectName || "No Project Name"}
        </a>
      </div>

      <div className="flex flex-col mx-auto gap-[40px] p-8 w-[95%]">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {projectData?.projectImage ? (
              <img
                src={projectData.projectImage}
                alt="Project"
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <ProjectImg className="w-12 h-12 rounded-lg object-cover" />
            )}
          </div>

          <div className="flex items-center">
            <p className="text-[32px] font-semibold">
              {projectData?.projectName || "No Project Name"}
            </p>
          </div>

          <div className="flex items-center">
            <EditImageProjectModal
              projectId={projectData?.id}
              currentName={projectData?.projectName}
              onUpdate={refreshProject}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <p className="text-[24px]">Project Detail</p>
          <p className="text-[14px] text-black">
            Created by:{" "}
            <span className="text-[#767676]">
              {projectData?.user?.fullname || "No User"}
            </span>
          </p>
          <p className="text-[14px] text-black">
            Created Date:{" "}
            <span className="text-[#767676]">
              {moment(projectData?.createdAt).format("LL") || "No Date"}
            </span>
          </p>
        </div>
      </div>

      {/* Tab Menu */}
      <div className="flex justify-around gap-9 h-[50px] w-full px-32 mt-10">
        <button
          className={`w-full max-w-[448px] hover:bg-[#FFE066]/50 hover:border-[#ffea98]/50 duration-200 transition-colors ${
            activeTab === "task"
              ? "bg-[#FFE066] border-[#ffea98]"
              : "bg-[#00000026] "
          } rounded-2xl border-4 text-[#333333] text-[18px] font-semibold`}
          onClick={() => setActiveTab("task")}
        >
          Task
        </button>
        <button
          className={`w-full max-w-[448px] hover:bg-[#FFE066]/50 hover:border-[#ffea98]/50 duration-200 transition-colors ${
            activeTab === "dashboard"
              ? "bg-[#FFE066] border-[#ffea98]"
              : "bg-[#00000026] "
          } rounded-2xl border-4 text-[#333333] text-[18px] font-semibold`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={`w-full max-w-[448px] hover:bg-[#FFE066]/50 hover:border-[#ffea98]/50 duration-200 transition-colors ${
            activeTab === "schedule"
              ? "bg-[#FFE066] border-[#ffea98]"
              : "bg-[#00000026] "
          } rounded-2xl border-4 text-[#333333] text-[18px] font-semibold`}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;

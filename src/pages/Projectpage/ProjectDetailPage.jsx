import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserStore from "@/src/stores/userStore";
import ProjectDetail from "@/src/components/ProjectDetail";
import ProjectTask from "@/src/components/ProjectTask";
import ProjectSchedule from "../../pages/Projectpage/ProjectSchedule";
import { getProjectById } from "../../services/DashboardService";
import { ProjectDashboard } from "./ProjectDashboard";
import useDashboardStore from "@/src/stores/dashboardStore";


export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const token = useUserStore((state) => state.token);
  const [fetchProject, setFetchProject] = useState(null); // Use `null` initially to check if data is loaded
  const [activeTab, setActiveTab] = useState("task");
  const actionGetProjectById = useDashboardStore(state => state.actionGetProjectById)

  // Fetch project data
  const fetchData = async () => {
    try {
      const response = await getProjectById(token, projectId);
      setFetchProject(response);
      await actionGetProjectById(projectId,token)
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]); // Run when `projectId` changes

  const renderContent = () => {
    switch (activeTab) {
      case "task":
        return <ProjectTask />;
      case "dashboard":
        return <ProjectDashboard />;
      case "schedule":
        return <ProjectSchedule />;
      default:
        return <ProjectTask />;
    }
  };

  return (
    <div>
      {fetchProject ? ( // Check if `fetchProject` is loaded
        <>
          <ProjectDetail
            fetchProject={fetchProject}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            refreshProjectData={fetchData} // Pass down the refresh function
          />
          {renderContent()}
        </>
      ) : (
        <p>Loading project data...</p> // Display loading text while data is fetching
      )}
    </div>
  );
}

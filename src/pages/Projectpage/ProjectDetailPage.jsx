import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDashboardStore from "@/src/stores/dashboardStore";
import useUserStore from "@/src/stores/userStore";
import ProjectDetail from "@/src/components/ProjectDetail";
import ProjectTask from "@/src/components/ProjectTask";
import {getProjectById} from  "../../services/DashboardService"

export default function ProjectDetailPage() {
  const { projectId } = useParams(); // รับ projectId จาก URL
  const token = useUserStore((state) => state.token);
  const [fetchProject, setFetchProject] = useState([])

  


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProjectById( token,projectId);
        setFetchProject(response); 
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    }

    fetchData();
  }, [])



  return (
    <div>
      <ProjectDetail fetchProject={fetchProject}  />
      <ProjectTask />
    </div>
  );
}

import ProjectDetail from "@/src/components/ProjectDetail";
import ProjectTask from "@/src/components/ProjectTask";
import useDashboardStore from "@/src/stores/dashboardStore";
import useUserStore from "@/src/stores/userStore";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ProjectDetailPage() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const actionGetProjectById = useDashboardStore(
    (state) => state.actionGetProjectById
  );

  useEffect(() => {
    actionGetProjectById(projectId, token);
  }, []);

  const location = useLocation();
  const { projectId } = location.state;

  const project = useDashboardStore((state) => state.project);

  return (
    <div>
      <ProjectDetail />
      <ProjectTask />
    </div>
  );
}

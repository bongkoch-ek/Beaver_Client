import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useDashboardStore from "@/src/stores/dashboardStore";
import useUserStore from "@/src/stores/userStore";
import ProjectDetail from "@/src/components/ProjectDetail";
import ProjectTask from "@/src/components/ProjectTask";

export default function ProjectDetailPage() {
  const { projectId } = useParams(); // รับ projectId จาก URL
  const token = useUserStore((state) => state.token);
  const actionGetProjectById = useDashboardStore((state) => state.actionGetProjectById);

  useEffect(() => {
    actionGetProjectById(projectId, token); // ใช้ projectId เพื่อ fetch ข้อมูลโปรเจกต์
  }, [projectId, token]);

  return (
    <div>
      <ProjectDetail />
      <ProjectTask />
    </div>
  );
}

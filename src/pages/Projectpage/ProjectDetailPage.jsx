import ProjectDetail from '@/src/components/ProjectDetail'
import ProjectTask from '@/src/components/ProjectTask'
import useDashboardStore from '@/src/stores/dashboardStore'
import useUserStore from '@/src/stores/userStore'
import React, { useEffect } from 'react'

export default function ProjectDetailPage(props) {
  // const  {projectId} = props //ส่งเลขproject id เข้ามาด้วย

  const user = useUserStore(state => state.user)
  const token = useUserStore(state => state.token)
  const actionGetProjectById = useDashboardStore(state => state.actionGetProjectById)
  const project = useDashboardStore(state => state.project)
  useEffect(() => {actionGetProjectById(23, token)}, [])
  console.log(project)

  return (
    <div>
      <ProjectDetail />
      <ProjectTask />

    </div>
  )
}

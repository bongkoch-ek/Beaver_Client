import ProjectDetail from '@/src/components/ProjectDetail'
import ProjectTask from '@/src/components/ProjectTask'
import useDashboardStore from '@/src/stores/dashboardStore'
import useUserStore from '@/src/stores/userStore'
import React, { useEffect } from 'react'

export default function ProjectDetailPage() {

  const user = useUserStore(state => state.user)
  // const token = useUserStore(state => state.token)
  // const actionGetProjectById = useDashboardStore(state => state.actionGetProjectById)
  // const project = useDashboardStore(state => state.project)
  // console.log(project)

  return (
    <div>
      <ProjectDetail />
      <ProjectTask />

    </div>
  )
}

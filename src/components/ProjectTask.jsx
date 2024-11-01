import React from 'react'
import TaskMember from './TaskMember'
import TaskLane from './TaskLane'

export default function ProjectTask() {
  return (
    <div className='flex bg-gray-100 w-[90%] mx-auto  pt-[40px] '>

    <div className="h-[951px] w-full px-10 py-16 bg-white rounded-[64px] flex-col justify-start items-start gap-16 inline-flex">


  <TaskMember />
  <TaskLane />

</div>
    </div>
  )
}

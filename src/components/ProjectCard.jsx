import React from 'react'
import { ProjectImg2 } from "../icons";

export default function ProjectCard(props) {

  const { project } = props
console.log(project)

  const sliceStr = (str) => {
    if (str.length > 15) {
      return str.slice(0, 15) + "..."
    }
    else {
      return str;
    }
  }

  const inprogress = project.project.list?.filter(item => item.status === "INPROGRESS").length;
  const done = project.project.list?.filter(item => item.status === "DONE").length;
  const late = project.project.list?.filter(item => item.status === "LATE").length;
  console.log(inprogress)

  return (
    <div className='bg-white rounded-xl p-4 w-60 h-64 hover:shadow-md hover:-translate-y-1'>

      <div className='flex gap-2 pb-3'>
        <div className='w-7 h-7'>
        <ProjectImg2 className="" />
        </div>
        <p className='font-semibold text-xl'>{project.project?.projectName}</p>
      </div>

      <div className='flex flex-col gap-3'>
       
        <div className='flex justify-between items-center'>
          <p>In progress</p>
          <div className='bg-[#FFE066] rounded-full w-9 h-9 items-center flex justify-center'>
            <p className=' font-medium text-[#333333]'>{inprogress}</p>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <p>Done</p>
          <div className='bg-[#43A047] rounded-full w-9 h-9 items-center flex justify-center'>
            <p className=' font-medium text-white'>{done}</p>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <p >Late</p>
          <div className='bg-[#E53935] rounded-full w-9 h-9 items-center flex justify-center'>
            <p className=' font-medium text-white'>{late}</p>
          </div>
        </div>

        <button className='text-end items-end hover:underline'> <p>Continue &ndash;&gt;</p> </button>
      </div>


    </div>
  )
}

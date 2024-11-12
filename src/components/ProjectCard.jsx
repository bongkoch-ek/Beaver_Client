import React from 'react'
import { ProjectImg2 } from "../icons";
import { Link } from "react-router-dom";

export default function ProjectCard(props) {

  const { project } = props

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

  return (
    <div className='bg-white border rounded-xl p-4 w-60 h-64 hover:shadow-md hover:-translate-y-1'>

      <div className='flex gap-2 pb-3'>
        <div className='w-7 h-7'>
        <ProjectImg2 className="" />
        </div>
        <p className='font-semibold text-xl whitespace-nowrap overflow-hidden text-ellipsis w-[80%]'>
          {sliceStr(project.project?.projectName || '')}
        </p>
      </div>

      <div className='flex flex-col gap-3'>
       
        <div className='flex justify-between items-center'>
          <p>In progress</p>
          <div className='bg-[#5DB9F8] rounded-full w-9 h-9 items-center flex justify-center'>
            <p className=' font-medium text-white'>{inprogress}</p>
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
        
        <Link to={`/project/${project.project?.id}`} className='text-end items-end hover:underline pt-4'> <p>Continue</p> </Link>


      </div>


    </div>
  )
}

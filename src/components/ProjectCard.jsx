import React from 'react'

export default function ProjectCard(props) {

  const { project } = props
  console.log( "project" , project.project)

  const sliceStr = (str) => {
    if (str.length > 15) {
      return str.slice(0, 15) + "..."
    }
    else {
      return str;
    }
  }

  return (
    <div className='bg-white rounded-xl p-4 w-60 h-64 hover:shadow-md hover:-translate-y-1'>

      <div className='flex gap-2 pb-3'>
        <div className='bg-slate-400 w-7 h-7'>
          <img src="" alt="" />
        </div>
        <p className='font-semibold text-xl'>{project.project?.projectName}</p>
      </div>

      <div className='flex flex-col gap-3'>
       
        <div className='flex justify-between items-center'>
          <p>In progress</p>
          <div className='bg-[#FFE066] rounded-full w-9 h-9 items-center flex justify-center'>
            <p className=' font-medium text-[#333333]'>5</p>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <p>Done</p>
          <div className='bg-[#43A047] rounded-full w-9 h-9 items-center flex justify-center'>
            <p className=' font-medium text-white'>15</p>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <p >Late</p>
          <div className='bg-[#E53935] rounded-full w-9 h-9 items-center flex justify-center'>
            <p className=' font-medium text-white'>15</p>
          </div>
        </div>

        <button className='text-end items-end hover:underline'>continue </button>
      </div>


    </div>
  )
}

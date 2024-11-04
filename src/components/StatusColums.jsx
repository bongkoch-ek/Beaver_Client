import React from 'react'
import Task from './Task'

export default function StatusColums() {
  return (
    <div className="w-[280px] px-4 py-5 bg-neutral-100 rounded-2xl shadow flex-col justify-start items-start gap-6 inline-flex">
    <div className="self-stretch h-full flex-col justify-start items-start gap-6 flex">



      <div className="w-full flex justify-center">
        <button className="text-center text-[#333333] text-base font-normal leading-relaxed">
          + Create
        </button>
      </div>

      <div className="self-stretch h-min-full flex-col justify-start items-start gap-5 flex">
        <div className="self-stretch px-2 justify-start items-center gap-2 inline-flex">
          <div className="w-4 h-4 relative">
            <div className="w-4 h-4 left-0 top-0 absolute bg-[#E53935] rounded-lg" />
          </div>
          <div className="grow shrink basis-0 text-black text-xl font-semibold leading-[33px]">
            Done (1)
          </div>
          <div className="w-6 h-6 relative" />
        </div>

     {/* ใส่taskตรงนี้ */}
     <Task />
     
        
   
        {/* <div className="self-stretch h-[100px] p-4 bg-neutral-100 rounded-lg flex-col justify-start items-start gap-5 flex">
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                        <p className="grow shrink basis-0 text-center text-[#d3d5d7] text-sm font-normal  leading-[23px]">No task</p>
                    </div>
        </div>  */}
 



      </div>
    </div>
  </div>
  )
}

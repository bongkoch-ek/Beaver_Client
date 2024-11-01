import React from 'react'

export default function TaskLane() {
  return (

    <div className="self-stretch justify-center items-start gap-4 inline-flex ">

        <div className="w-[280px] px-4 py-5 bg-neutral-100 rounded-2xl shadow flex-col justify-start items-start gap-6 inline-flex">
            <div className="self-stretch h-[207px] flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch justify-center items-center gap-[198px] inline-flex">
                    <div className="grow shrink basis-0 h-[30px] justify-center items-center gap-[198px] flex">
                        <div className="px-2.5 py-2 rounded-lg justify-center items-center gap-2 flex">
                            <button className="text-right text-[#333333] text-base font-normal  leading-relaxed">+ Create</button>
                        </div>
                    </div>
                </div>

                <div className="self-stretch h-[153px] flex-col justify-start items-start gap-5 flex">
                    <div className="self-stretch px-2 justify-start items-center gap-2 inline-flex">
                        <div className="w-4 h-4 relative">
                            <div className="w-4 h-4 left-0 top-0 absolute bg-[#91959a] rounded-lg" />
                        </div>
                        <p className="grow shrink basis-0 text-black text-xl font-semibold  leading-[33px]">Todo (0)</p>
                        <div className="w-6 h-6 relative" />
                    </div>
                    <div className="self-stretch h-[100px] p-4 bg-neutral-100 rounded-lg flex-col justify-start items-start gap-5 flex">
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="grow shrink basis-0 text-center text-[#d3d5d7] text-sm font-normal  leading-[23px]">No task</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="w-[280px] px-4 py-5 bg-neutral-100 rounded-2xl shadow flex-col justify-start items-start gap-6 inline-flex">
            <div className="self-stretch h-[207px] flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch justify-center items-center gap-[198px] inline-flex">
                    <div className="grow shrink basis-0 h-[30px] justify-center items-center gap-[198px] flex">
                        <div className="px-2.5 py-2 rounded-lg justify-center items-center gap-2 flex">
                            <button className="text-right text-[#333333] text-base font-normal font-['IBM Plex Sans Thai'] leading-relaxed">+ Create</button>
                        </div>
                    </div>
                </div>

                <div className="self-stretch h-[153px] flex-col justify-start items-start gap-5 flex">
                    <div className="self-stretch px-2 justify-start items-center gap-2 inline-flex">
                        <div className="w-4 h-4 relative">
                            <div className="w-4 h-4 left-0 top-0 absolute bg-[#5DB9F8] rounded-lg" />
                        </div>
                        <p className="grow shrink basis-0 text-black text-xl font-semibold  leading-[33px]">In Progress (0)</p>
                        <div className="w-6 h-6 relative" />
                    </div>
                    <div className="self-stretch h-[100px] p-4 bg-neutral-100 rounded-lg flex-col justify-start items-start gap-5 flex">
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="grow shrink basis-0 text-center text-[#d3d5d7] text-sm font-normal  leading-[23px]">No task</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[280px] px-4 py-5 bg-neutral-100 rounded-2xl shadow flex-col justify-start items-start gap-6 inline-flex">
            <div className="self-stretch h-[207px] flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch justify-center items-center gap-[198px] inline-flex">
                    <div className="grow shrink basis-0 h-[30px] justify-center items-center gap-[198px] flex">
                        <div className="px-2.5 py-2 rounded-lg justify-center items-center gap-2 flex">
                            <button className="text-right text-[#333333] text-base font-normal font-['IBM Plex Sans Thai'] leading-relaxed">+ Create</button>
                        </div>
                    </div>
                </div>

                <div className="self-stretch h-[153px] flex-col justify-start items-start gap-5 flex">
                    <div className="self-stretch px-2 justify-start items-center gap-2 inline-flex">
                        <div className="w-4 h-4 relative">
                            <div className="w-4 h-4 left-0 top-0 absolute bg-[#43A047] rounded-lg" />
                        </div>
                        <p className="grow shrink basis-0 text-black text-xl font-semibold  leading-[33px]">Done (0)</p>
                        <div className="w-6 h-6 relative" />
                    </div>
                    <div className="self-stretch h-[100px] p-4 bg-neutral-100 rounded-lg flex-col justify-start items-start gap-5 flex">
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="grow shrink basis-0 text-center text-[#d3d5d7] text-sm font-normal  leading-[23px]">No task</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-[280px] px-4 py-5 bg-neutral-100 rounded-2xl shadow flex-col justify-start items-start gap-6 inline-flex">
            <div className="self-stretch h-[207px] flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch justify-center items-center gap-[198px] inline-flex">
                    <div className="grow shrink basis-0 h-[30px] justify-center items-center gap-[198px] flex">
                        <div className="px-2.5 py-2 rounded-lg justify-center items-center gap-2 flex">
                            <button className="text-right text-[#333333] text-base font-normal font-['IBM Plex Sans Thai'] leading-relaxed">+ Create</button>
                        </div>
                    </div>
                </div>

                <div className="self-stretch h-[153px] flex-col justify-start items-start gap-5 flex">
                    <div className="self-stretch px-2 justify-start items-center gap-2 inline-flex">
                        <div className="w-4 h-4 relative">
                            <div className="w-4 h-4 left-0 top-0 absolute bg-[#E53935] rounded-lg" />
                        </div>
                        <p className="grow shrink basis-0 text-black text-xl font-semibold  leading-[33px]">Late (0)</p>
                        <div className="w-6 h-6 relative" />
                    </div>
                    <div className="self-stretch h-[100px] p-4 bg-neutral-100 rounded-lg flex-col justify-start items-start gap-5 flex">
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="grow shrink basis-0 text-center text-[#d3d5d7] text-sm font-normal  leading-[23px]">No task</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

       

    </div>
  )
}

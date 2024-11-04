import React from 'react'

export default function TaskMember() {
  return (
    <div className="h-28 px-7 flex-col justify-start items-start gap-10 flex">
    <div className="self-stretch text-black text-lg font-normal  leading-[30px]">Member</div>
    <div className="justify-start items-start gap-4 inline-flex">
        <div className="justify-start items-center gap-4 flex">
            <div className="h-[42px] px-2 py-1.5 bg-[#ffe066] rounded-2xl border-4 border-[#ffea98] justify-center items-center gap-2 flex">
                <div className="grow shrink basis-0 text-center text-[#333333] text-lg font-semibold  leading-[30px]">All</div>
            </div>

            <div className="px-2 py-1.5 bg-black/20 rounded-2xl justify-center items-center gap-2 flex">
                <div className="w-7 h-7 bg-white rounded-3xl flex-col justify-center items-center gap-2 inline-flex">
                    <div className="self-stretch text-center text-[#333333] text-base font-semibold  leading-relaxed">U</div>
                </div>
                <p className="text-[#333333] text-lg font-normal leading-[30px]">Username</p>
            </div>
         
        </div>
        <div className="p-2 bg-black/20 rounded-[360px] border-2 border-white justify-start items-center gap-2 flex">
            <div className="w-6 h-6 relative" />
        </div>
    </div>
    </div>
  )
}



import React from "react";

export default function Task() {
  return (
    <div className="self-stretch h-[109px] p-4 bg-[#cde9fd] rounded-lg flex-col justify-start items-start gap-5 shadow flex">
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
        <div className="grow shrink basis-0 text-black text-sm font-normal font-['IBM Plex Sans Thai'] leading-[23px]">
          Task1232123
        </div>
      </div>
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="px-1.5 py-0.5 bg-white rounded-2xl justify-center items-center gap-0.5 flex">
          <div className="text-center text-[#e53935] text-sm font-semibold  leading-[23px]">
            High
          </div>
        </div>
        <div className="w-[34px] h-[34px] px-2 py-1.5 bg-[#ffe066] rounded-2xl justify-center items-center gap-4 flex">
          <div className="self-stretch text-center text-[#333333] text-base  leading-relaxed">
            U
          </div>
        </div>
      </div>
    </div>
  );
}

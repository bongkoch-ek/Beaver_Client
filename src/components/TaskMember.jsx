import React from "react";
import AddMemberModal from "./AddMemberModal";
import useDashboardStore from "../stores/dashboardStore";
import { Button } from "@/components/ui/button";
import { EditIcon } from "../icons";

export default function TaskMember() {
  const project = useDashboardStore((state) => state.project);

  return (
    <div className="h-28 flex-col justify-start items-start gap-10 flex">
      <div className="self-stretch text-black text-lg font-normal flex gap-2 items-center leading-[30px]">
        Member
        <Button
          className="h-8 w-8 p-2 bg-gray-300 rounded-full justify-center items-center gap-2 flex  hover:bg-gray-500"
          //   onClick={openModal}
        >
          <EditIcon />
        </Button>
      </div>
      <div className="justify-start items-center gap-2 flex">
        <div>
          <AddMemberModal />
        </div>
        <div className="h-[42px] w-[100px] min-w-[80px] px-2 py-1.5 bg-[#ffe066] rounded-2xl border-4 border-[#ffea98] justify-center items-center gap-2 flex">
          <div className="grow shrink basis-0 text-center text-[#333333] text-lg font-semibold  leading-[30px]">
            All
          </div>
        </div>

        <div className="px-2 py-1.5 bg-black/20 rounded-2xl justify-center items-center gap-2 flex">
          <div className="w-7 h-7 bg-white rounded-3xl flex-col justify-center items-center gap-2 inline-flex">
            <div className="self-stretch text-center text-[#333333] text-base font-semibold  leading-relaxed">
              U
            </div>
          </div>
          <p className="text-[#333333] text-lg font-normal leading-[30px]">
            Username
          </p>
        </div>
      </div>
    </div>
  );
}

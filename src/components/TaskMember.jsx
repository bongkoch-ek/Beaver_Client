import React, { useState } from "react";
import AddMemberModal from "./AddMemberModal";
import useDashboardStore from "../stores/dashboardStore";
import { EditIcon, EditMember } from "../icons";
import EditMemberPopOver from "./EditMemberPopOver";

export default function TaskMember() {
  const project = useDashboardStore((state) => state.project);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const toggleShowMembers = () => {
    setShowAllMembers(!showAllMembers);
  };

  return (
    <div className="h-28 px-7 flex-col justify-start items-start gap-10 flex">
      <div className="flex justify-center items-center gap-2  text-black text-lg font-normal  leading-[30px]">
        Member 
        <EditMemberPopOver/>
      </div>
      <div className="justify-start items-start gap-4 inline-flex">
        <div className="justify-start items-center gap-4 flex flex-wrap">
          <div>
            <AddMemberModal />
          </div>
          <button 
            onClick={toggleShowMembers}
            className={`h-[42px] w-[100px] min-w-[80px] px-2 py-1.5 rounded-2xl border-4 
              ${showAllMembers 
                ? 'bg-[#FFE066] border-[#ffea98]' 
                : 'bg-[#f5f5f5] border-transparent hover:bg-[#e5e5e5]'
              } justify-center items-center gap-2 flex`}
          >
            <div className="grow  text-center text-[#333333] text-lg font-semibold leading-[30px]">
              All
            </div>
          </button>

          {showAllMembers && (
            <div className="flex gap-4 flex-wrap">
              {project?.members?.map((member, index) => (
                <div 
                  key={index} 
                  className="px-2 py-1.5 bg-black/20 rounded-2xl justify-center items-center gap-2 flex
                    opacity-0 animate-fadeIn"
                  style={{
                    animationDelay: `${index * 110}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="w-7 h-7 bg-white rounded-3xl flex-col justify-center items-center gap-2 inline-flex">
                    <div className="self-stretch text-center text-[#333333] text-[18px] font-semibold leading-[30px]">
                      {member.user?.displayName?.charAt(0) || 'U'}
                      {/* T */}
                    </div>
                  </div>
                  <p className="text-[#333333] text-lg font-normal leading-[30px]">
                    {member.user?.displayName || 'Username'}
                    {/* Test01 */}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

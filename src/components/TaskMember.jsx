import React, { useState } from "react";
import AddMemberModal from "./AddMemberModal";
import useDashboardStore from "../stores/dashboardStore";
import { EditIcon, EditMember } from "../icons";
import EditMemberPopOver from "./EditMemberPopOver";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function TaskMember() {
  const project = useDashboardStore((state) => state.project);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  
  console.log("Project data:", project);
  console.log("Group members:", project?.groupProject);
  
  const toggleShowMembers = () => {
    setShowAllMembers(!showAllMembers);
    
  };

  const handleMemberClick = (memberId) => {
    setSelectedMember(memberId === selectedMember ? null : memberId);
  };

  return (
    <div className="h-auto px-7 flex-col justify-start items-start gap-10 flex">
      <div className="flex justify-center items-center gap-2 text-black text-lg font-normal leading-[30px]">
        Member 
        <EditMemberPopOver/>
      </div>
      <div className="justify-start items-start gap-4 inline-flex max-w-full overflow-hidden">
        <div className="justify-start items-center gap-4 flex flex-nowrap">
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
            <div className="grow text-center text-[#333333] text-lg font-semibold leading-[30px]">
              All
            </div>
          </button>

          {showAllMembers && (
            <ScrollArea className="max-w-[calc(100vw-470px)]">
              <div className="flex gap-4 pr-4 flex-nowrap">
                {project?.groupProject?.map((member, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleMemberClick(member.user?.id)}
                    className={`px-2 py-1.5 rounded-2xl justify-center items-center gap-2 flex
                      opacity-0 animate-fadeIn whitespace-nowrap cursor-pointer
                      ${selectedMember === member.user?.id ? 'bg-[#FFE066]' : 'bg-black/20'}`}
                    style={{
                      animationDelay: `${index * 110}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <div className="w-7 h-7 bg-white rounded-3xl flex-col justify-center items-center gap-2 inline-flex">
                      <div className="self-stretch text-center text-[#333333] text-[16px] leading-[30px]">
                        {member.user?.displayName?.charAt(0) || 'U'}
                      </div>
                    </div>
                    <p className="text-[#333333] text-lg font-normal leading-[30px]">
                      {member.user?.displayName || 'Username'}
                    </p>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="h-2" />
            </ScrollArea>
          )}

        </div>
      </div>
    </div>
  );
}

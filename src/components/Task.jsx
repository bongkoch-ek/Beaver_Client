import React from "react";
import { motion } from "framer-motion";
import DropTaskIndicator from "./DropTaskIndicator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { EditTaskModal } from "./EditTaskModal";


export default function Task({ item,hdlDragStart }) {

  return (
    <>
    <Dialog>
    <DialogTrigger asChild>
      <motion.div
        key={item.id}
        layout
        draggable="true"
        onDragStart={(e)=>hdlDragStart(e,item)}
        className="cursor-grab w-full active:cursor-grabbing self-stretch h-full my-1 p-4 bg-[#cde9fd] rounded-lg flex-col justify-start items-start gap-5 shadow flex"
      >
        <div className="self-stretch justify-start items-center gap-2 inline-flex">
          <div className="grow shrink basis-0 text-black text-sm font-normal font-['IBM Plex Sans Thai'] leading-[23px]">
            {item.title}
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
      </motion.div>
      </DialogTrigger>
  <EditTaskModal />
</Dialog>
    </>
  );
}



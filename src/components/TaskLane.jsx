import React, { useEffect, useState } from "react";
import StatusColums from "./StatusColums";
import AddNewStatus from "./AddNewStatus";
import useDashboardStore from "../stores/dashboardStore";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function TaskLane({
  taskCard,
  setTaskCard,
  sortedList,
  hdlTaskMove,
  allList,
  setAllList,
}) {
  return (
    <>
      <div className="rounded-[32px] w-full bg-[#B4DFFC]/80 ">
        <ScrollArea className="  min-h-[704px] overflow-x-auto px-7 py-10 scrollbar-white">
          <div className="justify-start items-start gap-4 flex rounded-[32px]  ">
            {sortedList?.map((item) => (
              <StatusColums
                key={item?.id}
                item={item}
                title={item?.title}
                taskCard={taskCard}
                setTaskCard={setTaskCard}
                hdlTaskMove={hdlTaskMove}
                status={item?.status}
                allList={allList}
                setAllList={setAllList}
              />
            ))}
            <AddNewStatus setAllList={setAllList} />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}

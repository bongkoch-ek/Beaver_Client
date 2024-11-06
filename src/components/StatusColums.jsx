import React, { useState } from "react";
import Task from "./Task";
import { motion } from "framer-motion";
import DropTaskIndicator from "./DropTaskIndicator";
import { ThreePointIcon, ThreePointIconWithBG } from "../icons";

export default function StatusColums({
  taskCard,
  setTaskCard,
  hdlTaskMove,
  status,
}) {
  const filteredTaskCard = taskCard.filter((item) => item.column === status);

  const [isActive, setIsActive] = useState(false);

  const hdlDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const hdlDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setIsActive(true);
  };

  const highlightIndicator = (e) => {
    const indicator = getIndicator();
    clearIndicator(indicator);

    const result = getNearestIndicator(e, indicator);
    result.element.style.opacity = "1";
  };

  const clearIndicator = (element) => {
    const indicator = element || getIndicator();

    indicator.forEach((item) => {
      item.style.opacity = "0";
    });
  };

  const getNearestIndicator = (e, indicator) => {
    const DISTANCE_OFFSET = 50;

    const result = indicator.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        // Initial State
        offset: Number.NEGATIVE_INFINITY,
        element: indicator[indicator.length - 1],
      }
    );

    return result;
  };

  const getIndicator = () => {
    return Array.from(document.querySelectorAll(`[data-column="${status}"]`));
  };

  const hdlDragLeave = (e) => {
    clearIndicator();
    setIsActive(false);
  };

  const hdlDragEnd = (e) => {
    const taskId = e.dataTransfer.getData("taskId");
    setIsActive(false);
    clearIndicator();
    hdlTaskMove(taskId, status);

    const indicator = getIndicator();
    const { element } = getNearestIndicator(e, indicator);

    const before = element?.dataset?.before || "-1";

    if (before !== taskId) {
      let newTask = [...taskCard];

      let taskToTransfer = newTask.find((item) => item.id === taskId);
      console.log(taskToTransfer);
      if (!taskToTransfer) return;
      taskToTransfer = { ...taskToTransfer, column: status };

      newTask = newTask.filter((item) => item.id !== taskId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        newTask.push(taskToTransfer);
      } else {
        const insertAtIndex = newTask.findIndex((item) => item.id === before);
        if (insertAtIndex === -1) return;

        newTask.splice(insertAtIndex, 0, taskToTransfer);
      }

      setTaskCard(newTask);
      console.log("Updated task:", taskToTransfer);
    }
  };

  return (
    <motion.div
      layout
      onDrop={hdlDragEnd}
      onDragOver={hdlDragOver}
      onDragLeave={hdlDragLeave}
      className={`w-[264px] px-4 py-4 bg-[#F5F5F5] duration-200 transition-colors ${
        isActive && "border bg-[#f5f5f550] border-[#DDE6F0]"
      } rounded-2xl shadow flex-col justify-start items-start gap-5 inline-flex`}
    >
      <div className="self-stretch h-full flex-col justify-start items-start gap-6 flex">
        <div className="w-full flex justify-center">
          <button className="text-center text-[#333333] text-base font-normal leading-relaxed">
            + Create
          </button>
        </div>

        <div className="self-stretch flex-col justify-start items-start gap-1 flex">
          <div className="self-stretch px-2 justify-start items-center gap-2 inline-flex">
            <div className="w-4 h-4 relative">
              {status === "Late" ? (
                <div className="w-4 h-4 left-0 top-0 absolute bg-[#E53935] rounded-lg" />
              ) : status === "Done" ? (
                <div className="w-4 h-4 left-0 top-0 absolute bg-[#43A047] rounded-lg" />
              ) : status === "In progress" ? (
                <div className="w-4 h-4 left-0 top-0 absolute bg-[#5DB9F8] rounded-lg" />
              ) : (
                <div className="w-4 h-4 left-0 top-0 absolute bg-[#91959A] rounded-lg" />
              )}
            </div>
            <div className="grow shrink basis-0 text-black text-xl font-semibold leading-[33px] flex gap-2">
              {status}
              <div>({filteredTaskCard.length})</div>
            </div>
            <div className="w-6 h-6 relative hover:bg-slate-200 rounded-full flex justify-center items-center ">
              <ThreePointIcon/>
            </div>
          </div>

          {/* ใส่taskตรงนี้ */}
          {filteredTaskCard.map((item) => (
            <>
              <DropTaskIndicator beforeId={item.id} column={item.column} />
              <Task item={item} hdlDragStart={hdlDragStart} />

            </>

          ))}
          <DropTaskIndicator column={status} />

          {/* <div className="self-stretch h-[100px] p-4 bg-neutral-100 rounded-lg flex-col justify-start items-start gap-5 flex">
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                        <p className="grow shrink basis-0 text-center text-[#d3d5d7] text-sm font-normal  leading-[23px]">No task</p>
                    </div>
        </div>  */}
        </div>
      </div>
    </motion.div>
  );
}

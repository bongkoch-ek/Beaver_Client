import React, { useEffect, useRef, useState } from "react";
import Task from "./Task";
import { motion } from "framer-motion";
import DropTaskIndicator from "./DropTaskIndicator";
import io from "socket.io-client";
import useDashboardStore from "../stores/dashboardStore";
import { PlusIcon } from "../icons";
import { ArrowDownIcon } from "lucide-react";
import PrimaryButton from "./common/PrimaryButton";
import SecondaryButton from "./common/SecondaryButton";
import useUserStore from "../stores/userStore";

export default function StatusColums({
  taskCard,
  setTaskCard,
  hdlTaskMove,
  status,
}) {
  const socket = useDashboardStore((state) => state.socket);
  const project = useDashboardStore((state) => state.project);
  const actionGetProjectById = useDashboardStore(
    (state) => state.actionGetProjectById
  );
  const actionCreateTask = useDashboardStore((state) => state.actionCreateTask);
  const token = useUserStore((state) => state.token);
  const filteredTaskCard = taskCard.filter((item) => item.status === status);
  console.log(taskCard,"taskcard")

  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);
  const [isScroll, setIsScroll] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [formTask, setFormTask] = useState({
    title: "",
    listId: "",
  });

  useEffect(() => {
    const container = containerRef.current;

    const hdlScroll = () => {
      if (container) {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        setIsScroll(scrollTop > 0);
        setIsOverflow(scrollHeight > clientHeight);
      }
    };

    if (container) {
      container.addEventListener("scroll", hdlScroll);
      setIsOverflow(container.scrollHeight > container.clientHeight); // Check initial overflow
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", hdlScroll);
      }
    };
  }, [taskCard]); // Re-run when taskCard changes

  useEffect(() => {
    socket.on("move_task", (data) => {
      setTaskCard((prv) =>
        prv.map((item) => {
          return item.id === data.id ? data : item;
        })
      );
    });
  }, [socket]);

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

  const hdlDragEnd = async (e) => {
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
      await socket.emit("cardDragging", taskToTransfer);
    }
  };

  const hdlChangeTask = (e) => {
    setFormTask((prv) => ({
      ...prv,
      [e.target.name]: e.target.value,
    }));
  };

  const hdlCreateTask = async (e) => {
    e.preventDefault();
    await actionCreateTask(token, formTask);
    setIsCreate(false);
  };

  return (
    <motion.div
      layout
      onDrop={hdlDragEnd}
      onDragOver={hdlDragOver}
      onDragLeave={hdlDragLeave}
      className={`w-[264px] px-4 py-4 ${
        isCreate && "pt-0"
      } bg-[#F5F5F5] duration-200 transition-colors ${
        isActive && "border bg-[#f5f5f550] border-[#DDE6F0]"
      } rounded-2xl shadow flex-col justify-start items-start gap-5 inline-flex`}
    >
      <div className="self-stretch h-full flex-col justify-start items-start gap-6 flex">
        <div className="w-full flex justify-center">
          {!isCreate && (
            <button
              onClick={() => setIsCreate(true)}
              className="text-center text-[#333333] text-base font-normal hover:bg-[#00000026] hover:text-white hover:font-semibold w-full p-0.5 rounded-md leading-relaxed"
            >
              + Create
            </button>
          )}
        </div>

        <div className="self-stretch flex-col justify-start items-start gap-1 flex">
          <div className="self-stretch px-2 justify-start items-center gap-2 inline-flex">
            <div className="w-4 h-4 relative">
              {taskCard.status === "Late" ? (
                <div className="w-4 h-4 left-0 top-0 absolute bg-[#E53935] rounded-lg" />
              ) : taskCard.status === "Done" ? (
                <div className="w-4 h-4 left-0 top-0 absolute bg-[#43A047] rounded-lg" />
              ) : taskCard.status === "In progress" ? (
                <div className="w-4 h-4 left-0 top-0 absolute bg-[#5DB9F8] rounded-lg" />
              ) : (
                <div className="w-4 h-4 left-0 top-0 absolute bg-[#91959A] rounded-lg" />
              )}
            </div>
            <div className="grow shrink basis-0 text-black text-xl font-semibold leading-[33px] flex gap-2">
              {taskCard?.status}
              <div>({filteredTaskCard.length})</div>
            </div>
            <div className="w-6 h-6 relative" />
          </div>

          {/* ใส่taskตรงนี้ */}
          {isCreate && (
            <div className="w-full mb-4">
              <textarea
                placeholder="Add task"
                value={formTask.title}
                name="title"
                onChange={hdlChangeTask}
                className="w-full leading-[23px] min-h-[100px] border text-[14px] overflow-auto scrollbar-hide focus:outline-[#5DB9F8] resize-none p-4 rounded-md"
              ></textarea>
              <div className="flex flex-col gap-2">
                <PrimaryButton onClick={hdlCreateTask} text="Create" />
                <SecondaryButton
                  onClick={() => setIsCreate(false)}
                  type="button"
                  text="Back"
                  color="border-none bg-[#F5F5F5]"
                />
              </div>
            </div>
          )}
          <div
            className="relative w-full max-h-[554px] overflow-auto scrollbar-hide"
            ref={containerRef}
          >
            <div className="relative">
              {filteredTaskCard.map((item) => (
                <>
                  <DropTaskIndicator beforeId={item.id} column={item.column} />
                  <Task item={item} hdlDragStart={hdlDragStart} />
                </>
              ))}
              <DropTaskIndicator column={status} />
            </div>
            {isOverflow && (
              <>
                {/* Top blur layer */}
                {isScroll && (
                  <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b z-10 from-[#F5F5F5] via-[#F5F5F5] to-transparent pointer-events-none"></div>
                )}

                {/* Bottom blur layer */}
                {!isScroll && (
                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5] to-transparent pointer-events-none">
                    <button className="bg-[#F5F5F5]/40 rounded-[16px] absolute bottom-3 left-1/2 transform -translate-x-1/2 flex justify-center items-center p-2 hover:bg-slate-200">
                      <ArrowDownIcon className="w-[20px] h-[20px] " />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

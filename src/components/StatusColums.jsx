import React, { useEffect, useRef, useState } from "react";
import Task from "./Task";
import { motion } from "framer-motion";
import DropTaskIndicator from "./DropTaskIndicator";
import useDashboardStore from "../stores/dashboardStore";
import { ArrowDownIcon, Check, X } from "lucide-react";
import PrimaryButton from "./common/PrimaryButton";
import SecondaryButton from "./common/SecondaryButton";
import useUserStore from "../stores/userStore";
import { Dialog } from "@radix-ui/react-dialog";
import DeleteStatusModal from "./DeleteStatusModal";
import { Input } from "@/components/ui/input";
import NoTask from "./NoTask";

export default function StatusColums({
  item,
  title,
  taskCard,
  setTaskCard,
  hdlTaskMove,
  status,
  allList,
  setAllList,
}) {
  const socket = useDashboardStore((state) => state.socket);
  const project = useDashboardStore((state) => state.project);
  const task = useDashboardStore((state) => state.task);

  const actionGetProjectById = useDashboardStore(
    (state) => state.actionGetProjectById
  );
  const actionDeleteColumn = useDashboardStore(
    (state) => state.actionDeleteColumn
  );
  const actionCreateTask = useDashboardStore((state) => state.actionCreateTask);
  const actionEditColumn = useDashboardStore((state) => state.actionEditColumn);
  const actionMoveTask = useDashboardStore((state) => state.actionMoveTask);
  const selectedMember = useDashboardStore((state) => state.selectedMember);
  const token = useUserStore((state) => state.token);
  const filteredTaskCard = taskCard.filter(
    (task) =>
      task.listId === item.id &&
      (!selectedMember ||
        task.assignee.some((assignee) => assignee.userId === selectedMember))
  );

  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isScrollUp, setIsScrollUp] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [formTask, setFormTask] = useState({
    title: "",
    listId: item.id,
  });
  const InitialFormTask = {
    title: "",
    listId: item.id,
  };

  const checkOverFlow = () => {
    if (filteredTaskCard?.length > 4) {
      setIsOverflow(true);
    } else {
      setIsOverflow(false);
    }
  };

  const hdlScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;

      // Scrolling down
      if (scrollTop > 0 && scrollTop < maxScroll) {
        setIsScrollDown(false);
        setIsScrollUp(true);
      }
      // At top
      else if (scrollTop === 0) {
        setIsScrollDown(true);
        setIsScrollUp(false);
      }
    }
  };

  useEffect(() => {
    checkOverFlow();
  }, []);

  useEffect(() => {
    checkOverFlow();
  }, [filteredTaskCard]);

  useEffect(() => {
    const container = containerRef.current;
    hdlScroll();
    if (container) {
      container.addEventListener("scroll", hdlScroll);
      setIsOverflow(container.scrollHeight > container.clientHeight);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", hdlScroll);
      }
    };
  }, []);

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
    if (result.element) {
      result.element.style.opacity = "1";
    }
  };

  const clearIndicator = (element) => {
    const indicator = element || getIndicator();

    indicator.forEach((item) => {
      item.style.opacity = "0";
    });
  };

  const getNearestIndicator = (e, indicator) => {
    const DISTANCE_OFFSET = 50;

    const el = indicator.reduce(
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
        offset: Number.NEGATIVE_INFINITY,
        element: indicator[indicator.length - 1],
      }
    );

    return el;
  };

  const getIndicator = () => {
    return Array.from(document.querySelectorAll(`[data-column="${item.id}"]`));
  };

  const hdlDragLeave = (e) => {
    clearIndicator();
    setIsActive(false);
  };

  const hdlDragEnd = async (e) => {
    const taskId = e.dataTransfer.getData("taskId");
    console.log("Dragged taskId:", taskId);

    setIsActive(false);
    clearIndicator();
    hdlTaskMove(taskId, status);

    const indicator = getIndicator();
    const { element } = getNearestIndicator(e, indicator);

    const before = element?.dataset?.before || "-1";

    if (before !== taskId) {
      let newTask = [...taskCard];

      let taskToTransfer = newTask.find((item) => {
        return item.id === Number(taskId);
      });

      console.log(taskToTransfer, "taskToTranfer");

      if (!taskToTransfer) return;

      if (taskToTransfer?.listId === item.id) {
        console.error("Task is already in the same list");
        return;
      }
      taskToTransfer = { ...taskToTransfer, status: status, listId: item.id };

      newTask = newTask.filter((item) => item.id !== Number(taskId));
      console.log(newTask, "newTask");

      const moveToBack = before === "-1";
      if (moveToBack) {
        newTask.push(taskToTransfer);
      } else {
        const insertAtIndex = newTask.findIndex((item) => {
          return item.id === Number(before);
        });
        if (insertAtIndex === -1) return;

        newTask.splice(insertAtIndex, 0, taskToTransfer);
      }

      setTaskCard(newTask);
      const updatedTask = newTask.find((item) => item.id === Number(taskId));
      console.log(updatedTask, "Update");
      console.log(`Updated ${taskId} task to:`, updatedTask?.listId);

      await actionMoveTask(token, Number(taskId), updatedTask?.listId);
      await actionGetProjectById(project?.id, token);
      await socket.emit("cardDragging", taskToTransfer);
    }
  };

  const hdlChangeTask = (e) => {
    setFormTask((prv) => ({
      ...prv,
      [e.target.name]: e.target.value,
    }));
  };

  const hdlTypeNewTask = () => {
    setIsCreate(true);
  };

  const hdlCreateTask = async (e) => {
    e.preventDefault();
    const newTask = await actionCreateTask(token, formTask);
    setTaskCard((prv) => [
      ...prv,
      {
        ...newTask,
        status: status,
        listId: item.id,
      },
    ]);
    setFormTask(InitialFormTask);
    setIsCreate(false);
    await actionGetProjectById(project?.id, token);
  };

  const hdlDeleteList = async (id) => {
    const selectedList = allList.find((item) => item.id === id);
    const hasTask = selectedList?.task?.length > 0;
    if (hasTask) {
      setIsDisabled(true);
    } else {
      await actionDeleteColumn(token, id);
      await actionGetProjectById(project?.id, token);
      setAllList((prv) => prv.filter((item) => item.id !== id));
    }
  };

  const [isEditedColumn, setIsEditedColumn] = useState(false);
  const [text, setText] = useState(item.title);

  const data = {
    title: text,
  };

  const [error, setError] = useState("");

  const hdlSaveNewNameColumn = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please Type input");
      return;
    }

    if (text) {
      setError("");
    }
    await actionEditColumn(data, token, item.id);
    await actionGetProjectById(project?.id, token);
    setIsEditedColumn(false);
  };

  const hdlCancelNewNameColumn = () => {
    setIsEditedColumn(false);
    setError("");
  };

  const sliceStr = (title) => {
    if (title?.length > 12) {
      return title?.slice(0, 12) + "...";
    } else {
      return title;
    }
  };

  return (
    <>
      <Dialog>
        <motion.div
          layout
          onDrop={hdlDragEnd}
          onDragOver={hdlDragOver}
          onDragLeave={hdlDragLeave}
          className={`w-[264px]  min-h-[218px] max-h-[676px] overflow-hidden px-4 py-2 ${
            isCreate && "pt-0"
          } bg-[#F5F5F5] duration-200 transition-colors ${
            isActive && "border bg-[#f5f5f550] border-[#DDE6F0]"
          } rounded-2xl shadow flex-col justify-start items-start gap-5 inline-flex`}
        >
          <div className="self-stretch h-full flex-col justify-start items-start gap-6 flex">
            <div className="w-full flex justify-center">
              {!isCreate && status == "TODO" && (
                <button
                  onClick={hdlTypeNewTask}
                  className="text-center text-[#333333] text-base font-normal hover:bg-[#00000026] hover:text-white hover:font-semibold w-full p-0.5 rounded-md leading-relaxed"
                >
                  + Create
                </button>
              )}
            </div>
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="w-full justify-start items-center gap-2 flex">
                <div key={item.id} className="w-4 h-4 relative">
                  {item.status === "LATE" ? (
                    <div className="w-4 h-4 left-0 top-0 absolute bg-[#E53935] rounded-lg" />
                  ) : item.status === "DONE" ? (
                    <div className="w-4 h-4 left-0 top-0 absolute bg-[#43A047] rounded-lg" />
                  ) : item.status === "INPROGRESS" ? (
                    <div className="w-4 h-4 left-0 top-0 absolute bg-[#5DB9F8] rounded-lg" />
                  ) : (
                    <div className="w-4 h-4 left-0 top-0 absolute bg-[#91959A] rounded-lg" />
                  )}
                </div>
                <div className=" justify-between min-w-full px-4 text-black text-xl font-semibold leading-[33px] flex">
                  <div className="flex justify-between w-full">
                    {isEditedColumn ? (
                      <div>
                        <div
                          className={`flex items-center w-full gap-2 border border-blue-300 rounded px-1 py-1 ${
                            error && "mb-2"
                          }`}
                        >
                          <div>
                            <Input
                              name="title"
                              type="text"
                              defaultValue={item.title}
                              onChange={(e) => setText(e.target.value)}
                              className="border-none outline-none w-full relative"
                              autoFocus
                            />
                            {error && (
                              <span className="text-red-500 text-[12px] absolute">
                                {error}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={hdlSaveNewNameColumn}
                            className="w-7 h-7 p-2 bg-[#43a047]/20 rounded-[360px] justify-center items-center gap-2 inline-flex"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={hdlCancelNewNameColumn}
                            className="w-7 h-7 p-2 bg-[#e53935]/20 rounded-[360px] justify-center items-center gap-2 inline-flex"
                          >
                            <X className="text-red-500" size={24} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span>
                        {sliceStr(title)} ({filteredTaskCard?.length})
                      </span>
                    )}

                    <div onClick={(e) => e.stopPropagation()}>
                      {/* <Dialog> */}
                      <DeleteStatusModal
                        hdlDeleteList={hdlDeleteList}
                        item={item}
                        isDisabled={isDisabled}
                        setIsDisabled={setIsDisabled}
                        setIsOverflow={setIsDisabled}
                        setIsEditedColumn={setIsEditedColumn}
                        isEditedColumn={isEditedColumn}
                      />
                      {/* </Dialog> */}
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 relative" />
              </div>

              {/* ใส่taskตรงนี้ */}
              {isCreate && (
                <div className="w-full mb-4">
                  <textarea
                    placeholder="Add task - limit 35 character"
                    value={formTask?.title}
                    name="title"
                    onChange={hdlChangeTask}
                    className="w-full leading-[23px] min-h-[100px] border text-[14px] overflow-auto scrollbar-hide focus:outline-[#5DB9F8] resize-none p-4 rounded-md"
                    maxLength={35}
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
                className={`relative w-full max-h-[554px] ${
                  isCreate && "opacity-50"
                } overflow-auto scrollbar-hide`}
                ref={containerRef}
              >
                <div className="relative">
                  {filteredTaskCard.length === 0 && !isCreate ? (
                    <NoTask />
                  ) : (
                    filteredTaskCard.map((item) => (
                      <div key={item.id}>
                        <DropTaskIndicator
                          beforeId={item.id}
                          column={item.listId}
                        />
                        <Task
                          item={item}
                          hdlDragStart={hdlDragStart}
                          projectId={project.id}
                        />
                      </div>
                    ))
                  )}
                  <DropTaskIndicator beforeId={null} column={item.id} />
                </div>
                {isOverflow && (
                  <>
                    {/* Top blur layer */}
                    {isScrollUp && (
                      <div className="absolute top-10 left-0 w-full h-12 bg-gradient-to-b z-10 from-[#F5F5F5] via-[#F5F5F5] to-transparent pointer-events-none"></div>
                    )}

                    {/* Bottom blur layer */}
                    {isScrollDown && (
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
      </Dialog>
    </>
  );
}

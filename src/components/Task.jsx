import React, { useState } from "react";
import { motion } from "framer-motion";
import DropTaskIndicator from "./DropTaskIndicator";
import { toast } from "react-toastify";
import useUserStore from "../stores/userStore";
import { deleteTask } from "../services/DashboardService";
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
import { ThreePointIconWithBG } from "../icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Check,
  ChevronsDown,
  ChevronsUp,
  Equal,
  PencilIcon,
  Trash2Icon,
  TriangleAlert,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useDashboardStore from "../stores/dashboardStore";
import { Input } from "@/components/ui/input";

export default function Task({ item, hdlDragStart, projectId }) {
  const token = useUserStore((state) => state.token);
  const actionGetProjectById = useDashboardStore(
    (state) => state.actionGetProjectById
  );
  const project = useDashboardStore((state) => state.project);
  const actionUpdateTask = useDashboardStore((state) => state.actionUpdateTask);
  const actionDeleteTask = useDashboardStore((state) => state.actionDeleteTask);
  const actionClearTaskId = useDashboardStore(
    (state) => state.actionClearTaskId
  );
  const [taskId, setTaskId] = useState(0);

  const assigneeNames = item?.assignee?.map((item) => item) || [];
  const display = assigneeNames.length > 0 ? assigneeNames[0] : null;
  const actualName = display?.user?.displayName?.charAt(0) || "U";
  const today = new Date().toISOString().split('T')[0]

  const handleDelete = (e) => {
    e.stopPropagation();
  };

  const confirmDelete = async (id) => {
    await actionDeleteTask(token, id);
    await actionGetProjectById(project?.id, token);
  };

  const hdlTaskClick = (e) => {
    e.stopPropagation();
    setTaskId(item.id);
  };

  const hdlOnOpen = async (e) => {
    actionClearTaskId();
    setTaskId(item.id);
  };

  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditText, setIsEditText] = useState(false);
  const [error, setError] = useState("");
  const [text, setText] = useState(item.title);
  const formEditTask = {
    title: text,
    description: item.description,
    startDate: item.startDate,
    dueDate: item.dueDate,
    priority: item.priority,
    list: item.listId,
  };

  const hdlCancelEditText = () => {
    setIsEditText(false);
    setError("");
  };

  const hdlChangeText = async (e, id) => {
    e.preventDefault();
    if (!text.trim()) {
      return setError("Please Type your task");
    }
    await actionUpdateTask(id, formEditTask, token);
    await setIsEditText(false);
    await actionGetProjectById(project?.id, token);
  };

  // console.log(item)
  return (
    <>
      <Dialog onOpenChange={hdlOnOpen} disabled={isEditText}>
        <motion.div
          key={item.id}
          layout
          disabled={isEditText}
          draggable="true"
          onDragStart={(e) => hdlDragStart(e, item)}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={` relative  w-full min-h-[120px] self-stretch my-0.5 p-4 ${
            isEditText
              ? "bg-[#cde9fd]/50 cursor-text my-2"
              : "bg-[#cde9fd] hover:opacity-70 transition-opacity duration-200 active:cursor-grabbing cursor-grab"
          }  rounded-lg flex-col justify-start items-start gap-5 flex`}
        >
          {isEditText ? (
            <div className="flex flex-col gap-4">
              <Input
                name="title"
                type="text"
                defaultValue={item.title}
                onChange={(e) => setText(e.target.value)}
                className="border-none outline-none shadow-none  font-semibold text-[16px]"
                autoFocus
                maxlength={35}
              />
              {error && <span className="text-[#E53935] text-sm">{error}</span>}
              <div className="flex items-center flex-col gap-1 w-full">
                <button
                  onClick={(e) => hdlChangeText(e, item.id)}
                  className="w-full p-2 bg-[#FFE066] hover:bg-[#E8CC5D] rounded-[360px] justify-center items-center gap-2 inline-flex"
                >
                  <Check className="w-4 h-4 relative text-[#333333] " />{" "}
                  <span className="text-[#333333] text-[16px] font-semibold duration-200 transition-all ">
                    Confirm
                  </span>
                </button>
                <button
                  onClick={hdlCancelEditText}
                  className="text-[#767676] text-[14px] p-2 rounded-[360px] justify-center items-center gap-2 inline-flex hover:bg-[#00000026] hover:text-white hover:font-semibold w-full duration-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <DialogTrigger asChild>
              <div
                className="flex flex-col w-full gap-6"
                onClick={(e) => hdlTaskClick(e)}
              >
                <div className="self-stretch justify-between items-center gap-2 flex w-full">
                  <div className=" text-black text-sm font-normal leading-[23px] cursor-pointer w-5/6 flex gap-1">
                    {
                      item.status !== "DONE" &&
                      item.dueDate &&
                      (
                        new Date(item.dueDate) < new Date(today)
                        &&
                        <div className=" h-7 w-7 bg-white rounded-full flex justify-center px-1 items-center">
                          <TriangleAlert className="text-red-500 mt-[-2px]" />
                        </div>
                      )
                    }

                    <article class="truncate w-full">
                      <p className="font-medium">{item.title}</p>
                    </article>
                  </div>
                  <div onClick={(e) => e.stopPropagation()} className="w-1/6">
                    <Popover>
                      <PopoverTrigger
                        style={{ opacity: isHover ? 1 : 0 }}
                        className="transition-opacity duration-200"
                        asChild
                      >
                        <button className="flex w-[28px] h-[28px] mb-1 hover:bg-slate-300 rounded-full cursor-pointer">
                          <ThreePointIconWithBG />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40 p-2">
                        <div className="flex flex-col space-y-1 rounded-[8px]">
                          <button
                            onClick={() => setIsEditText(true)}
                            className="flex items-center gap-2 w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-[8px]"
                          >
                            <PencilIcon className="w-4 h-4" />
                            Edit
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 w-full p-2 text-sm text-red-600 hover:bg-red-50 rounded-[8px]"
                              >
                                <Trash2Icon className="w-4 h-4" />
                                Delete
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white rounded-[16px] p-6 w-[450px] h-[270px]">
                              <div className="flex flex-col items-center gap-6">
                                <AlertDialogHeader className="text-center">
                                  <AlertDialogTitle className="text-2xl font-semibold text-black text-center">
                                    Are you sure you want to delete?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-sm font-[400px] text-red-500 text-center mt-1">
                                    This task cannot be recovered again.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="flex w-[240px] h-[100px] justify-center flex-col gap-4 ">
                                  {/* <AlertDialogCancel>  */}
                                  <AlertDialogCancel className="flex justify-center items-center w-full  px-4 py-2 border border-[#91959A] rounded-[8px] hover:bg-gray-100 text-[#91959A]">
                                    Cancel
                                  </AlertDialogCancel>
                                  {/* </AlertDialogCancel> */}
                                  {/* <AlertDialogAction> */}
                                  <AlertDialogAction
                                    onClick={() =>
                                      confirmDelete(Number(item.id))
                                    }
                                    className="flex justify-center items-center w-full gap-2  px-4 py-2 bg-[#E53935]  text-white rounded-[8px] hover:bg-red-600"
                                  >
                                    <Trash2Icon className="w-[20] h-[20]" />
                                    Delete
                                  </AlertDialogAction>
                                  {/* </AlertDialogAction> */}
                                </div>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="self-stretch justify-between items-center inline-flex">
                  {!isEditText && (
                    <>
                      {item.priority === "HIGH" ? (
                        <div className="flex items-center justify-center text-[#e53935] bg-white pl-0.5 px-1.5 py-0.5 rounded-2xl">
                          <ChevronsUp className="h-5" />{" "}
                          <p className="text-sm font-semibold">High</p>
                        </div>
                      ) : item.priority === "MEDIUM" ? (
                        <div className="flex items-center justify-center text-[#fdc730] bg-white pl-0.5 px-1.5 py-0.5 rounded-2xl">
                          <Equal className="h-5" />{" "}
                          <p className="text-sm font-semibold">Medium</p>
                        </div>
                      ) : item.priority === "LOW" ? (
                        <div className="flex items-center justify-center text-[#5db9f8] bg-white pl-0.5 px-1.5 py-0.5 rounded-2xl">
                          <ChevronsDown className="h-5" />{" "}
                          <p className="text-sm font-semibold">Low</p>
                        </div>
                      ) : null}
                    </>
                  )}

                  {!isEditText && assigneeNames.length > 0 && (
                    <div className="w-[34px] h-[34px] flex items-center justify-center bg-white rounded-full outline outline-4 outline-[#ffe066]">
                      <div className="text-center text-[#333333] font-semibold text-base leading-relaxed">
                        <p>{actualName || "U"}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogTrigger>
          )}
        </motion.div>

        <DialogContent className="max-w-3xl w-[856px] max-h-[70vh] bg-white rounded-2xl flex flex-col gap-5  overflow-y-auto ">
          <DialogHeader hidden>
            <DialogTitle hidden>edit task</DialogTitle>
            <DialogDescription hidden>this is manage task.</DialogDescription>
          </DialogHeader>
          <EditTaskModal
            taskId={taskId}
            item={item}
            projectId={projectId}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

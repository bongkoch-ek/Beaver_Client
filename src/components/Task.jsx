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
import { PencilIcon, Trash2Icon } from "lucide-react";
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

export default function Task({ item, hdlDragStart,projectId }) {
  const token = useUserStore((state) => state.token);
  const actionGetTask = useDashboardStore(state => state.actionGetTask)
  const actionClearTaskId = useDashboardStore(state => state.actionClearTaskId)

  const [taskId, setTaskId] = useState(0)

  const handleEdit = (e) => {
    e.stopPropagation();
    console.log("Edit task:", item.id);
  };


  const handleDelete = (e) => {
    e.stopPropagation();
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(token, parseInt(item.id));
      toast.success("Delete Task success");
      // get().socket.emit("taskDeleted", item.id);

    } catch (err) {
      console.error("Delete Task failed:", err);
      if (err.response?.status === 404) {
        toast.error("Not found Task ,You want to Delete");
      } else {
        toast.error("Delete Task Error");
      }
    }
  };

  const hdlTaskClick = (e) => {
    e.stopPropagation()
    setTaskId(item.id)
  }
  
  const hdlOnOpen = async (e) => {
    actionClearTaskId()
    setTaskId(item.id)
    // await actionGetTask(taskId, token)
  }

  return (
    <>
      <Dialog onOpenChange={hdlOnOpen}>
        <motion.div
          key={item.id}
          layout
          draggable="true"
          onDragStart={(e) => hdlDragStart(e, item)}
          className="cursor-grab hover:opacity-70 transition-opacity duration-200 w-full active:cursor-grabbing self-stretch h-full p-4 bg-[#cde9fd] rounded-lg flex-col justify-start items-start gap-5 flex"
        >
          <DialogTrigger asChild>
            <div className="flex flex-col w-full gap-5" onClick={(e) => hdlTaskClick(e)}>
              <div className="self-stretch justify-between items-center gap-2 inline-flex">
                <div className="grow shrink basis-0 text-black text-sm font-normal font-['IBM Plex Sans Thai'] leading-[23px] cursor-pointer">
                  {item.title}
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="flex w-[28px] h-[28px] mb-1 hover:bg-slate-300 rounded-full cursor-pointer"
                      >
                        <ThreePointIconWithBG />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2">
                      <div className="flex flex-col space-y-1 rounded-[8px]">
                        <button
                          onClick={handleEdit}
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
                          <AlertDialogContent className="bg-white rounded-[16px] p-6 w-[450px] m-auto h-[270px]">
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
                                  onClick={confirmDelete}
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
                <div className="px-1.5 py-0.5 bg-white rounded-2xl justify-center items-center gap-0.5 flex">
                  <div className="text-center text-[#e53935] text-sm font-semibold leading-[23px]">
                    High
                  </div>
                </div>
                <div className="w-[34px] h-[34px] px-2 py-1.5 bg-[#ffe066] rounded-2xl justify-center items-center gap-4 flex">
                  <div className="self-stretch text-center text-[#333333] text-base leading-relaxed">
                    U
                  </div>
                </div>
              </div>
            </div>
          </DialogTrigger>
        </motion.div>

        <DialogContent className="max-w-3xl w-[856px] max-h-[70vh] bg-white rounded-2xl flex flex-col gap-5  overflow-y-auto ">
          <DialogHeader hidden>
            <DialogTitle hidden>edit task</DialogTitle>
            <DialogDescription hidden>
              this is manage task.
            </DialogDescription>
          </DialogHeader>
          <EditTaskModal  taskId={taskId} item={item} projectId={projectId}/>
        </DialogContent>
      </Dialog>
    </>
  );
}



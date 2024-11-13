import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { ThreePointIcon } from "../icons";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DeleteStatusModal = ({
  hdlDeleteList,
  item,
  isDisabled,
  setIsDisabled,
  setIsEditedColumn,
  isEditedColumn,
}) => {
  return (
    <div>
      <Dialog>
        <Popover>
          <AlertDialog>
            {!isEditedColumn && (
              <PopoverTrigger asChild>
                <button className="flex w-[28px] relative h-[28px] mb-1 hover:bg-slate-300 rounded-full cursor-pointer">
                  <ThreePointIcon />
                </button>
              </PopoverTrigger>
            )}

            <PopoverContent className="absolute top-1.5 -left-4 w-40 p-2 bg-white rounded-lg z-20 shadow-md">
              <div className="flex flex-col space-y-1 rounded-[8px]">
                <button
                  onClick={() => setIsEditedColumn(true)}
                  className="flex items-center gap-2 w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-[8px]"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
                <AlertDialogTrigger asChild>
                  <button className="flex items-center gap-2 w-full p-2 text-sm text-red-600 hover:bg-red-50 rounded-[8px]">
                    <Trash2Icon className="w-4 h-4" />
                    Delete
                  </button>
                </AlertDialogTrigger>
              </div>
            </PopoverContent>
            {/* <DialogContent> */}
            <AlertDialogContent>
              <div className="flex flex-col items-center gap-6">
                <AlertDialogHeader className="text-center">
                  <AlertDialogTitle className="text-2xl font-semibold text-black text-center">
                    Are you sure you want to delete?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm font-[400px] text-red-500 text-center mt-1">
                    {isDisabled ? (
                      <p>Sorry, there still be any task </p>
                    ) : (
                      <p>This list cannot be recovered again.</p>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex w-[240px] h-[100px] justify-center flex-col gap-4 ">
                  <AlertDialogCancel
                    onClick={() => setIsDisabled(false)}
                    className="flex justify-center items-center w-full px-4 py-2 border border-[#91959A] rounded-[8px] hover:bg-gray-100 text-[#91959A]"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => hdlDeleteList(item.id)}
                    className="flex justify-center items-center w-full gap-2  px-4 py-2 bg-[#E53935] text-white rounded-[8px] hover:bg-red-600"
                  >
                    <Trash2Icon />
                    Delete
                  </AlertDialogAction>
                </div>
              </div>
            </AlertDialogContent>
          </AlertDialog>
          {/* </DialogContent> */}
        </Popover>
      </Dialog>
    </div>
  );
};

export default DeleteStatusModal;

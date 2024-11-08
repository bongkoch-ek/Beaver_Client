import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paperclip } from "lucide-react";
import UploadFile from "./UploadFile";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import {
  ChevronsDown,
  ChevronsUp,
  CalendarIcon,
  Equal,
  Pencil,
  PencilIcon,
  X,
  Check
} from "lucide-react";

export function EditTaskModal() {
  const [dueDate, setDueDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [priority, setPriority] = useState("Medium");
  const [taskName, setTaskName] = useState("Task_Name");
  const [isEditing, setIsEditing] = useState(false);
  const [tempTaskName, setTempTaskName] = useState(taskName);

 
  const hdlEdit = () => {
    setIsEditing(true);
    setTempTaskName(taskName);
  };

  
  const hdlSave = () => {
    setTaskName(tempTaskName);
    setIsEditing(false);
  };

 
  const hdlCancle = () => {
    setIsEditing(false);
    setTempTaskName(taskName);
  };

  return (
    <DialogContent className="inset-0 max-w-3xl w-[856px] max-h-min p-12 bg-white rounded-2xl flex flex-col justify-center gap-8 mx-auto mt-[100px]">
      <div className="flex flex-col space-y-8 ">
        {/* ชื่อ Task */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className="flex items-center w-full gap-2 border border-blue-300 rounded px-2 py-1">
              <Input
                type="text"
                value={tempTaskName}
                onChange={(e) => setTempTaskName(e.target.value)}
                className="border-none outline-none w-full"
                autoFocus
              />
              <button onClick={hdlSave}
               className="w-7 h-7 p-2 bg-[#43a047]/20 rounded-[360px] justify-center items-center gap-2 inline-flex">
                <Check className="w-3.5 h-3.5 relative" />
              </button>
              <button onClick={hdlCancle}
              className="w-7 h-7 p-2 bg-[#e53935]/20 rounded-[360px] justify-center items-center gap-2 inline-flex">
                <X className="text-red-500" size={24} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{taskName}</span>
              <button onClick={hdlEdit}
              className="w-7 h-7 p-2 bg-black/20 rounded-[360px] justify-center items-center gap-2 inline-flex">
                <PencilIcon className="w-3.5 h-3.5 relative" />
                

              </button>
            </div>
          )}
        </div>

        {/* data */}
        <div className="space-y-4">
          {/* Status */}
          <div className="flex gap-4  items-center">
            <div className="text-[#333333] text-sm font-semibold">Status:</div>
            <div className="text-[#767676] text-sm">In progress</div>
          </div>

          {/* Priority */}
          <div className="flex gap-4 items-center">
            <p className="text-[#333333] text-sm font-semibold">Priority:</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center py-1 bg-white shadow rounded-2xl "
                >
                  {priority === "High" && (
                    <ChevronsUp className="text-[#e53935]" />
                  )}
                  {priority === "Medium" && (
                    <Equal className="text-[#fdc730]" />
                  )}
                  {priority === "Low" && (
                    <ChevronsDown className="text-[#5db9f8]" />
                  )}

                  <p
                    className={`text-sm font-semibold ${
                      priority === "High"
                        ? "text-[#e53935]"
                        : priority === "Medium"
                        ? "text-[#fdc730]"
                        : "text-[#5db9f8]"
                    }`}
                  >
                    {priority}
                  </p>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="flex flex-col space-y-2">
                <Button
                    variant="ghost"
                    className="text-[#e53935] text-sm font-semibold flex items-center "
                    onClick={() => setPriority("High")}
                  >
                    <ChevronsUp className="text-[#e53935]" />
                    <span>High</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-[#fdc730] text-sm font-semibold flex items-center "
                    onClick={() => setPriority("Medium")}
                  >
                    <Equal className="text-[#fdc730]" />
                    <span>Medium</span>
                  </Button>

                  <Button
                    variant="ghost"
                    className="text-[#5db9f8] text-sm font-semibold flex items-center"
                    onClick={() => setPriority("Low")}
                  >
                    <ChevronsDown className="text-[#5db9f8]" />
                    <span>Low</span>
                  </Button>
              

               
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* ผู้รับผิดชอบ */}
          <div className="flex gap-4 items-center">
            <p className="text-[#333333] text-sm font-semibold">Assignee:</p>
            <p className="text-[#767676] text-sm">Username1</p>
          </div>

          {/* วันเริ่มต้นงาน */}
          <div className="flex gap-4 items-center">
            <p className="text-[#333333] text-sm font-semibold">Start date:</p>
            <p className="text-[#767676] text-sm">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex items-center py-1 bg-white shadow rounded-2xl",
                      !startDate && "text-gray-500"
                    )}
                  >
                    <CalendarIcon className="text-gray-600" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </p>
          </div>

          {/* วันครบกำหนด */}
          <div className="flex  gap-4  items-center">
            <p className="text-[#333333] text-sm font-semibold">Due date:</p>
            <p className="text-[#767676] text-sm">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex items-center py-1 bg-white shadow rounded-2xl",
                      !dueDate && "text-gray-500"
                    )}
                  >
                    <CalendarIcon className=" text-gray-600" />
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </p>
          </div>

          {/* ผู้สร้างงาน */}
          <div className="flex  gap-4  items-center">
            <p className="text-[#333333] text-sm font-semibold">Created by:</p>
            <p className="text-[#767676] text-sm">Username 20</p>
          </div>
        </div>

        {/* อัปโหลดไฟล์ */}
        <UploadFile />

        {/* ลิงก์ URL */}
        <div className="space-y-2">
          <p className="text-sm font-semibold">Link URL</p>
          <Input placeholder="www.beaver.co.th" />
        </div>

        {/* คอมเมนต์ */}
        <Input placeholder="Add a comment..." />
      </div>
    </DialogContent>
  );
}

import { Button } from "@/components/ui/button";
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
import { Paperclip } from 'lucide-react';
import { Equal } from 'lucide-react';
import UploadFile from "./UploadFile";


export function EditTaskModal() {
  return (
   
    
      <DialogContent className="inset-0 max-w-3xl w-[856px] max-h-min p-12 bg-white rounded-2xl flex flex-col justify-center gap-8 mx-auto">
    <div className="flex flex-col space-y-8 ">
    
    {/* ชื่อ Task */}
    <p className="text-[#333333] text-2xl font-semibold leading-9">Task_Name</p>

    {/* รายละเอียดของ Task */}
    <div className="space-y-4">
      
      {/* สถานะของงาน */}
      <div className="flex gap-4  items-center">
        <div className="text-[#333333] text-sm font-semibold">Status:</div>
        <div className="text-[#767676] text-sm">In progress</div>
      </div>

      {/* ลำดับความสำคัญ */}
      <div className="flex  gap-4  items-center">
        <p className="text-[#333333] text-sm font-semibold">Priority:</p>
        <div className="flex items-center space-x-2 px-2 py-1 bg-white shadow rounded-2xl">
          <Equal className="text-[#fdc730]" />
          <p className="text-[#fdc730] text-sm font-semibold">Medium</p>
        </div>
      </div>

      {/* ผู้รับผิดชอบ */}
      <div className="flex gap-4 items-center">
        <p className="text-[#333333] text-sm font-semibold">Assignee:</p>
        <p className="text-[#767676] text-sm">Username1</p>
      </div>

      {/* วันเริ่มต้นงาน */}
      <div className="flex gap-4 items-center">
        <p className="text-[#333333] text-sm font-semibold">Start date:</p>
        <p className="text-[#767676] text-sm">10 / 10 / 2567</p>
      </div>

      {/* วันครบกำหนด */}
      <div className="flex  gap-4  items-center">
        <p className="text-[#333333] text-sm font-semibold">Due date:</p>
        <p className="text-[#767676] text-sm">20 / 10 / 2567</p>
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
      <Input placeholder='www.beaver.co.th' />
    </div>

    {/* คอมเมนต์ */}
    <Input placeholder='Add a comment...' />

  </div>
</DialogContent>

   
  );
}

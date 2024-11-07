import React, { useState } from "react";
import { AddMemberIcon, PlusIcon } from "../icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectGroup } from "@/components/ui/select"
import useDashboardStore from '../stores/dashboardStore'
import useUserStore from '../stores/userStore'
import { Cross2Icon } from "@radix-ui/react-icons";

const AddNewStatus = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const actionCreateColumn = useDashboardStore(state => state.actionCreateColumn)
  const project = useDashboardStore(state => state.project)
  const token = useUserStore(state => state.token)

  const data = { name: text, projectId: project.id, status: status }
  const handleSubmit = () => {
    if (!text.trim()) {
      setError("Please select status type");
      return;
    }

    //ใส่API เพื่อเพิ่มสมาชิก
    console.log({ text, status });
    setError("");
    setIsOpen(false)
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="bg-[#F5F5F5] rounded-[16px] justify-center items-center p-2 hover:bg-slate-200 flex"
        >
          <PlusIcon className="w-[24px] h-[24px] " />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[480px] m-auto inset-0 h-[360px]">
        <div className="flex flex-col gap-6 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-normal">Add new status</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-[#333333]">Status Name</label>
              <Input
                type="text"
                placeholder="Type your new status name"
                value={text}
                onChange={handleTextChange}
                className={`mt-1 focus:border-[#5DB9F8] `}
              />
            </div>

            <div>
              <label
                className={`text-sm ${
                  error ? "text-red-500" : "text-[#333333]"
                }`}
              >
                Status type
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger
                  className={`mt-1 ${error ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="font-normal text-[14px]">
                      Select Status
                    </SelectLabel>
                    <SelectItem
                      value="TO DO"
                      className="font-normal text-[14px]"
                    >
                      To do
                    </SelectItem>
                    <SelectItem
                      value="In Progress"
                      className="font-normal text-[14px]"
                    >
                      In Progress
                    </SelectItem>
                    <SelectItem
                      value="Done"
                      className="font-normal text-[14px]"
                    >
                      Done
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>

          <div className="flex flex-row justify-center items-center">
            <button
              onClick={handleSubmit}
              className="bg-[#FFE066] text-[#333333] w-[90px] h-[42px] rounded-[8px] hover:bg-yellow-400 font-semibold flex items-center justify-center gap-2"
            >
              Add
              <PlusIcon className="mb-1" />
            </button>
          </div>
        </div>
        <div className="absolute right-4 top-4  opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground bg-red-600 rounded-full p-2">
          <Cross2Icon onClick={()=>setIsOpen(false)} className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewStatus;

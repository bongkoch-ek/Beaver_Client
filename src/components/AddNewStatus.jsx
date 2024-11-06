import React, { useState } from 'react'
import { AddMemberIcon, PlusIcon } from '../icons'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,SelectLabel,SelectGroup } from "@/components/ui/select"

const AddNewStatus = () => {
    const [text, setText] = useState('')
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!text.trim()) {
      setError('Please select status type')
      return
    }
    
    //ใส่API เพื่อเพิ่มสมาชิก
    console.log({ text, status })
    setError('')
  }

  const handleTextChange = (e) => {
    setText(e.target.value)
    setError('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#F5F5F5] rounded-[16px] justify-center items-center w-[55px] h-[55px] hover:bg-slate-200  flex">
          <PlusIcon className="w-10 h-10 " />
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
            <label className={`text-sm ${error ? 'text-red-500' : 'text-[#333333]'}`}>Status type</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className={`mt-1 ${error ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="font-normal text-[14px]">Select Status</SelectLabel>
                    <SelectItem value="TO DO" className="font-normal text-[14px]">To do</SelectItem>
                    <SelectItem value="In Progress" className="font-normal text-[14px]">In Progress</SelectItem>
                    <SelectItem value="Done" className="font-normal text-[14px]">Done</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>

          <div className='flex flex-row justify-center items-center'>
            <button
              onClick={handleSubmit}
              className="bg-[#FFE066] text-[#333333] w-[90px] h-[42px] rounded-[8px] hover:bg-yellow-400 font-semibold flex items-center justify-center gap-2"
            >
              Add 
              <PlusIcon className="mb-1"/>
            </button>
          </div>  
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewStatus

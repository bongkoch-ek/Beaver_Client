import React, { useState } from 'react'
import { AddMemberIcon, PlusIcon } from '../icons'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,SelectLabel,SelectGroup } from "@/components/ui/select"

const AddMemberModal = () => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    
    //ใส่API เพื่อเพิ่มสมาชิก
    console.log({ email, role })
    setError('')
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-[360px] justify-start items-center gap-4 flex hover:bg-slate-200 ">
          <AddMemberIcon className="w-10 h-10 " />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[480px] m-auto inset-0 h-[360px]">
        <div className="flex flex-col gap-6 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-normal">Add new member</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className={`text-sm ${error ? 'text-red-500' : 'text-[#333333]'}`}>Email</label>
              <Input
                type="email"
                placeholder="Type email for new team member" 
                value={email}
                onChange={handleEmailChange}
                className={`mt-1 focus:border-[#5DB9F8] ${error ? 'border-red-500' : ''}`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div>
              <label className="text-sm text-[#333333]">Role</label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="font-normal text-[14px]">Select role</SelectLabel>
                    <SelectItem value="Member" className="font-normal text-[14px]">Member</SelectItem>
                    <SelectItem value="Mannager" className="font-normal text-[14px]">Owner</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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

export default AddMemberModal

import React, { useState } from 'react';
import {Button} from '../../components/ui/button'
import {Input} from "../../components/ui/input" 
import {Dialog,DialogPortal,DialogOverlay,DialogTrigger,DialogClose,DialogContent,DialogHeader,DialogFooter,DialogTitle,DialogDescription,} from "../../components/ui/dialog"
import { Label } from '@/components/ui/label';

const CreateProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log("Opening modal...");
    setIsOpen(true)};
  const closeModal = () => setIsOpen(false);

  const handleCreateProject = () => {
    //Create logic
    closeModal();
  };

  return (
    <div>
      <Button className="bg-[#ffe066] text-black hover:bg-yellow-400" onClick={openModal}>
        Create New Project
        </Button>

      {/* <Dialog  open={isOpen} onOpenChange={setIsOpen}> */} 
      <Dialog className="flex justify-center items-center" open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className=" flex items-center justify-around rounded-lg gap-16 ">

            
            <div className="flex flex-col gap-6 p-8  items-center justify-center border-2 border-gray-200 rounded-lg">
              <div className='bg-gray-400 w-[120px] h-[120px] flex justify-center items-center rounded-md'>
                Pic
              </div>
              {/* <Label htmlFor="uploadImage" className="block text-sm font-medium text-gray-700 ">
                Upload Image
              </Label> */}
              <Input type="file" id="uploadImage" className="w-full border border-gray-300 p-2 rounded-md" />
            </div>

            {/* ซีกขวา: Input Email และปุ่ม Create Project */}
            <div className="flex flex-col  justify-center items-center">
              <div className="grid w-full max-w-sm items-center ">
              <Label htmlFor="email" className=" text-sm font-medium text-[#333333] mb-1 flex">
                Project Name
              </Label>
              <Input id="email" type="email" placeholder="Type your project" className="w-full text-[#C0C0C0] border border-gray-300 p-2 rounded-md " />
              </div>
              <div className='flex'>
              <DialogFooter className="flex justify-center items-center mt-4">
                <Button onClick={handleCreateProject} className="bg-[#ffe066] text-black px-4 py-2 rounded hover:bg-yellow-400">
                  Create New Project
                </Button>
              </DialogFooter> 
              </div>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProjectModal



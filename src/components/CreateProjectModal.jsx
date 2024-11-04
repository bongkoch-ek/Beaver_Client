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
      <Dialog  open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-lg gap-16 h-[400px] max-w-3xl">

            <div className="flex flex-col gap-6 p-8 items-center justify-center border-2 border-gray-200 rounded-lg h-[300px]">
              <div className='bg-gray-400 w-[120px] h-[120px] flex justify-center items-center rounded-md'>
                Pic
              </div>
              <Input type="file" id="uploadImage" className="w-full border border-gray-300 p-2 rounded-md" />
            </div>

            <div className="flex flex-col justify-center items-center h-[300px] gap-8">
              <div className="grid w-full max-w-sm items-center">
                <Label htmlFor="email" className="text-sm font-medium text-[#333333] mb-1 flex">
                  Project Name
                </Label>
                <Input id="email" type="email" placeholder="Type your project" className="w-full text-[#C0C0C0] border border-gray-300 p-2 rounded-md" />
              </div>
              <DialogFooter>
                <Button onClick={handleCreateProject} className="bg-[#ffe066] text-black px-4 py-2 rounded hover:bg-yellow-400">
                  Create New Project
                </Button>
              </DialogFooter>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProjectModal



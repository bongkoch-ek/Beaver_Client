import React, { useState } from 'react';
import {Button} from '../../components/ui/button'
import {Input} from "../../components/ui/input" 
import {Dialog,DialogPortal,DialogOverlay,DialogTrigger,DialogClose,DialogContent,DialogHeader,DialogFooter,DialogTitle,DialogDescription,} from "../../components/ui/dialog"
import { Label } from '@/components/ui/label';
import { CloudIcon, VectorIcon, CloseIcon } from '../icons';

const CreateProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [input, setInput] = useState({
		projectName: '',
	})
  const [error, setError] = useState('');

  const openModal = () => {
    console.log("Opening modal...");
    setIsOpen(true)};
  const closeModal = () => setIsOpen(false);

  const handleCreateProject = () => {
    if (!input.projectName.trim()) {
      setError('Project name is required');
      return;
    }
    setError('');
    closeModal();
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      projectName: e.target.value
    });
    setError('');   //clear error
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Button className="h-[42px] px-4 py-2 bg-[#ffe066] rounded-lg justify-center items-center gap-2 inline-flex text-[#333333] hover:bg-yellow-400" onClick={openModal}>
        Create New Project
        </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="fixed inset-0 flex items-center justify-center rounded-lg gap-16 h-[400px] max-w-3xl m-auto ">
          <div className="flex flex-col gap-6 p-8 items-center justify-center border-2 border-gray-400 rounded-[32px] h-[240px] w-[180px]">
            <div className='bg-gray-400 w-[120px] h-[120px] flex justify-center items-center rounded-md overflow-hidden'>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <CloudIcon className="w-12 h-12 text-gray-600" />
              )}
            </div>
            <Input 
              type="file" 
              id="uploadImage" 
              className="w-full border border-gray-300 p-2 rounded-md hover:border-gray-600"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="flex flex-col justify-center items-center h-[240px] w-[380px] gap-8">
            <div className="grid w-full max-w-sm items-center">
              <Label htmlFor="projectName" className={`text-sm font-medium text-[#333333] mb-1 flex ${error ? 'text-red-500':'text-[#333333]'}`}>
                Project Name
              </Label>
              <Input 
                id="projectName"
                type="text"
                value={input.projectName}
                onChange={handleInputChange}
                placeholder="Type your project"
                className={`w-full border focus:border-[#5DB9F8] ${error ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md`}
              />
              {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
            </div>
            <DialogFooter>
              <Button onClick={handleCreateProject} className="bg-[#ffe066] text-black px-4 py-2 rounded-[8px] hover:bg-yellow-400">
                Create New Project
                <VectorIcon className = "p-0"/>
              </Button> 
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProjectModal



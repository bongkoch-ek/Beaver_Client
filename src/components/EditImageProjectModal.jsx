import React, { useState } from 'react';
import {Button} from '../../components/ui/button'
import {Input} from "../../components/ui/input" 
import {Dialog,DialogContent,DialogFooter} from "../../components/ui/dialog"
import { Label } from '@/components/ui/label';
import { CloudIcon, VectorIcon, CloseIcon, EditIcon } from '../icons';
import  useDashboardStore  from '../stores/dashboardStore';
import UploadFileProject from './UploadFileProject';
import useUserStore from '../stores/userStore';


const initialState = {
  projectName : "",
  images : []
}

const EditImageProjectModal = ({projectId, currentName}) => {
  const token = useUserStore((state) => state.token);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    projectName: currentName || "",
    images: []
  });
  const [error, setError] = useState("");
  const actionUpdateProject = useDashboardStore(state => state.actionUpdateProject);


  const openModal = () => {
    console.log("Opening modal...");
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const handleEditProject = async (e) => {
    e.preventDefault();
    if (!input.projectName.trim()) {
      setError('Project name is required');
      return;
    }
  
    try {
      const projectData = {
        projectName: input.projectName,
        images: input?.images,
      };
  
      const res = await actionUpdateProject(projectData, token);
      
      if (res && res.message) {
        console.log(res.message); 
        toast.success(res.message); 
      } else {
        console.log('No message in response');
      }
      setIsOpen(false);
      setInput(initialState);
      closeModal(); 
    } catch (err) {
      console.log(err);
      setError('Failed to create project. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      projectName: e.target.value,
      images: input?.images,
    });
    setError(''); 
  };



  return (
    <div>
      <Button
        className=" p-2 bg-gray-300 rounded-full justify-center items-center gap-2 flex  hover:bg-gray-500"
        onClick={openModal}
      >
        <EditIcon />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="fixed flex items-center justify-center rounded-lg gap-16 h-[400px] max-w-3xl m-auto ">
          <div className="flex flex-col gap-6 p-8 items-center justify-center border-2 border-gray-400 rounded-[32px] h-[240px] w-[180px]">
           
          <UploadFileProject input={input} setInput={setInput} />
          </div>

          <div className="flex flex-col justify-center items-center h-[240px] w-[380px] gap-8">
            <div className="grid w-full max-w-sm items-center">
              <Label
                htmlFor="projectName"
                className={`text-sm font-medium text-[#333333] mb-1 flex ${
                  error ? "text-red-500" : "text-[#333333]"
                }`}
              >
                New Project Name
              </Label>
              <Input
                id="projectName"
                type="text"
                value={input.projectName}
                onChange={handleInputChange}
                placeholder="Type your project"
                className={`w-full border focus:border-[#5DB9F8] ${
                  error ? "border-red-500" : "border-gray-300"
                } p-2 rounded-md`}
              />
              {error && (
                <span className="text-red-500 text-sm mt-1">{error}</span>
              )}
            </div>
            <DialogFooter>
              <Button
                onClick={handleEditProject}
                className="bg-[#ffe066] text-black px-4 py-2 rounded-[8px] hover:bg-yellow-400"
              >
                Edit Project
                <VectorIcon className="p-0" />
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditImageProjectModal;

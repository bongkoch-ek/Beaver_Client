import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from "../../components/ui/input";
import { Dialog, DialogContent, DialogFooter } from "../../components/ui/dialog";
import { Label } from '@/components/ui/label';
import { VectorIcon, EditIcon } from '../icons';
import useDashboardStore from '../stores/dashboardStore';
import UploadFileProject from './UploadFileProject';
import useUserStore from '../stores/userStore';
import { toast } from "react-toastify";

const initialState = {
  projectName: "",
  images: []
};

const EditImageProjectModal = ({ projectId, currentName, onUpdate }) => {
  const token = useUserStore((state) => state.token);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    projectName: currentName || "",
    images: []
  });
  const [error, setError] = useState("");
  const actionUpdateProject = useDashboardStore((state) => state.actionUpdateProject);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setError("");
  };

  const handleEditProject = async (e) => {
    e.preventDefault();
    if (!input.projectName.trim()) {
      setError('Project name is required');
      return;
    }
  
    try {
      const projectData = {
        projectName: input.projectName,
        images: input.images,
      };
  
      const res = await actionUpdateProject(token, projectId, projectData);


      if (onUpdate) onUpdate();
      
      closeModal();
      setInput(initialState);
    } catch (err) {
      console.log(err);
      setError('Failed to update project. Please try again.');
    }
  };
  
  const handleInputChange = (e) => {
    setInput({
      ...input,
      projectName: e.target.value,
    });
    setError('');
  };

  return (
    <div>
      <Button
        className="p-2 bg-gray-300 rounded-full justify-center items-center gap-2 flex hover:bg-gray-500"
        onClick={openModal}
      >
        <EditIcon />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="fixed flex items-center justify-center rounded-lg gap-16 h-[400px] max-w-3xl m-auto">
          <div className="flex flex-col gap-6 p-8 items-center justify-center border-2 border-gray-400 rounded-[32px] h-[240px] w-[180px]">
            <UploadFileProject input={input} setInput={setInput} />
          </div>

          <div className="flex flex-col justify-center items-center h-[240px] w-[380px] gap-8">
            <div className="grid w-full max-w-sm items-center">
              <Label
                htmlFor="projectName"
                className={`text-sm font-medium mb-1 ${error ? "text-red-500" : "text-[#333333]"}`}
              >
                New Project Name
              </Label>
              <Input
                id="projectName"
                type="text"
                value={input.projectName}
                onChange={handleInputChange}
                placeholder="Type your project name"
                className={`w-full border ${error ? "border-red-500" : "border-gray-300"} p-2 rounded-md`}
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
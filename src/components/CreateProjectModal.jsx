import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from "../../components/ui/input"; 
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "../../components/ui/dialog";
import { Label } from '@/components/ui/label';
import { CloudIcon, VectorIcon } from '../icons';
import useDashboardStore from '../stores/dashboardStore';
import useUserStore from '../stores/userStore';
import { toast } from 'react-toastify';
import { Upload } from 'lucide-react';
import UploadFileProject from './UploadFileProject';

const CreateProjectModal = () => {
  const token = useUserStore((state) => state.token);
  const actionCreateProject = useDashboardStore((state) => state.actionCreateProject);
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [input, setInput] = useState({
    projectName: '',
    images: [],
  });
  const [error, setError] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };
  
    const closeModal = () => {
    setIsOpen(false);
    setInput({ projectName: '' }); 
    setImagePreview(null); 
    setError('');
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!input.projectName.trim()) {
      setError('Project name is required');
      return;
    }
  
    try {
      const projectData = {
        projectName: input.projectName,
      };
  
      const res = await actionCreateProject(projectData, token);
      
      if (res && res.message) {
        console.log(res.message); 
        toast.success(res.message); 
      } else {
        console.log('No message in response');
      }
      setIsOpen(false);
      setInput({ projectName: '' });
      setImagePreview(null);
      setImageFile(null);
      closeModal(); 
    } catch (err) {
      console.log(err);
      setError('Failed to create project. Please try again.');
    }
  };
  
  

  const handleInputChange = (e) => {
    setInput({
      ...input,
      projectName: e.target.value
    });
    setError(''); 
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
      <Button 
        className="h-[42px] px-4 py-2 bg-[#ffe066] rounded-lg justify-center items-center gap-2 inline-flex text-[#333333] hover:bg-yellow-400" 
        onClick={openModal}
      >
        Create New Project
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="fixed inset-0 flex items-center justify-center rounded-lg gap-16 h-[400px] max-w-3xl m-auto">
          
          <div >
              <UploadFileProject input={input} setInput={setInput}  />
          </div>
          

          <div className="flex flex-col justify-center items-center h-[240px] w-[380px] gap-8">
            <div className="grid w-full max-w-sm items-center">
              <Label htmlFor="projectName" className={`text-sm font-medium text-[#333333] mb-1 flex ${error ? 'text-red-500' : 'text-[#333333]'}`}>
                Project Name
              </Label>
              <Input 
                id="projectName"
                name="projectName"
                type="text"
                value={input.projectName}
                onChange={handleInputChange}
                placeholder="Type your project"
                className={`w-full border focus:border-[#5DB9F8] ${error ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md`}
              />
              {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
            </div>
            <DialogFooter>
              <Button 
                onClick={handleCreateProject} 
                className="bg-[#ffe066] text-black px-4 py-2 rounded-[8px] hover:bg-yellow-400"
              >
                Create New Project
                <VectorIcon className="p-0"/>
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProjectModal;

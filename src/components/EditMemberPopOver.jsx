import React from "react";
import { useState, useEffect } from "react";
import useUserStore from "../stores/userStore";
import useDashboardStore from "../stores/dashboardStore";
import { EditMember } from "../icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "../icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteMember } from "../services/DashboardService";

const EditMemberPopOver = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useUserStore((state) => state.token);
  const project = useDashboardStore((state) => state.project);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const actionGetProjectById = useDashboardStore((state) => state.actionGetProjectById);

  useEffect(() => {
    const searchMembers = async () => {
      if (searchQuery && project?.id) {
        try {
          const projectData = await actionGetProjectById(project.id, token);
          const members = projectData.groupProject || [];
          
          console.log("Project Data:", projectData);
          console.log("All Members:", members);
          console.log("Search Query:", searchQuery);
          
          const filteredMembers = members.filter(member => 
            member.user?.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          
          console.log("Filtered Members:", filteredMembers);
          
          setSearchResults(filteredMembers);
        } catch (err) {
          console.error("Error searching members:", err);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };

    const delay = setTimeout(searchMembers, 300);
    return () => clearTimeout(delay);
  }, [searchQuery, project?.id, token, actionGetProjectById]);

  const handleDeleteMember = async (userId) => {
    console.log("Deleting member with ID:", userId);
    console.log("Project ID:", project.id);
    
    try {
      // ดึงข้อมูลโปรเจกต์ล่าสุด
      const currentProject = await actionGetProjectById(project.id, token);
      
      if (!currentProject || !currentProject.id) {
        throw new Error("Project not found");
      }

      // ตรวจสอบว่าผู้ใช้เป็นสมาชิกของโปรเจกต์จริงๆ
      const memberExists = currentProject.groupProject?.some(
        member => member.user?.id === userId
      );

      if (!memberExists) {
        throw new Error("Member not found in project");
      }

      // เรียกใช้ API เพื่อลบสมาชิก
      await deleteMember(token, {
        projectId: currentProject.id,
        userId: userId
      });

      // อัพเดทข้อมูลหลังจากลบ
      const updatedProject = await actionGetProjectById(currentProject.id, token);
      
      // อัพเดท search results
      const updatedMembers = updatedProject.groupProject || [];
      const filteredMembers = updatedMembers.filter(member => 
        member.user?.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filteredMembers);

      toast.success("member deleted");

    } catch (err) {
      console.error("Delete member failed:", err);
      toast.error("delete member failed");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex hover:bg-slate-300 rounded-full"
      >
        <EditMember />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold mb-4">
                Manage access
            </DialogTitle>
          </DialogHeader>

          {/* Search Input */}
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md "
            />
          </div>

          <div className="flex flex-col">
            <ScrollArea className="min-h-[300px] w-full pr-4">
              <div className="flex flex-col gap-2 ">
                {searchResults.map((member) => {
                  console.log("Rendering member:", member);
                  return (
                    <div 
                      key={member.user?.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3 rounded-md">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          {member.user?.displayName?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-medium">{member.user?.displayName}</p>
                          <p className="text-sm text-gray-500">{member.user?.email}</p>
                        </div>
                      </div>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="p-2 text-red-500 hover:bg-red-100 rounded-full">
                            <Trash2Icon className="w-5 h-5" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirm delete member?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. Member will be removed from the project immediately.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex justify-end gap-3 mt-4">
                            <AlertDialogCancel className="bg-gray-100">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteMember(member.user.id)}
                              className="bg-red-500 text-white hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {searchResults.length === 0 && (
              <div className="flex justify-center relative -top-1/2 text-gray-500">
                No member found.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditMemberPopOver;

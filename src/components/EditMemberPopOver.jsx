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
// import { deleteMember, searchFilters } from "../services/DashboardService";

const EditMemberPopOver = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useUserStore((state) => state.token);
  const project = useDashboardStore((state) => state.project);
  const [searchQuery, setSearchQuery] = useState("");
  const actionSearchFilters = useDashboardStore((state) => state.actionSearchFilters);
  const users = useDashboardStore((state) => state.users);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (searchQuery) {
        const results = await actionSearchFilters(token, { query: searchQuery });
        setSearchResults(results || []);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery, token, actionSearchFilters]);

  const handleDeleteMember = async (userId) => {
    try {
      await deleteMember(token, {
        projectId: project.id,
        userId: userId
      });
      toast.success("member deleted");
      // อัพเดท project state หลังจากลบสมาชิก
      // useDashboardStore.getState().fetchProject(project.id);
    } catch (err) {
      console.error("delete member failed:", err);
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
                {searchResults.map((member) => (
                  <div 
                    key={member.id}
                    className="flex max-w-[42px] items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                  >
                    {/* key={member.user.id} */}
                    <div className="flex items-center gap-3 rounded-md">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        {member.displayName?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-medium">{member.displayName}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
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
                            onClick={() => handleDeleteMember(member.id)}
                            className="bg-red-500 text-white hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
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

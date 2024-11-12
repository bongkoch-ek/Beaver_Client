import React from "react";
import { useState } from "react";
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
// import { deleteMember } from "../services/DashboardService";

const EditMemberPopOver = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useUserStore((state) => state.token);
  const project = useDashboardStore((state) => state.project);
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const handleDeleteMember = async (userId) => {
  //   try {
  //     await deleteMember(token, {
  //       projectId: project.id,
  //       userId: userId
  //     });
  //     toast.success("สมาชิกถูกลบออกจากโปรเจคแล้ว");
  //     // อัพเดท project state หลังจากลบสมาชิก
  //     useDashboardStore.getState().fetchProject(project.id);
  //   } catch (err) {
  //     console.error("ลบสมาชิกไม่สำเร็จ:", err);
  //     toast.error("ไม่สามารถลบสมาชิกได้");
  //   }
  // };

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

          <div className="flex flex-col">
          {/* project?.members? */}
            {test.map((member) => (
              <div 
                key={member}
                
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-slate-200"
              >
                {/* key={member.user.id} */}
                <div className="flex items-center gap-3 rounded-md">
                  <div className="w-10 h-10 bg-red-300 rounded-full flex items-center justify-center">
                    {/* {member.user?.displayName?.charAt(0) || 'U'} */}
                    T
                  </div>
                  <div>
                    <p className="font-medium">
                      {/* {member.user?.displayName} */}
                      Test
                      </p>
                    <p className="text-sm text-gray-500">
                      {/* {member.user?.email} */}
                      test@test.com
                    </p>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
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
                        // onClick={() => handleDeleteMember(member.user.id)}
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditMemberPopOver;

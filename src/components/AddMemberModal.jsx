import React, { useEffect, useRef, useState } from "react";
import { AddMemberIcon, PlusIcon } from "../icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { addMember } from "../services/DashboardService";
import useUserStore from "../stores/userStore";
import { useParams } from "react-router-dom";
import useDashboardStore from "../stores/dashboardStore";

const AddMemberModal = () => {
  const { projectId } = useParams();
  const token = useUserStore((state) => state.token);
  const [isOpen, setIsOpen] = useState(false);
  const actionSearchFilters = useDashboardStore((state) => state.actionSearchFilters);
  const users = useDashboardStore((state) => state.users); 
  const formRef = useRef(null);
  const [text, setText] = useState("");
  const [form, setForm] = useState({
    projectId: Number(projectId),
    email: "",
    role: "MEMBER",
    userId: null,
  });
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (text) {
        const results = await actionSearchFilters(token, { query: text });
        console.log("Search Results:", results);
        setSearchResults(results || []); 
      } else {
        setSearchResults([]);
      }
    }, 300);
  
    return () => clearTimeout(delay);
  }, [text, token, actionSearchFilters]);

  const handleSelectUser = (selectedUser) => {
    setForm((prev) => ({
      ...prev,
      email: selectedUser.email,
      userId: selectedUser.id,
    }));
    setText(selectedUser.email); 
    setSearchResults([]); 
    console.log("Selected User:", selectedUser); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.userId) {
      setError("Email and User ID are required");
      console.log("Form Error - Missing email or userId", form); 
      return;
    }

    try {
      console.log("Submitting form:", form);
      const addMemberPromise = addMember(token, form);
      const sendEmailPromise = emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      await Promise.all([addMemberPromise, sendEmailPromise]);

      toast.success(`Member added and invitation sent to ${form.email}`);
      resetForm(); 

    } catch (error) {
      console.error("Error adding member or sending email:", error);
      setError("Failed to add member or send email. Please try again.");
      toast.error("Failed to add member or send email");
    }
  };

  const resetForm = () => {
    setForm({
      projectId: Number(projectId),
      email: "",
      role: "MEMBER",
      userId: null,
    });
    setText("");
    setSearchResults([]);
    setError("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    setForm((prev) => ({ ...prev, email: "", userId: null }));
    setError(""); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="rounded-[360px] justify-start items-center gap-4 flex hover:bg-slate-200 ">
          <AddMemberIcon className="w-10 h-10 " />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[480px] h-[400px]">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-normal">Add new member</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className={`text-sm ${error ? "text-red-500" : "text-[#333333]"}`}>
                Email
              </label>
              <Input
                name="email"
                type="email"
                placeholder="Type email for new team member"
                value={text}
                onChange={handleChange}
                className={`mt-1 focus:border-[#5DB9F8] ${error ? "border-red-500" : ""}`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              {Array.isArray(searchResults) && searchResults.length > 0 && (
                <div className="border mt-2 p-2 rounded bg-white shadow-md">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className="cursor-pointer p-2 hover:bg-gray-200 rounded"
                    >
                      {user.email} ({user.displayName || user.fullname})
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-[#333333]">Role</label>
              <Select
                value={form.role}
                name="role"
                onValueChange={(value) => setForm((prev) => ({ ...prev, role: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="font-normal text-[14px]">Select role</SelectLabel>
                    <SelectItem value="MEMBER" className="font-normal text-[14px]">Member</SelectItem>
                    <SelectItem value="OWNER" className="font-normal text-[14px]">Owner</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button className="bg-[#FFE066] text-[#333333] w-[90px] h-[42px] rounded-[8px] hover:bg-yellow-400 font-semibold flex items-center justify-center gap-2">
              Add
              <PlusIcon className="mb-1" />
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

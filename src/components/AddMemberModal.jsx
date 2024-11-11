import React, { useRef, useState } from "react";
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
import { addMember, searchFilters } from "../services/DashboardService";
import useUserStore from "../stores/userStore";

const AddMemberModal = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useUserStore((state) => state.token);
  const formRef = useRef(null);
  const [form, setForm] = useState({
    email: "",
    role: "MEMBER",
  });
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      setError("Please select a user to add");
      return;
    }

    try {
      await addMember(token, projectId, { email: selectedUser.email, role: form.role });
      toast.success(`Member added and invitation sent to ${selectedUser.email}`);

      // Send email notification
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setError("");
      setIsOpen(false);
      setForm({ email: "", role: "MEMBER" });
      setSelectedUser(null);
      setSearchResults([]);
    } catch (error) {
      setError("Failed to add member");
      toast.error("Failed to add member");
      console.error("Error adding member:", error);
    }
  };

  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value;
    setForm((prev) => ({ ...prev, email: searchTerm }));
    setError("");
    
    // Perform search if the input has at least 2 characters
    if (searchTerm.trim().length > 1) {
      try {
        const results = await searchFilters(token, searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setForm((prev) => ({ ...prev, email: user.email }));
    setSearchResults([]);
  };

  const handleRoleChange = (value) => {
    setForm((prev) => ({ ...prev, role: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="rounded-[360px] justify-start items-center gap-4 flex hover:bg-slate-200 ">
          <AddMemberIcon className="w-10 h-10 " />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[480px] m-auto h-[400px]">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-normal">Add new member</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className={`text-sm ${error ? "text-red-500" : "text-[#333333]"}`}>
                Search Email
              </label>
              <Input
                name="email"
                type="email"
                placeholder="Search for user by email"
                value={form.email}
                onChange={handleSearchChange}
                className={`mt-1 focus:border-[#5DB9F8] ${error ? "border-red-500" : ""}`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              {searchResults.length > 0 && (
                <div className="border mt-2 p-2 rounded bg-white shadow-md">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className="cursor-pointer p-2 hover:bg-gray-200 rounded"
                    >
                      {user.email}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-[#333333]">Role</label>
              <Select value={form.role} name="role" onValueChange={handleRoleChange}>
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

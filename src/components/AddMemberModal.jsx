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
import { addMember } from "../services/DashboardService";
import useUserStore from "../stores/userStore";
import { useParams } from "react-router-dom";

const AddMemberModal = () => {
  const projectId = useParams();
  const token = useUserStore((state) => state.token);
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const formRef = useRef(null);
  const [form, setForm] = useState({
    projectId: projectId,
    email: "",
    role: "MEMBER",
    userId: user.id,
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }

    const res = addMember(token ,form);
    console.log(res.data)

    //ใส่API เพื่อเพิ่มสมาชิก
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
    setError("");
    toast.success(`Send Invitation to ${form.email}`);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setForm((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    setError("");
  };
  console.log(form);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="rounded-[360px] justify-start items-center gap-4 flex hover:bg-slate-200 ">
          <AddMemberIcon className="w-10 h-10 " />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[480px] h-[360px]">
        <form
          ref={formRef}
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-6 p-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-normal">Add new member</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label
                className={`text-sm ${
                  error ? "text-red-500" : "text-[#333333]"
                }`}
              >
                Email
              </label>
              {/* Search Email for Database */}
              <Input
                name="email"
                type="email"
                placeholder="Type email for new team member"
                value={form.email}
                onChange={handleChange}
                className={`mt-1 focus:border-[#5DB9F8] ${
                  error ? "border-red-500" : ""
                }`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div>
              <label className="text-sm text-[#333333]">Role</label>
              <Select
                value={form.role}
                name="role"
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>

                    <SelectLabel className="font-normal text-[14px]">
                      Select role
                    </SelectLabel>
                    <SelectItem
                      value="MEMBER"
                      className="font-normal text-[14px]"
                    >
                      Member
                    </SelectItem>
                    <SelectItem
                      value="OWNER"
                      className="font-normal text-[14px]"
                    >
                      Owner
                    </SelectItem>

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


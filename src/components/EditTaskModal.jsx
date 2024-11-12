import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import UploadFile from "./UploadFile";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import {
  ChevronsDown,
  ChevronsUp,
  CalendarIcon,
  Equal,
  Pencil,
  PencilIcon,
  X,
  Check,
  ChevronDownIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CloseIconForBadge } from "../icons";
import { actionGetAllComment } from "../services/DashboardService";
import { ScrollArea } from "@/components/ui/scroll-area";
import useUserStore from "../stores/userStore";
import useDashboardStore from "../stores/dashboardStore";
import { SelectIcon } from "@radix-ui/react-select";

export function EditTaskModal(props) {
  const { item, taskId } = props
  const token = useUserStore(state => state.token)
  const actionGetTask = useDashboardStore(state => state.actionGetTask)
  const taskById = useDashboardStore(state => state.taskById)
  const actionUpdateTask = useDashboardStore(state => state.actionUpdateTask)

  useEffect(() => {
    async function fetch() {
      await actionGetTask(taskId, token)
    }
    fetch()
  }, []);

  const [dueDate, setDueDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [priority, setPriority] = useState(taskById.priority);
  const [taskName, setTaskName] = useState(taskById.title);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTaskName, setTempTaskName] = useState(taskById.title);
  const [url, setUrl] = useState("");
  const [txt, setTxt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedComment, setIsFocusedComment] = useState(false);
  const [postedUrls, setPostedUrls] = useState([]);
  const [postedComments, setPostedComments] = useState([]);
  const [userPicture, setUserPicture] = useState("");
  const [input, setInput] = useState({
    title: item.title,
    description: item.description,
    startDate: item.startDate,
    dueDate: item.dueDate,
    priority: item.priority,
    listId: item.listId
  });
  console.log(item)
  console.log(input, "input")

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    console.log(input)
  };


  const hdlPriorityChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    actionUpdateTask(taskId, input, token)
  }

  const handlePost = () => {
    if (url.trim()) {
      setPostedUrls([...postedUrls, url]);
      setUrl("");
      setIsFocused(false);
    }
  };

  const handleCancel = () => {
    setUrl("");
  };

  const handlePostComment = () => {
    if (txt.trim()) {
      const newComment = {
        text: txt,
        userPicture: userPicture,
        timestamp: new Date(),
        userId: "current_user_id"  //รับค่า userId
      };

      setPostedComments([...postedComments, newComment]);
      setTxt("");
      setIsFocusedComment(false);
    }
  };

  const handleCancelComment = () => {
    setTxt("");
  };

  const hdlEdit = (e) => {
    e.preventDefault()
    setIsEditing(true);
  };

  const hdlSave = (e) => {
    e.preventDefault()
    setTaskName(tempTaskName);
    setIsEditing(false);
    console.log(input)
    actionUpdateTask(taskId, input, token)
  };

  const hdlCancle = () => {
    setIsEditing(false);
    setTempTaskName(taskName);
  };

  // console.log(taskById)
  return (
    <DialogContent className="max-w-3xl w-[856px] max-h-[70vh] p-12 bg-white rounded-2xl flex flex-col gap-5 m-auto overflow-y-auto ">
      <DialogHeader>
        <DialogTitle hidden>Edit task</DialogTitle>
      </DialogHeader>
      <form>
        <div className="flex flex-col space-y-8 ">
          {/* ชื่อ Task */}
          <div className="flex items-center gap-2">
            {isEditing ? (
              <div className="flex items-center w-full gap-2 border border-blue-300 rounded px-2 py-1">
                <Input
                  name="title"
                  type="text"
                  defaultValue={taskById.title}
                  // value={tempTaskName}
                  onChange={hdlChange}
                  className="border-none outline-none w-full"
                  autoFocus
                />
                <button
                  onClick={hdlSave}
                  className="w-7 h-7 p-2 bg-[#43a047]/20 rounded-[360px] justify-center items-center gap-2 inline-flex"
                >
                  <Check className="w-3.5 h-3.5 relative" />
                </button>
                <button
                  onClick={hdlCancle}
                  className="w-7 h-7 p-2 bg-[#e53935]/20 rounded-[360px] justify-center items-center gap-2 inline-flex"
                >
                  <X className="text-red-500" size={24} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{taskById.title}</span>
                <button
                  onClick={hdlEdit}
                  className="w-7 h-7 p-2 bg-black/20 rounded-[360px] justify-center items-center gap-2 inline-flex"
                >
                  <PencilIcon className="w-3.5 h-3.5 relative" />
                </button>
              </div>
            )}
          </div>

          {/* data */}
          <div className="space-y-4">
            {/* Status */}
            <div className="flex gap-4  items-center">
              <div className="text-[#333333] text-sm font-semibold">Status:</div>
              <div className="text-[#767676] text-sm">In progress</div>
            </div>

            {/* Priority */}
            <div className="flex gap-4 items-center">
              <p className="text-[#333333] text-sm font-semibold">Priority:</p>
              <Select onValueChange={hdlChange} name="priority">
                <SelectTrigger className="w-[180px] rounded-full">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH"> <div className="flex items-center text-sm font-semibold text-[#e53935]"><ChevronsUp className="h-5" /> High</div></SelectItem>
                  <SelectItem value="MEDIUM"><div className="flex items-center text-sm font-semibold text-[#fdc730]"> <Equal className="h-5 text-[#fdc730]" /> Medium</div></SelectItem>
                  <SelectItem value="LOW"><div className="flex items-center text-sm font-semibold text-[#5db9f8]"><ChevronsDown className="h-5 text-[#5db9f8]" /> Low</div></SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ผู้รับผิดชอบ */}
            <div className="flex gap-4 items-center">
              <p className="text-[#333333] text-sm font-semibold">Assignee:</p>
              <p className="text-[#767676] text-sm">Username1</p>
            </div>

            {/* วันเริ่มต้นงาน */}
            <div className="flex gap-4 items-center">
              <p className="text-[#333333] text-sm font-semibold">Start date:</p>
              <p className="text-[#767676] text-sm">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex items-center py-1 bg-white shadow rounded-2xl",
                        !startDate && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="text-gray-600" />
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </p>
            </div>

            {/* วันครบกำหนด */}
            <div className="flex  gap-4  items-center">
              <p className="text-[#333333] text-sm font-semibold">Due date:</p>
              <p className="text-[#767676] text-sm">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex items-center py-1 bg-white shadow rounded-2xl",
                        !dueDate && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className=" text-gray-600" />
                      {dueDate ? (
                        format(dueDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </p>
            </div>

            {/* ผู้สร้างงาน */}
            <div className="flex  gap-4  items-center">
              <p className="text-[#333333] text-sm font-semibold">Created by:</p>
              <p className="text-[#767676] text-sm">{taskById.user?.displayName}</p>
            </div>
          </div>

          {/* อัปโหลดไฟล์ */}
          <UploadFile />

          {/* ลิงก์ URL */}
          <div className="justify-start  flex flex-col gap-2">
            <p className="text-sm font-semibold">Link URL</p>
            <div className="flex flex-col">
              <Input
                placeholder="www.beaver.co.th"
                value={url}
                type="text"
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full focus:border-blue-300"
              />
              {(isFocused || url) && (
                <div className="mt-2 w-[120px] h-[30px]  flex gap-[10px]">
                  <Button
                    onClick={handlePost}
                    className="bg-[#FFE066] w-[45px] h-[30px] py-[4px] px-[8px] rounded-[8px] text-sm font-semibold text-black hover:bg-yellow-200"
                  >
                    Post
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="bg-gray-50 w-[60px] h-[30px] rounded-[8px] py-[4px] px-[8px] text-sm font-semibold text-black hover:bg-gray-200"
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {/* Badge สำหรับ URL ที่โพสต์แล้ว */}
              <ScrollArea className="h-[50px] w-full rounded-md mt-3">
                <div className="flex  flex-wrap gap-2 ">
                  {postedUrls.map((postedUrl, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="rounded-[16px] px-2 py-1 text-[#333333] font-normal bg-gray-300 hover:bg-gray-200 "
                    >
                      {postedUrl}
                      <CloseIconForBadge
                        className="w-5 h-5 ml-4 cursor-pointer"
                        onClick={() => {
                          const newUrls = postedUrls.filter((_, i) => i !== index);
                          setPostedUrls(newUrls);
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* คอมเมนต์ */}
          <div className="justify-start p-1 flex flex-col gap-2">
            <p className="text-sm font-semibold">Comment</p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="bg-gray-500 min-w-[40px] min-h-[40px] rounded-full justify-center items-center">
                  {/* UserPicture */}
                </div>
                <Input
                  placeholder="Comment..."
                  value={txt}
                  type="text"
                  onChange={(e) => setTxt(e.target.value)}
                  onFocus={() => setIsFocusedComment(true)}
                  onBlur={() => setIsFocusedComment(false)}
                  className="w-full focus-within:border-blue-300"
                />
              </div>

              {(isFocusedComment || txt) && (
                <div className="flex gap-2 justify-start ml-[50px]">
                  <Button
                    onClick={handlePostComment}
                    className="bg-[#FFE066] w-[45px] h-[30px] py-[4px] px-[8px] rounded-[8px] text-sm font-semibold text-black hover:bg-yellow-200"
                  >
                    Post
                  </Button>
                  <Button
                    onClick={handleCancelComment}
                    className="bg-gray-50 w-[60px] h-[30px] rounded-[8px] py-[4px] px-[8px] text-sm font-semibold text-black hover:bg-gray-200"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* แสดงความคิดเห็นที่โพสต์แล้ว */}
          <ScrollArea className="h-[200px] w-full mt-0 rounded-md mb-6">
            <div className="flex flex-col gap-4 pr-4">
              {[...postedComments].reverse().map((comment, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-gray-500 w-[40px] h-[40px] rounded-full overflow-hidden">
                    {comment.userPicture ? (
                      <img
                        src={comment.userPicture}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        U
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-600">User Name</p>
                    <p className="text-md font-[600px] text-[#333333]">{comment.text}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(comment.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </form>
    </DialogContent>
  );
}

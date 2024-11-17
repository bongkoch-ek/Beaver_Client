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
} from "@/components/ui/select";

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
  CircleX,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CloseIconForBadge } from "../icons";
import { actionGetAllComment } from "../services/DashboardService";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useUserStore from "../stores/userStore";
import useDashboardStore from "../stores/dashboardStore";
import { SelectIcon } from "@radix-ui/react-select";
import { toast } from "react-toastify";
import moment from "moment";

export function EditTaskModal(props) {
  const { item, taskId, projectId, isEditing, setIsEditing } = props;
  const token = useUserStore((state) => state.token);
  const actionGetTask = useDashboardStore((state) => state.actionGetTask);
  const taskById = useDashboardStore((state) => state.taskById);
  const actionUpdateTask = useDashboardStore((state) => state.actionUpdateTask);
  const actionGetProjectById = useDashboardStore(
    (state) => state.actionGetProjectById
  );
  const actionCreateLink = useDashboardStore((state) => state.actionCreateLink);
  const actionDeleteLink = useDashboardStore((state) => state.actionDeleteLink);
  const actionComment = useDashboardStore((state) => state.actionComment);
  const actionGetCommentByTaskId = useDashboardStore(
    (state) => state.actionGetCommentByTaskId
  );
  const comments = useDashboardStore((state) => state.comments);
  const socket = useDashboardStore((state) => state.socket);
  const project = useDashboardStore((state) => state.project);
  const actionGetProjectMember = useDashboardStore(
    (state) => state.actionGetProjectMember
  );

  const actionAssignUserToTask = useDashboardStore(
    (state) => state.actionAssignUserToTask
  );
  const projectMember = useDashboardStore((state) => state.projectMember);
  const actionGetTaskAssignee = useDashboardStore(
    (state) => state.actionGetTaskAssignee
  );
  const assignee = useDashboardStore((state) => state.assignee);
  const actionChangeAssignee = useDashboardStore(
    (state) => state.actionChangeAssignee
  );
  const removeAssignee = useDashboardStore((state) => state.removeAssignee);
  const today = new Date().toISOString().split('T')[0]
  const [dueDate, setDueDate] = useState(new Date(item.dueDate));
  const [startDate, setStartDate] = useState(new Date(item.startDate));
  const [taskName, setTaskName] = useState(taskById.title);
  const [url, setUrl] = useState("");
  const [txt, setTxt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedComment, setIsFocusedComment] = useState(false);
  const [userPicture, setUserPicture] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState({
    userId: taskById?.assignee?.userId || null,
    displayName: taskById?.assignee?.user?.displayName || null,
  });
  const [input, setInput] = useState({
    title: item.title,
    description: item.description,
    startDate: item.startDate,
    dueDate: item.dueDate,
    priority: item.priority,
    listId: item.listId,
    images: item.images,
    taskId: taskId,
  });
  console.log("check project", project);
  console.log("check taskId", taskId);
  console.log("check assignee", assignee);

  useEffect(() => {
    async function fetch() {
      const task = await actionGetTask(taskId, token);
      if (task?.assignee?.user) {
        setSelectedAssignee({
          userId: task.assignee.user.id,
          displayName: task.assignee.user.displayName,
        });
      } else {
        setSelectedAssignee({ userId: null, displayName: null });
      }
      await actionGetCommentByTaskId(taskId, token);
      await actionGetProjectMember(projectId, token);
      console.log("Fetched project members:", projectMember);
    }
    fetch();
  }, [taskId, token, projectId]);

  useEffect(() => {
    async function fetchData() {
      await actionUpdateTask(taskId, input, token);
      await actionGetProjectById(projectId, token);
      await actionGetTaskAssignee(taskId, token);
    }
    fetchData();
  }, [input]);

  console.log("check task : ", taskById);

  const handleAssigneeChange = async (userId, displayName) => {
    const selectedMember = projectMember.find((member) => member.id === userId);

    if (selectedMember) {
      setSelectedAssignee({
        userId: selectedMember.id,
        displayName: selectedMember.displayName,
      });

      try {
        await actionAssignUserToTask(
          taskId,
          selectedMember.id,
          token,
          selectedMember.displayName
        );

        await actionGetTaskAssignee(taskId, token);

        toast.success("Assignee updated successfully!");
      } catch (error) {
        toast.error("Failed to assign user.");
      }
    } 
  };

  const handleRemoveAssignee = async (taskId, userId) => {
    try {
      await removeAssignee(taskId, userId, token);
      console.log("Assignee removed successfully");
    } catch (error) {
      console.error("Failed to remove assignee:", error);
    }
  };

  const hdlPriorityChange = async (e) => {
    setInput((prv) => ({ ...prv, priority: e }));
  };

  const handlePost = async () => {
    if (url.trim()) {
      setUrl("");
      setIsFocused(false);
      await actionCreateLink({ taskId: taskId, url: url }, token);
      await actionGetTask(taskId, token);
    }
  };

  const handleCancel = () => {
    setUrl("");
  };

  useEffect(() => {
    socket.on("comment_message", (data) => {
      actionGetCommentByTaskId(taskId, token);
    });
  }, [socket]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    const newComment = await actionComment(
      { comment: txt, taskId: taskId },
      token
    );
    await actionGetCommentByTaskId(taskId, token);
    await socket.emit("comment", newComment);
    setTxt("");
  };

  const handleCancelComment = () => {
    setTxt("");
  };

  const hdlEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const hdlSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setInput((prv) => ({ ...prv, title: taskName }));
  };

  const hdlStartDate = (e) => {
    setStartDate(e);
    setInput((prv) => ({ ...prv, startDate: e }));
  };
  const hdlDueDate = (e) => {
    setDueDate(e);
    setInput((prv) => ({ ...prv, dueDate: e }));
  };
  const hdlDelStartDate = (e) => {
    e.stopPropagation();
    setStartDate(new Date());
    setInput((prv) => ({ ...prv, startDate: null }));
  };
  const hdlDelDueDate = (e) => {
    e.stopPropagation();
    setStartDate(new Date());
    setInput((prv) => ({ ...prv, dueDate: null }));
  };


  return (
    <ScrollArea className=" w-full max-h-full p-6 bg-white flex flex-col gap-2 m-auto overflow-y-auto ">
      <form>
        <div className="flex flex-col gap-[32px] ">
          {/* ชื่อ Task */}
          <div className="flex items-center gap-2 pb-4">
            {isEditing ? (
              <div className="flex items-center w-full gap-2 border border-blue-300 rounded px-2 py-1">
                <Input
                  name="title"
                  type="text"
                  defaultValue={taskById.title}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="border-none outline-none w-full"
                  autoFocus
                  maxlength={35}
                />
                <button
                  onClick={hdlSave}
                  className="w-7 h-7 p-2 bg-[#43a047]/20 rounded-[360px] justify-center items-center gap-2 inline-flex"
                >
                  <Check className="w-3.5 h-3.5 relative" />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
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
          <div className="flex flex-col gap-[20px]">
            {/* Status */}
            <div className="flex gap-4  items-center">
              <div className="text-[#333333] text-sm font-semibold">
                Status:
              </div>
              <div className="text-[#767676] text-sm">In progress</div>
            </div>

            {/* Priority */}
            <div className="flex gap-4 items-center">
              <p className="text-[#333333] text-sm font-semibold">Priority:</p>
              <Select
                onValueChange={hdlPriorityChange}
                defaultValue={item.priority}
              >
                <SelectTrigger className="w-[180px] rounded-full">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">
                    {" "}
                    <div className="flex items-center text-sm font-semibold text-[#e53935]">
                      <ChevronsUp className="h-5" /> High
                    </div>
                  </SelectItem>
                  <SelectItem value="MEDIUM">
                    <div className="flex items-center text-sm font-semibold text-[#fdc730]">
                      {" "}
                      <Equal className="h-5 text-[#fdc730]" /> Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="LOW">
                    <div className="flex items-center text-sm font-semibold text-[#5db9f8]">
                      <ChevronsDown className="h-5 text-[#5db9f8]" /> Low
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assignee Section */}
            <div className="flex item-center gap-2">
              <p className="text-[#333333] text-sm font-semibold">Assignee:</p>
              {Array.isArray(taskById?.assignee) &&
              taskById.assignee.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <ul>
                    {taskById.assignee.map((assignee) => (
                      <li
                        key={assignee.userId}
                        className="flex items-center gap-2"
                      >
                        <span>{assignee.user?.displayName}</span>
                        <button
                          className="text-red-500 text-sm"
                          onClick={() =>
                            handleRemoveAssignee(taskById.id, assignee.userId)
                          }
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Select
                  onValueChange={(userId) => {
                    const selectedMember = projectMember.find(
                      (member) => member.id === userId
                    );
                    handleAssigneeChange(userId, selectedMember?.displayName);
                  }}
                  value={selectedAssignee?.userId || ""}
                >
                  <SelectTrigger className="w-[180px] rounded-full">
                    <SelectValue placeholder="Select Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(projectMember) &&
                    projectMember.length > 0 ? (
                      projectMember.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.displayName} ({member.email})
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled>No members available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-2">
                  <span>
                    {taskId && taskById?.assignee[0]?.user?.displayName}
                  </span>
                  <Button
                    onClick={() => setSelectedAssignee(null)}
                    variant="outline"
                    size="sm"
                  >
                    Change
                  </Button>
                </div>
              )}
            </div>

            {/* วันเริ่มต้นงาน */}
            <div className="flex gap-4 items-center">
              <p className="text-[#333333] text-sm font-semibold">
                Start date:
              </p>
              <p className="text-[#767676] text-sm">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex items-center py-1 bg-white shadow rounded-2xl",
                        !item.startDate && "text-gray-500" 
                      )}
                    >
                      {!item.startDate && (
                        <CalendarIcon className=" text-gray-600" />
                      )}
                      {item.startDate ? (
                        format(item.startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      {item.startDate && (
                        <div onClick={hdlDelStartDate}>
                          <CircleX className=" text-gray-600 " />
                        </div>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={hdlStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </p>
            </div>

            {/* วันครบกำหนด */}
            <div className="flex  gap-4 items-center">
              <p className="text-[#333333] text-sm font-semibold">Due date:</p>
              <p className="text-[#767676] text-sm">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex items-center py-1 bg-white shadow rounded-2xl",
                        !item.dueDate && "text-gray-500", (item.status != "DONE" && item.dueDate && new Date(item.dueDate) < new Date(today)) && "text-red-500 hover:text-red-600"
                      )}
                    >
                      {!item.dueDate && (
                        <CalendarIcon className=" text-gray-600" />
                      )}
                      {item.dueDate ? (
                        format(item.dueDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      {item.dueDate && (
                        <div onClick={hdlDelDueDate}>
                          <CircleX className={`text-gray-600 ${ (item.status != "DONE" && item.dueDate && new Date(item.dueDate) < new Date(today)) && "text-red-500 hover:text-red-600"}`} />
                        </div>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={hdlDueDate}
                      initialFocus
                      timeZone="+07:00"
                    />
                  </PopoverContent>
                </Popover>
              </p>
            </div>

            {/* ผู้สร้างงาน */}
            <div className="flex  gap-4  items-center">
              <p className="text-[#333333] text-sm font-semibold">
                Created by:
              </p>
              <p className="text-[#767676] text-sm">
                {taskById.user?.displayName}
              </p>
            </div>
          </div>

          {/* อัปโหลดไฟล์ */}
          <UploadFile input={input} setInput={setInput} />

          {/* ลิงก์ URL */}
          <div className="justify-start  flex flex-col gap-2 pb-4">
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
              {taskById.webLink && (
                <ScrollArea className="pt-2 w-full rounded-md overflow-x-auto">
                  <div className="flex flex-row flex-nowrap gap-2 items-center pb-4">
                    {taskById?.webLink?.map((postedUrl, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="rounded-[16px] px-2 py-1 text-[#333333] font-normal bg-gray-300 hover:bg-gray-200 "
                      >
                        <a href={postedUrl.url}>{postedUrl.url}</a>

                        <CircleX
                          className="w-5 h-5 ml-4 cursor-pointer"
                          onClick={async (e) => {
                            e.preventDefault;
                            await actionDeleteLink(token, postedUrl.id);
                            await actionGetTask(taskId, token);
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                  <ScrollBar className="" orientation="horizontal" />
                </ScrollArea>
              )}
            </div>
          </div>

          {/* คอมเมนต์ */}
          <div className="justify-start flex flex-col gap-2">
            <p className="text-sm font-semibold">Comment</p>
            <div className="flex flex-col gap-2 pb-3">
              <div className="flex gap-2">
                <div className="bg-gray-500 min-w-[40px]  rounded-full justify-center items-center">
                  {comments?.userPicture ? (
                    <img
                      src={comments?.userPicture}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      U
                    </div>
                  )}
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
          {comments && (
            <div className="flex flex-col gap-2 pr-4">
              {comments?.map((comment, index) => (
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
                    <p className="text-sm text-gray-600">
                      {comment.user?.displayName}
                    </p>
                    <p className="text-md font-[600px] text-[#333333]">
                      {comment.comment}
                    </p>
                    <p className="text-xs text-gray-400">
                      {/* {moment.parseZone(comment.createdAt).local(true).fromNow()} */}
                      {moment
                        .parseZone(comment.createdAt)
                        .utcOffset(-7)
                        .fromNow()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </ScrollArea>
  );
}

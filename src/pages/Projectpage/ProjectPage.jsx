import PrimaryButton from "@/src/components/common/PrimaryButton";
import CreateProjectModal from "@/src/components/CreateProjectModal";
import ProjectCard from "@/src/components/ProjectCard";
import useDashboardStore from "@/src/stores/dashboardStore";
import useUserStore from "@/src/stores/userStore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

const ProjectPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useUserStore((state) => state.token);
  const actionGetTodayTask = useDashboardStore(
    (state) => state.actionGetTodayTask
  );
  const actionGetActivityLog = useDashboardStore(
    (state) => state.actionGetActivityLog
  );
  const task = useDashboardStore((state) => state.task);
  const activityLogs = useDashboardStore((state) => state.activityLogs);

  useEffect(() => {
    async function fetchData() {
      await actionGetTodayTask(token);
      await actionGetActivityLog(token);
    }
    fetchData();
  }, []);

  const projectName = task.map((item) => item?.list?.project?.projectName);
  const actualProjectName = projectName[0];
  return (
    <div className="bg-gray-100">
      <div className="flex text-gray-600 text-[16px] ml-[65px]">
        <a href="/">Home</a>
        <span className="mx-2">{">"}</span>
        <a href="/project" className="font-semibold text-black">
          Project
        </a>
      </div>

      <div className="flex flex-col min-h-screen p-8 w-[95%] mx-auto bg-gray-100">
        <div className="flex justify-between items-center ">
          <div className="text-black text-[32px] font-semibold leading-[48px]">
            Project
          </div>
          <div>
            <PrimaryButton
              text="Create New Project"
              type="button"
              onClick={() => setIsOpen(true)}
            />
            {isOpen && (
              <CreateProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
          </div>
        </div>

        {/* Today Lists Section */}
        <div className="flex justify-between mt-[32px]">
          <p className="text-[24px] font-normal mb-[20px]">Today Lists</p>
          <p className="text-right text-[#767676] text-lg font-normal leading-[30px]">
            {moment().format("DD / MM / YYYY")}
          </p>
        </div>

        {task.length > 0 ? (
          <div className="bg-white min-h-[160px] h-full rounded-2xl mt-[20px] px-[40px] py-[32px]">
            {task.map((el, index) => (
              <div key={index} className="flex items-center justify-between ">
                <div className="flex flex-col text-[16px] justify-center gap-[12px] ">
                  <p className="text-black font-semibold text-[20px]">
                    {actualProjectName || "Project_Name"}
                  </p>

                  <div className="flex gap-[10px]">
                    <p>Task : </p>
                    <p className="text-[#767676]">{el.title}</p>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <p className="text-[14px]">
                      Status:{" "}
                      <span className="text-[#767676]"> {el.priority}</span>
                    </p>
                    <p className="text-[14px]">
                      Due Date:{" "}
                      <span className="text-[#767676]">
                        {moment(el.dueDate).format("DD/MM/YYYY")}
                      </span>
                    </p>
                  </div>
                </div>
                <Link to={`/project/${el.list?.projectId}`}>
                  <button className="px-4 py-2 flex gap-2 font-semibold bg-[#ffe066] hover:bg-[#e8cc5d] hover:duration-200 text-[#333333] rounded-md">
                    Go to Project
                    <ChevronRight />
                  </button>
                </Link>
                {index + 1 !== task.length && (
                  <hr className="border mx-[65px]" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[400px] px-10 py-8 bg-white rounded-[32px] flex-col flex items-center justify-center w-full relative">
            <div className="text-[#767676] text-lg font-normal">
              No tasks due today.
            </div>
            <div className="flex justify-end pr-[40px] pb-8 hover:cursor-pointer absolute bottom-0 right-0">
              <Link
                to="/project/list"
                className="text-[#333333] hover:font-medium hover:scale-105 transition-transform duration-200 ease-in-out"
              >
                See all
              </Link>
            </div>
          </div>
        )}

        {/* Recently Section */}
        <p className="text-black text-2xl font-normal leading-9 mt-[40px] mb-[20px]">
          Recently
        </p>

        <ScrollArea className="w-full overflow-x-auto">
          <div className="bg-slate-100 rounded-[32px] flex flex-col  justify-center items-start  ">
            {activityLogs.length > 0 ? (
              <div className="flex flex-row flex-nowrap gap-6 ">
                {activityLogs.map((el, index) => (
                  <ProjectCard key={index} project={el} />
                ))}
              </div>
            ) : (
              <div className="w-full h-40 px-10 py-8 bg-white rounded-[32px] flex-col justify-center items-center gap-6 inline-flex">
                <div className="text-right text-[#767676] text-lg font-normal leading-[30px]">
                  No recent activity.
                </div>
              </div>
            )}
          </div>

          <br />
          <br />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProjectPage;

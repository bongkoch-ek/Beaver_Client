import PrimaryButton from "@/src/components/common/PrimaryButton";
import CreateProjectModal from "@/src/components/CreateProjectModal";
import useDashboardStore from "@/src/stores/dashboardStore";
import useUserStore from "@/src/stores/userStore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = useUserStore((state) => state.token);
  const actionGetTodayTask = useDashboardStore(
    (state) => state.actionGetTodayTask
  );
  const actionGetProjectById = useDashboardStore(
    (state) => state.actionGetProjectById
  );
  const actionActivityLog = useDashboardStore(
    (state) => state.actionActivityLog
  );
  const task = useDashboardStore((state) => state.task);
  useEffect(() => {
    actionGetTodayTask(token);
  }, []);

  async function hdlClickProject(projectId) {
    await actionGetProjectById(projectId, token);
    await actionActivityLog(projectId, token);
    navigate("detail", {
      state: {
        projectId: projectId,
      },
    });
  }

  return (
    <div className="bg-gray-100">
      <div className="flex text-gray-600 text-[16px] ml-[65px]">
        <a href="/">Home</a>
        <span className="mx-2">{">"}</span>
        <a href="/project" className="font-semibold text-black">
          Project
        </a>
      </div>

      <div className="flex flex-col  min-h-screen p-8 w-[95%] mx-auto bg-gray-100">
        {/* Header */}
        <div className="flex items-center text-gray-600 text-[16px] mb-6"></div>

        <div className="flex justify-between items-center ">
          <div className="text-black text-[32px] font-semibold  leading-[48px]">
            Project
          </div>
          <div>
            <PrimaryButton
              text="Create New Project"
              type="button"
              onClick={() => setIsOpen(true)}
            ></PrimaryButton>
            {isOpen && (
              <CreateProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
          </div>
        </div>

        {/* Today Lists Section */}
        <div>
          <div className="flex justify-between mt-[32px]">
            <p className="text-[24px] font-normal mb-[20px]">Today Lists</p>
            <p className="text-right text-[#767676] text-lg font-normal  leading-[30px]">
              29 / 10 / 2567
            </p>
          </div>
        </div>

        {task.length > 0 ? (
          <div className="bg-white rounded-2xl mt-[20px]">
            <div className="flex flex-col w-full gap-1  rounded-3xl ">
              {task.map((el, index) => (
                <div key={index}>
                  <div className=" flex justify-between  h-[150px] ">
                    <div className="flex flex-col text-[16px] justify-center gap-[16px] pl-[40px] pt=[px]">
                      <div>
                        <p>{el.title}</p>
                      </div>

                      <div className="flex flex-col gap-[10px]">
                        <p className="text-[14px]">
                          Status :
                          <span className="text-[#767676]"> {el.priority}</span>
                        </p>
                        <p className="text-[14px]">
                          Due Date :{" "}
                          <span className="text-[#767676]">
                            {" "}
                            {moment(el.dueDate).format("DD/MM/YYYY")}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center pr-[40px] ">
                      <button
                        className="px-4 py-2 bg-[#ffe066] text-[#333333] rounded-md"
                        onClick={() => hdlClickProject(el.list?.projectId)}
                      >
                        Go to Project
                      </button>
                    </div>
                  </div>
                  {index + 1 !== task.length && (
                    <hr className="border mx-[65px]" />
                  )}
                </div>
              ))}

              <div className="flex justify-end pt-[24px] pr-16 pb-8">
                <a href="#">See all</a>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-40 px-10 py-8 bg-white rounded-[32px] flex-col justify-center items-center gap-6 inline-flex">
            <div className="text-right text-[#767676] text-lg font-normal font-['IBM Plex Sans Thai'] leading-[30px]">
              No tasks due today.
            </div>
          </div>
        )}

        {/* Recently Section */}
        <p className="text-black text-2xl font-normal leading-9  mt-[40px] mb-[20px]">
          Recently
        </p>

        <div className="h-40 px-10 py-8 bg-white rounded-[32px] flex-col justify-center items-center gap-6 inline-flex">
          <div className="text-right text-[#767676] text-lg font-normal font-['IBM Plex Sans Thai'] leading-[30px]">
            No tasks due today.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;

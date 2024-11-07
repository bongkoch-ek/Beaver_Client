import CreateProjectModal from "@/src/components/CreateProjectModal";
import React from "react";

const ProjectPage = () => {
  const projects = [
    { name: "Project_name", status: "In progress", dueDate: "12:00 A.M." },
    { name: "Project_name", status: "In progress", dueDate: "12:00 A.M." },
    { name: "Project_name", status: "In progress", dueDate: "12:00 A.M." },
    { name: "Project_name", status: "In progress", dueDate: "12:00 A.M." },
  ];

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
          <div className="">
            <CreateProjectModal className="text-center  text-base font-semibold  leading-relaxed "/>
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

        {projects.length > 0 ? (
          <div className="bg-white rounded-2xl mt-[20px]">
            <div className="flex flex-col w-full gap-1  rounded-3xl ">
              {projects.map((project, index) => (
                <div>
                  <div
                    key={index}
                    className=" flex justify-between  h-[150px] "
                  >
                    <div className="flex flex-col text-[16px] justify-center gap-[16px] pl-[40px] pt=[px]">
                      <div>
                        <p>{project.name}</p>
                      </div>

                      <div className="flex flex-col gap-[10px]">
                        <p className="text-[14px]">
                          Status :{" "}
                          <span className="text-[#767676]">
                            {" "}
                            {project.status}
                          </span>
                        </p>
                        <p className="text-[14px]">
                          Due Date :{" "}
                          <span className="text-[#767676]">
                            {" "}
                            {project.dueDate}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center pr-[40px] ">
                      <button className="px-4 py-2 bg-[#ffe066] text-[#333333] rounded-md">
                        Go to Project
                      </button>
                    </div>
                  </div>
                  {index + 1 !== projects.length && (
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

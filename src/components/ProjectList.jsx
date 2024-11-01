import React from "react";

const ProjectList = () => {
  const projects = [
    { name: "Project_name", status: "In progress", dueDate: "12:00 A.M." },
    { name: "Project_name", status: "In progress", dueDate: "12:00 A.M." },
    { name: "Project_name", status: "In progress", dueDate: "12:00 A.M." },
    { name: "Project_name", status: "In progress", dueDate: "12:00 A.M." },
  ];

  return (
    
    <div>

    <div className="flex text-gray-600 text-[16px] ml-[65px]">
    <a href='/home'>Home</a>
    <span className="mx-2">{'>'}</span>
    <a href="/project" className="font-semibold text-black">Project</a>
    </div>

    <div className="flex flex-col mx-auto min-h-screen p-8 w-[95%] ">
      <div className="flex pb-[40px]">
        <p className="text-[32px] font-semibold">Project</p>
      </div>

      <div className="flex justify-between">
        <p className="text-[24px]">Today Lists</p>
        <p className="text-[18px] text-[#767676] pr">29 / 10 / 2567</p>
      </div>

      <div className="bg-white rounded-2xl mt-[20px]">
        <div className="flex flex-col w-full gap-1 border rounded-3xl ">
          {projects.map((project, index) => (
            <div>
              <div key={index} className=" flex justify-between  h-[150px] ">
                <div className="flex flex-col text-[16px] justify-center gap-[16px] pl-[40px] pt=[px]">
                  <div>
                    <p>{project.name}</p>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <p className="text-[14px]">
                      Status :{" "}
                      <span className="text-[#767676]"> {project.status}</span>
                    </p>
                    <p className="text-[14px]">
                      Due Date :{" "}
                      <span className="text-[#767676]"> {project.dueDate}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center pr-[40px] ">
                  <button className="px-4 py-2 bg-[#FFE006] text-[#333333] rounded-md">
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

      
    </div>
          </div>
  );
};

export default ProjectList;

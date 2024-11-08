import CreateProjectModal from '@/src/components/CreateProjectModal'
import useDashboardStore from '@/src/stores/dashboardStore'
import useUserStore from '@/src/stores/userStore'
import React, { useEffect, useState } from 'react'




export default function ProjectListPage() {

  const itemsPerPage = 10; // กำหนดจำนวนรายการต่อหน้า
  const [page, setPage] = useState(1); // State สำหรับหน้า

  const mockProjects = [
    { no: "1", name: "Project_name_1", displayName: "User_1", dueDate: "12:00 A.M." },
    { no: "2", name: "Project_name_2", displayName: "User_2", dueDate: "1:00 A.M." },
    { no: "3", name: "Project_name_3", displayName: "User_3", dueDate: "2:00 A.M." },
    { no: "4", name: "Project_name_4", displayName: "User_4", dueDate: "3:00 A.M." },
    { no: "5", name: "Project_name_5", displayName: "User_5", dueDate: "4:00 A.M." },
    { no: "6", name: "Project_name_6", displayName: "User_6", dueDate: "5:00 A.M." },
    { no: "7", name: "Project_name_7", displayName: "User_7", dueDate: "6:00 A.M." },
    { no: "8", name: "Project_name_8", displayName: "User_8", dueDate: "7:00 A.M." },
    { no: "9", name: "Project_name_9", displayName: "User_9", dueDate: "8:00 A.M." },
    { no: "10", name: "Project_name_10", displayName: "User_10", dueDate: "9:00 A.M." },
    { no: "11", name: "Project_name_11", displayName: "User_11", dueDate: "10:00 A.M." },
    { no: "12", name: "Project_name_12", displayName: "User_12", dueDate: "11:00 A.M." },
    { no: "13", name: "Project_name_13", displayName: "User_13", dueDate: "12:00 P.M." },
    { no: "14", name: "Project_name_14", displayName: "User_14", dueDate: "1:00 P.M." },
    { no: "15", name: "Project_name_15", displayName: "User_15", dueDate: "2:00 P.M." },
    { no: "16", name: "Project_name_16", displayName: "User_16", dueDate: "3:00 P.M." },
    { no: "17", name: "Project_name_17", displayName: "User_17", dueDate: "4:00 P.M." },
    { no: "18", name: "Project_name_18", displayName: "User_18", dueDate: "5:00 P.M." },
    { no: "19", name: "Project_name_19", displayName: "User_19", dueDate: "6:00 P.M." },
    { no: "20", name: "Project_name_20", displayName: "User_20", dueDate: "7:00 P.M." },
    { no: "21", name: "Project_name_21", displayName: "User_21", dueDate: "8:00 P.M." },
    { no: "22", name: "Project_name_22", displayName: "User_22", dueDate: "9:00 P.M." },
    { no: "23", name: "Project_name_23", displayName: "User_23", dueDate: "10:00 P.M." },
    { no: "24", name: "Project_name_24", displayName: "User_24", dueDate: "11:00 P.M." },
    { no: "25", name: "Project_name_25", displayName: "User_25", dueDate: "12:00 A.M." },
    { no: "26", name: "Project_name_26", displayName: "User_26", dueDate: "1:00 A.M." },
    { no: "27", name: "Project_name_27", displayName: "User_27", dueDate: "2:00 A.M." },
    { no: "28", name: "Project_name_28", displayName: "User_28", dueDate: "3:00 A.M." },
    { no: "29", name: "Project_name_29", displayName: "User_29", dueDate: "4:00 A.M." },
    { no: "30", name: "Project_name_30", displayName: "User_30", dueDate: "5:00 A.M." },
  ];

    const token = useUserStore((state) => state.token)
    const user = useUserStore((state) => state.user)
    const actionGetUserProjects = useDashboardStore((state) => state.actionGetUserProjects)
    // const projects = useDashboardStore((state) => state.projects)
 
    // console.log(projects)


    // useEffect(() => {
    //   actionGetUserProjects(token)
    // }, [])  
    

    const currentProjects = mockProjects.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
  
    const handleNextPage = () => {
      if (page < Math.ceil(mockProjects.length / itemsPerPage)) {
        setPage(page + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (page > 1) {
        setPage(page - 1);
      }
    };
  
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
          <div className="flex justify-between items-center">
            <div className="text-black text-[32px] font-semibold leading-[48px]">
              Project
            </div>
            <CreateProjectModal className="text-center text-base font-semibold leading-relaxed" />
          </div>
  
          <div>
            <div className="flex justify-between mt-[32px]">
              <p className="text-[24px] font-normal mb-[20px]">Your All Projects</p>
              <p className="text-right text-[#767676] text-lg font-normal leading-[30px]">
                29 / 10 / 2567
              </p>
            </div>
          </div>
  
          {/* Project List */}
          <div className="flex flex-col gap-8 rounded-sm">
            {currentProjects.map((project) => (
              <div key={project.no} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p>Display Name: {project.displayName}</p>
                <p>Due Date: {project.dueDate}</p>
              </div>
            ))}
          </div>
  
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-4 py-2 mr-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <p className="flex items-center mr-2">Page {page} of {Math.ceil(mockProjects.length / itemsPerPage)}</p>
            <button
              onClick={handleNextPage}
              disabled={page === Math.ceil(mockProjects.length / itemsPerPage)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
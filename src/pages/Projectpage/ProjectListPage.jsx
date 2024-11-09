import Input from "@/src/components/common/Input";
import CreateProjectModal from "@/src/components/CreateProjectModal";
import useDashboardStore from "@/src/stores/dashboardStore";
import useUserStore from "@/src/stores/userStore";
import React, { useEffect, useState } from "react";

export default function ProjectListPage() {
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [searchProject, setSearchProject] = useState(""); // State สำหรับการค้นหา

  const mockProjects = [
    { no: "1", name: "Website Redesign", displayName: "Alice Johnson", dueDate: "2024-12-01" },
    { no: "2", name: "Mobile App Development", displayName: "Bob Smith", dueDate: "2024-11-15" },
    { no: "3", name: "Marketing Campaign Q4", displayName: "Charlie Brown", dueDate: "2024-10-30" },
    { no: "4", name: "Customer Feedback Analysis", displayName: "Dana White", dueDate: "2024-11-20" },
    { no: "5", name: "Server Migration", displayName: "Ethan Lee", dueDate: "2024-11-25" },
    { no: "6", name: "E-commerce Platform", displayName: "Fiona Gallagher", dueDate: "2024-12-10" },
    { no: "7", name: "SEO Optimization", displayName: "George Harrison", dueDate: "2024-11-05" },
    { no: "8", name: "Email Newsletter Design", displayName: "Holly Green", dueDate: "2024-11-12" },
    { no: "9", name: "Inventory Management System", displayName: "Ivy Wang", dueDate: "2025-01-20" },
    { no: "10", name: "Data Analysis Project", displayName: "Jack Wilson", dueDate: "2024-12-25" },
    { no: "11", name: "Social Media Strategy", displayName: "Karen Black", dueDate: "2024-11-30" },
    { no: "12", name: "UI/UX Research", displayName: "Liam Moore", dueDate: "2024-12-08" },
    { no: "13", name: "Cloud Storage Implementation", displayName: "Molly Adams", dueDate: "2025-01-10" },
    { no: "14", name: "Sales Training Workshop", displayName: "Nathan Baker", dueDate: "2024-12-20" },
    { no: "15", name: "Bug Fixes & Updates", displayName: "Olivia Clark", dueDate: "2024-11-18" },
    { no: "16", name: "New Feature Rollout", displayName: "Paul Young", dueDate: "2025-01-05" },
    { no: "17", name: "Performance Review Cycle", displayName: "Quincy Wright", dueDate: "2024-12-15" },
    { no: "18", name: "Employee Onboarding", displayName: "Rachel Gray", dueDate: "2024-11-22" },
    { no: "19", name: "Financial Audit", displayName: "Sam Lopez", dueDate: "2024-12-02" },
    { no: "20", name: "Product Launch Event", displayName: "Tina Scott", dueDate: "2025-01-15" },
    { no: "21", name: "Quarterly Budget Review", displayName: "Uma Davis", dueDate: "2024-11-28" },
    { no: "22", name: "Customer Satisfaction Survey", displayName: "Victor Hall", dueDate: "2024-11-19" },
    { no: "23", name: "Website Speed Optimization", displayName: "Wendy King", dueDate: "2024-12-05" },
    { no: "24", name: "Training Program for Interns", displayName: "Xander Bell", dueDate: "2024-12-17" },
    { no: "25", name: "User Guide Documentation", displayName: "Yvonne Martinez", dueDate: "2025-01-12" },
    { no: "26", name: "Supply Chain Analysis", displayName: "Zachary Parker", dueDate: "2025-02-01" },
    { no: "27", name: "Brand Awareness Campaign", displayName: "Amy Carter", dueDate: "2025-01-08" },
    { no: "28", name: "Quality Assurance Testing", displayName: "Ben Roberts", dueDate: "2024-11-14" },
    { no: "29", name: "Business Intelligence Dashboard", displayName: "Chris Taylor", dueDate: "2025-01-22" },
    { no: "30", name: "AI Integration Project", displayName: "Diana White", dueDate: "2025-02-10" },
  ];
  
  

  const handleSearchChange = (e) => {
    setSearchProject(e.target.value);
    setPage(1); 
  };


  const filteredProjects = mockProjects.filter((project) =>
    project.name.toLowerCase().includes(searchProject.toLowerCase()) ||
    project.displayName.toLowerCase().includes(searchProject.toLowerCase())
  );

 
  const currentProjects = filteredProjects.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleNextPage = () => {
    if (page < Math.ceil(filteredProjects.length / itemsPerPage)) {
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
        <a href="/project" className="font-semibold text-black">Project</a>
      </div>

      <div className="flex flex-col min-h-screen p-8 w-[95%] mx-auto bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="text-black text-[32px] font-semibold leading-[48px]">All My Project</div>
          <CreateProjectModal className="text-center text-base font-semibold leading-relaxed" />
        </div>

        {/* Search Input */}
        <div className="mt-8 mb-4">
          <Input
            type="text"
            value={searchProject}
            onChange={handleSearchChange}
            placeholder="Search by project name or displayname...."
            className="w-3/5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Project List */}
        <table className="w-full rounded-lg shadow-lg border-spacing-0 border-separate">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-6 text-center text-gray-700 font-semibold">No</th>
              <th className="p-6 text-center text-gray-700 font-semibold">Project</th>
              <th className="p-6 text-center text-gray-700 font-semibold">DisplayName</th>
              <th className="p-6 text-center text-gray-700 font-semibold">Created Date</th>
              <th className="p-6 text-center text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr key={index} className="bg-white hover:bg-gray-50 transition-all duration-150 rounded-lg shadow-md my-2">
                <td className="p-6 text-center text-gray-600">{(page - 1) * itemsPerPage + index + 1}</td>
                <td className="p-6 text-center text-gray-800 font-medium">{project.name}</td>
                <td className="p-6 text-center text-gray-600">{project.displayName}</td>
                <td className="p-6 text-center text-gray-600">{project.dueDate}</td>
                <td className="p-6 text-center">
                  <button className="px-4 py-2 bg-[#ffe066] text-[#333333] rounded-md">Go to Project</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 mr-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <p className="flex items-center mr-2">
            Page {page} of {Math.ceil(filteredProjects.length / itemsPerPage)}
          </p>
          <button
            onClick={handleNextPage}
            disabled={page === Math.ceil(filteredProjects.length / itemsPerPage)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

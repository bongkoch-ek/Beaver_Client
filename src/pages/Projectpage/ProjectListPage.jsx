import Input from "@/src/components/common/Input";
import CreateProjectModal from "@/src/components/CreateProjectModal";
import useUserStore from "@/src/stores/userStore";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Link } from "react-router-dom";

export default function ProjectListPage() {
  const [page, setPage] = useState(1);
  const [searchProject, setSearchProject] = useState(""); 
  const [projects, setProjects] = useState([]); 
  const token = useUserStore((state) => state.token);
  const itemsPerPage = 10;

  // ฟังก์ชัน fetch ข้อมูลโปรเจกต์จาก API
  const fetchProjects = async () => {
    try {
      const response = await fetch(`http://localhost:8888/dashboard/project`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSearchChange = (e) => {
    setSearchProject(e.target.value);
    setPage(1); 
  };

  // ฟังก์ชันเรียก fetchProjects เมื่อมีโปรเจกต์ใหม่สร้างเสร็จ
  const onProjectCreated = () => {
    fetchProjects();
  };

  // ฟิลเตอร์โปรเจกต์ตามคำค้นหา
  const filteredProjects = projects.filter((project) =>
    (project.project?.projectName || "").normalize("NFC").toLowerCase().includes(searchProject.normalize("NFC").toLowerCase()) ||
    (project.user?.displayName || "").normalize("NFC").toLowerCase().includes(searchProject.normalize("NFC").toLowerCase())
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
          <CreateProjectModal className="text-center text-base font-semibold leading-relaxed" 
           onProjectCreated={onProjectCreated} />
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
                <td className="p-6 text-center text-gray-800 font-medium">{project.project?.projectName}</td>
                <td className="p-6 text-center text-gray-600">{project.user?.displayName}</td>
                <td className="p-6 text-center text-gray-600"> {moment(project.project?.createdAt).format('LLL')}</td>
                <td className="p-6 text-center">
  <Link to={`/project/${project.project?.id}`}>
    <button className="px-4 py-2 bg-[#ffe066] text-[#333333] rounded-md">
      Go to Project
    </button>
  </Link>
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

// CreateProjectModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateProjectModal() {
  const [projectName, setProjectName] = useState('');
  const [image, setImage] = useState(null);   //น่าจะใช้ cloud
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProject = () => {
    // ลิงก์ไปยังหน้า /Project
    navigate('/project');
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
      <div className="relative mb-4 w-full">
        <div className="border rounded-lg flex items-center justify-center p-4 bg-gray-200 w-36 h-36">
          {image ? (
            <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="text-gray-500">Image Preview</div>
          )}
        </div>
        <label className="flex items-center justify-center cursor-pointer mt-2">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          <span className="bg-white border border-gray-300 rounded px-2 py-1 text-gray-700 text-sm mt-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Image
          </span>
        </label>
      </div>

      <div className="flex-grow w-full mb-4">
        <label className="block text-gray-700 mb-2">Project Name</label>
        <input
          type="text"
          placeholder="Type your project"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <button
        onClick={handleCreateProject}
        className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Create New Project
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 ml-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  );
}

export default CreateProjectModal;

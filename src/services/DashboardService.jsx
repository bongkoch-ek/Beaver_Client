import axios from "axios";

//// CREATE

export const createProject = async (formData, userId) => {
  const header = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(
    "http://localhost:8888/user/create-project",
    formData,
    header
  );
};


export const assignUserToTask = async (token, taskId, userId) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    return await axios.post(
      "http://localhost:8888/dashboard/assign-user",
      { taskId, userId },
      { headers }
    );
  };

export const createTask = async (token, form) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.post(
    "http://localhost:8888/dashboard/create-task",
    form,
    header
  );
};



export const createList = async (token, form) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.post(
    "http://localhost:8888/dashboard/create-list",
    form,
    header
  );
};



export const createComment = async (token, form) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.post(
    "http://localhost:8888/dashboard/create-comment",
    form,
    header
  );
};

export const addMember = async (token, memberData) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.post(
    "http://localhost:8888/dashboard/add-member",
    memberData,
    header
  );
};

//// READ


export const searchFilters = async (token, arg) => {
    try {
      const res = await axios.post('http://localhost:8888/dashboard/search', arg, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Backend searchFilters response:", res.data); 
      return res; 
    } catch (err) {
      console.log("Error in searchFilters API call:", err);
      throw err;
    }
  };

export const getProjectById = async (token, projectId) => {
    const header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.get(
      `http://localhost:8888/dashboard/project/${projectId}`,
      header
    );
  };

export const actionGetAllComment = async (token) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.get("http://localhost:8888/dashboard/comment", header);
};

export const getUser = async (token) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.get("http://localhost:8888/user/get-user", header);
};

export const getAllUser = async (token) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.get("http://localhost:8888/dashboard/getuser", header);
};

export const getProjectMember = async (token, projectId) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.get(
    `http://localhost:8888/dashboard/get-member/${projectId}`,
    header
  );
};

export const getTaskAssignee = async (token, taskId) => {
    const header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.get(
      `http://localhost:8888/dashboard/get-assignee/${taskId}`,
      header
    );
  };

//// Del
export const deleteTask = async (token, taskId) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.delete(
    `http://localhost:8888/dashboard/task/${taskId}`,
    header
  );
};

export const deleteList = async (token, listId) => {
    const header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.delete(
      `http://localhost:8888/dashboard/list/${listId}`,
      header
    );
}
export const deleteMember = async (token, data) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.delete(
    `http://localhost:8888/dashboard/member`, 
    { 
      headers: { Authorization: `Bearer ${token}` },
      data: data // ส่ง data ในรูปแบบ { projectId, userId }
    }
  );
};

//// Update

export const updateStatusMember = async (token, id) => {  
    return await axios.patch(
      `http://localhost:8888/dashboard/status-member/${id}`,{}, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
  };

  export const createImagesInTask = async (token, input,) => {
    const header = {
      headers: { Authorization: `Bearer ${token}` },
    }
    return await axios.post('http://localhost:8888/dashboard/create-imagetask',input,header)
  };

  export const updateProject = async (token, projectId, form) => {
    const header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.patch(
      `http://localhost:8888/dashboard/project/${projectId}`,
      form,
      header
    );
  };


  export const updateTask = async (token, taskId, form) => {
    const header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.patch(
      `http://localhost:8888/dashboard/task/${taskId}`,
      form,
      header
    );
  };

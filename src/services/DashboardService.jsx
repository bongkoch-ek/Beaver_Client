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

export const deleteList = async (token, listId) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.delete(
    `http://localhost:8888/dashboard/list/${listId}`,
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

export const getProjectById = async (token, projectId) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.get(
    `http://localhost:8888/dashboard/project/${projectId}`,
    header
  );
};

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

  export const deleteMember = async (token, data) => {
    const { projectId, userId } = data;
    return await axios.delete(
      `http://localhost:8888/dashboard/member`, 
      {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
        data: {
          projectId,
          userId
        }
      }
    );
  };

//// Update

export const updateStatusMember = async (token, id, status) => {
    const header = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = { status }; 
  
    return await axios.patch(
      `http://localhost:8888/dashboard/status-member/${id}`, 
      data,
      header
    );
  };


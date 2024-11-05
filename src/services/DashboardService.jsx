import axios from "axios";

export const actionGetAllComment = async (token) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.get("http://localhost:8888/dashboard/comment", header);
};

export const createProject = async (formData, userId) => {
  const header = {
    headers: { 
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}` 
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
  return await axios.put(
    `http://localhost:8888/user/update-project/${projectId}`,
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

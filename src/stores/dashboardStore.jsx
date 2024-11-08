import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import { createProject, updateProject } from "../services/DashboardService";
import io from "socket.io-client";



const dashboardStore = (set, get) => ({
  socket: io.connect("http://localhost:8888"),
  projects: [],
  project: [],
  column: [],
  task: [],
  list: [],
  isLoading: false,
  currentUser: null,
  error: null,

  actionCreateProject: async (projectData, token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:8888/user/create-project', projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newProject = response.data.project;

      set((state) => ({
        projects: [...state.projects, newProject],
        loading: false,
      }));

      return response.data;
    } catch (error) {
      set({ loading: false, error: error.response?.data || 'Something went wrong' });
      throw error;
    }
  },
  actionGetUserProjects: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:8888/dashboard/project`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      set({ loading: false, projects: response.data })
      return response
    }
    catch (error) {
      set({ loading: false, error: error.response?.data || 'Something went wrong' });
      throw error;
    }

  },

  actionUpdateProject: async (projectId, form) => {
    set({ isLoading: true });

    try {
      const result = await updateProject(token, projectId, form);

      set(state => ({
        project: state.project.map(p =>
          p.id === projectId ? { ...p, ...form } : p
        ),
        isLoading: false
      }));

      toast.success("Project updated successfully!");
      return result.data;

    } catch (err) {
      set({ isLoading: false });
      toast.error("Failed to update project");
      throw err;
    }
  },
  actionGetProjectById: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:8888/dashboard/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      set({ loading: false, project: response.data })
      return response
    }
    catch (error) {
      set({ loading: false, error: error.response?.data || 'Something went wrong' });
      throw error;
    }
  },

  actionCreateColumn: async (data, token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:8888/dashboard/create-list', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newColumn = response.data;

      set((state) => ({
        projects: [...state.column, newColumn],
        loading: false,
      }));

      return response.data;
    } catch (error) {
      set({ loading: false, error: error.response?.data || 'Something went wrong' });
      throw error;
    }
  },

  actionGetTodayTask: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:8888/dashboard/today-task`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      set({ loading: false, task: response.data })
      return response
    }
    catch (error) {
      set({ loading: false, error: error.response?.data || 'Something went wrong' });
      throw error;
    }

  },

  actionActivityLog: async (projectId, token) => {
    try {
      const response = await axios.post('http://localhost:8888/dashboard/create-activitylog', {projectId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
});

const useDashboardStore = create(dashboardStore);

export default useDashboardStore;
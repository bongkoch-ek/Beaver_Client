import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import {createProject, updateProject} from "../services/DashboardService"; 
import io from "socket.io-client";



const dashboardStore = (set, get) => ({
 socket : io.connect("http://localhost:8888"),
  projects: [],
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
  actionGetUserProjects: async (userId, token) => {
    set({ loading: true, error: null });
    try {
      const state = await axios.get(`http://localhost:8888/dashboard/project/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(state)
      return state
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
});

const useDashboardStore = create(dashboardStore);

export default useDashboardStore;
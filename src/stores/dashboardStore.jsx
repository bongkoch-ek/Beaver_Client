import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import {createProject} from "../services/DashboardService";

const dashboardStore = (set, get) => ({
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
  
  },  getUserProjects: (userId) => {
    const state = get();
    return state.project.filter(p => p.owner === userId);
  }
});

const usePersist = {
  name: "state",
  storage: createJSONStorage(() => localStorage),
};

const useDashboardStore = create(persist(dashboardStore, usePersist));

export default useDashboardStore;
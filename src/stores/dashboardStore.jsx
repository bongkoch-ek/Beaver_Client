import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import {createProject, updateProject} from "../services/DashboardService"; 


const dashboardStore = (set, get) => ({
  project: [],
  task: [],
  list: [],
  isLoading: false,
  currentUser: null,
  
  actionCreateProject: async (form, userId) => {
    set({ isLoading: true });
    
    try {
      const result = await createProject(token, {
        ...form,
        userId,
        createdBy: userId
      });
      
      set(state => ({
        project: [...state.project, {
          ...result.data.project,
          owner: userId
        }],
        isLoading: false
      }));

      toast.success("Project created successfully!");
      return result.data;
      
    } catch (err) {
      set({ isLoading: false });
      toast.error("Failed to create project");
      throw err;
    }
  },

  getUserProjects: (userId) => {
    const state = get();
    return state.project.filter(p => p.owner === userId);
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

const usePersist = {
  name: "state",
  storage: createJSONStorage(() => localStorage),
};

const useDashboardStore = create(persist(dashboardStore, usePersist));

export default useDashboardStore;
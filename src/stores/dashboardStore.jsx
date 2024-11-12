import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import {
  createProject,
  createTask,
  searchFilters,
  deleteList,
  updateProject,
  updateTask,
} from "../services/DashboardService";
import io from "socket.io-client";

const useDashboardStore = create(
  persist(
    (set) => ({
      socket: io.connect("http://localhost:8888"),
      projects: [],
      project: [],
      column: [],
      images: [],
      task: [],
      list: [],
      users: [],
      activityLogs: [],
      isLoading: false,
      currentUser: null,
      error: null,

      actionCreateProject: async (projectData, token) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(
            "http://localhost:8888/user/create-project",
            projectData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const newProject = response.data.project;
          console.log(newProject);
          set((state) => ({
            project: newProject,
            images: newProject.images, // Store the images in the state
            loading: false,
          }));
          return response.data;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data || "Something went wrong",
          });
          throw error;
        }
      },

      actionGetUserProjects: async (token) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(
            `http://localhost:8888/dashboard/project`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          set({ loading: false, projects: response.data });
          return response;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data || "Something went wrong",
          });
          throw error;
        }
      },

      actionUpdateProject: async (token, projectId, form) => {
        set({ isLoading: true });
        try {
          const result = await updateProject(token, projectId, form);
          set((state) => ({
            projects: state.projects.map((p) =>
              p.id === projectId ? { ...p, ...form } : p
            ),
            images: form.images || state.images, 
            isLoading: false,
          }));
          toast.success("Project updated successfully!");
          return result.data;
        } catch (err) {
          set({ isLoading: false });
          toast.error("Failed to update project");
          throw err;
        }
      },
      

      actionCreateTask: async (token, form) => {
        set({ isLoading: true });

        try {
          const result = await createTask(token, form);

          set((state) => ({
            task: [{ ...result.data }, ...state.task],
            isLoading: false,
          }));

          toast.success("Task created successfully!");
          return result.data;
        } catch (err) {
          set({ isLoading: false });
          toast.error("Failed to create task");
          throw err;
        }
      },
      actionGetProjectById: async (projectId, token) => {
        try {
          const response = await axios.get(
            `http://localhost:8888/dashboard/project/${projectId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const project = response.data;
          set({
            project,
            images: project.images, 
          });
          return project;
        } catch (error) {
          console.error("Error fetching project data:", error);
          throw error;
        }
      },
      actionCreateColumn: async (data, token) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(
            "http://localhost:8888/dashboard/create-list",
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const newColumn = response.data;

          set((state) => ({
            projects: [...state.column, newColumn],
            loading: false,
          }));

          return response.data;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data || "Something went wrong",
          });
          throw error;
        }
      },

      actionDeleteColumn: async (token, listId) => {
        set({ loading: true, error: null });
        try {
          const response = await deleteList(token, listId);
          console.log(response);
          set((state) => ({
            projects: state.column.filter((item) => item.id !== listId),
          }));
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data || "Something went wrong",
          });
          throw error;
        }
      },

      actionGetTodayTask: async (token) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(
            `http://localhost:8888/dashboard/today-task`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          set({ loading: false, task: response.data });
          return response;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data || "Something went wrong",
          });
          throw error;
        }
      },

      actionActivityLog: async (projectId, token) => {
        try {
          const response = await axios.post(
            "http://localhost:8888/dashboard/create-activitylog",
            { projectId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return response.data;
        } catch (error) {
          throw error;
        }
      },

      actionCreateActivityLog: async (projectId, token) => {
        try {
          const response = await axios.post(
            "http://localhost:8888/dashboard/create-activitylog",
            { projectId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return response.data;
        } catch (error) {
          throw error;
        }
      },

      actionGetActivityLog: async (token) => {
        try {
          set({ loading: true, error: null });
          const response = await axios.get(
            "http://localhost:8888/dashboard/activitylog",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          set({ loading: false, activityLogs: response.data.data.activityLog });
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      actionGetAllUser : async (token) => {
        try {
          const response = await axios.get('http://localhost:8888/dashboard/getuser', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          set({ loading: false, users: response.data })
          console.log(response.data)
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      actionSearchFilters: async (arg) => {
        try {
          const res = await searchFilters(arg);
          set({ users: res.data });
        } catch (err) {
          console.log(err);
        }
      },
    
    actionMoveTask: async (token, taskId, listId) => {
        try {
          set({ loading: true, error: null });
          const response = await updateTask(token, taskId, { listId });
          set((state) => ({
            task: state.task.map((item) =>
              item.id === taskId ? { ...item, listId } : item
            ),
            isLoading: false,
          }));
          toast.success("Task Updated Successfully");
          return response.data;
        } catch (error) {
          throw error;
        }
      }},
    {
      name: "project-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        project: state.project,
      }),
    }
  ))
); 


export default useDashboardStore;

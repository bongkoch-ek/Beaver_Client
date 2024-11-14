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
  updateStatusMember,
  getProjectMember,
  updateTask,
  deleteTask,
  assignUserToTask
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
      taskById: [],
      list: [],
      users: [],
      activityLogs: [],
      projectMember: [],
      webLink: [],
      comments: [],
      isLoading: false,
      currentUser: null,
      error: null,
      selectedMember: null,

      actionClearTaskId: async () => {
        set({ taskById: [] });
      },
      actionCreateProject: async (projectData, token) => {
        set({ isLoading: true, error: null });
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
            images: newProject.images, 
            isLoading: false,
          }));
          return response.data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data || "Something went wrong",
          });
          throw error;
        }
      },

      actionGetUserProjects: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get(
            `http://localhost:8888/dashboard/project`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          set({ isLoading: false, projects: response.data });
          return response;
        } catch (error) {
          set({
            isLoading: false,
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
      actionDeleteTask: async (token, taskId) => {
        set({ isLoading: true });

        try {
          const result = await deleteTask(token, taskId);

          set((state) => ({
            task: state.task.filter((item) => item.id !== taskId),
          }));

          toast.success("Task deleted successfully!");
          return result.data;
        } catch (err) {
          set({ isLoading: false });
          toast.error("Failed to delete task");
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
        set({ isLoading: true, error: null });
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
            isLoading: false,
          }));

          return response.data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data || "Something went wrong",
          });
          throw error;
        }
      },

      actionEditColumn: async (data, token, listId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.patch(
            `http://localhost:8888/dashboard/list/${listId}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const editColumn = response.data;
          console.log(editColumn, "editt");

          // set((state) => ({
          //   projects: [...state.column, newColumn],
          //   loading: false,
          // }));

          return response.data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data || "Something went wrong",
          });
          throw error;
        }
      },

      actionDeleteColumn: async (token, listId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await deleteList(token, listId);
          set((state) => ({
            projects: state.column.filter((item) => item.id !== listId),
          }));
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data || "Something went wrong",
          });
          throw error;
        }
      },

      actionGetTodayTask: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get(
            `http://localhost:8888/dashboard/today-task`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          set({ isLoading: false, task: response.data });
          return response;
        } catch (error) {
          set({
            isLoading: false,
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
          set({ isLoading: true, error: null });
          const response = await axios.get(
            "http://localhost:8888/dashboard/activitylog",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          set({ isLoading: false, activityLogs: response.data.data.activityLog });
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      actionGetAllUsers: async (token) => {
        try {
          const res = await getAllUsers(token);
          set({ users: res.data });
        } catch (err) {
          console.log(err);
        }
      },
      actionSearchFilters: async (token, arg) => {
        try {
          const res = await searchFilters(token, arg);
          console.log("Response from searchFilters:", res.data);
          set({ users: res.data });
          return res.data;
        } catch (err) {
          console.log("Error in actionSearchFilters:", err);
        }
      },

      actionMoveTask: async (token, taskId, listId) => {
        try {
          set({ isLoading: true, error: null });
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
      },
      actionGetTask: async (taskId, token) => {
        try {
          set({ isLoading: true, error: null });
          const response = await axios.get(
            `http://localhost:8888/dashboard/task/${taskId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          set({ isLoading: false, taskById: response.data });
          return response.data;
        } catch (error) {
          throw error;
        }
      },

      actionUpdateTask: async (id, form, token) => {
        set({ isLoading: true });

        try {
          const response = await axios.patch(
            `http://localhost:8888/dashboard/task/${id}`,
            form,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          set({ isLoading: false, taskById: response.data });
          return response.data;
        } catch (err) {
          set({ isLoading: false });
          toast.error("Failed to update task");
          throw err;
        }
      },

      actionCreateLink: async (form, token) => {
        set({ isLoading: true });

        try {
          const response = await axios.post(
            `http://localhost:8888/dashboard/create-weblink`,
            form,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          set({ isLoading: false, webLink: response.data });
          return response.data;
        } catch (err) {
          set({ isLoading: false });
          toast.error("Failed to upload link");
          throw err;
        }
      },

      actionDeleteLink: async (token, id) => {
        set({ isLoading: true });
        try {
          console.log(token);
          const response = await axios.delete(
            `http://localhost:8888/dashboard/weblink/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          set({ isLoading: false });
          return response.data;
        } catch (err) {
          set({ isLoading: false });
          toast.error("Failed to delete link");
          throw err;
        }
      },
      
      actionUpdateStatusMember: async (token, id) => {
        set({ isLoading: true });
        try {
          const result = await updateStatusMember(token, id);
          set({ isLoading: false });
          toast.success("Member status updated successfully!");
          return result.data;
        } catch (err) {
          set({ isLoading: false });
          // console.log(err.response.data.err)
          toast.error(err.response.data.err);
          throw err;
        }
      },
      actionComment: async (form, token) => {
        set({ isLoading: true });

        try {
          const response = await axios.post(
            `http://localhost:8888/dashboard/create-comment`,
            form,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          set({ isLoading: false });
          return response.data;
        } catch (err) {
          set({ isLoading: false });
          toast.error("Failed to comment");
          throw err;
        }
      },

      actionGetCommentByTaskId: async (id, token) => {
        set({ isLoading: true });

        try {
          const response = await axios.get(
            `http://localhost:8888/dashboard/comment/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          set({ isLoading: false, comments: response.data });
          return response.data;
        } catch (err) {
          set({ isLoading: false });
          toast.error("Failed to get comment");
          throw err;
        }
      },
    }),

    {
      name: "project-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        project: state.project,
      }),
    }
  )
);

export default useDashboardStore;

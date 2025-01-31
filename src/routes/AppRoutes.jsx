import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import ProjectPage from "../pages/Projectpage/ProjectPage";
import Error401Page from "../pages/Error401Page";
import ProjectLayout from "../layouts/ProjectLayout";
import ProjectList from "../components/ProjectList";
import ProjectDetailPage from "../pages/Projectpage/ProjectDetailPage";
import Profile from "../pages/Profile";
import ProjectListPage from "../pages/Projectpage/ProjectListPage";
import ProtectRoute from "./ProtectRoute";
import LoadingMember from "./LoadingMember";
import LoadingErrorPage from "./LoadingErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <Profile /> },
      { path: "register", element: <Register /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <LoadingErrorPage /> },
    ],
  },   {
    path: "/project",
    element: <ProtectRoute element={<ProjectLayout />} />,
    children: [
      { index: true, element: <ProjectPage /> },
      { path: "list", element: <ProjectListPage /> },
      { path: ":projectId", element: <ProjectDetailPage /> },
      // { path: "loading/:projectId", element: <LoadingMember /> },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;



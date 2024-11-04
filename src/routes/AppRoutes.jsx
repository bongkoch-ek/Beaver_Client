import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Register from "../pages/register";
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


const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      {path: "profile", element: <Profile/>},
      { path: "register", element: <Register /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/project",
    element: <ProjectLayout />,
    children: [
      { path: "", element: <ProjectPage /> },

      { path: "detail", element: <ProjectDetailPage /> },

    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;

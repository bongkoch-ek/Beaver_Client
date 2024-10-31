import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Register from "../pages/register";
import Login from "../pages/login";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import ProjectList from "@/components/ui/Project";
import ProjectName from "@/components/ui/ProjectName";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
    <UserLayout /> 
    </>,
    children: [
      { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <ErrorPage /> },
      { path: "project", element: <ProjectList /> },
      { path: "projectname", element: <ProjectName /> },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default AppRoutes;
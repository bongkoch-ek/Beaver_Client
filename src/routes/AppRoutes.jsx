import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Register from "../pages/register";
import Login from "../pages/login";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import ProjectPage from "../pages/ProjectPage";
import Error401Page from "../pages/Error401Page";



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
      { path: "project", element: <ProjectPage /> },
      { path: "*", element: <ErrorPage /> },


    ],
  },
]);

const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default AppRoutes;
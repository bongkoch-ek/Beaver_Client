import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Register from "../pages/register";
import Login from "../pages/login";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";

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
    ],
  },
]);

const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default AppRoutes;
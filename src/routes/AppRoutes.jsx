import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
// import UserLayout from "../layouts/UserLayout";
import Register from "../pages/register";
import Login from "../pages/login";
import UserLayout from "../layouts/UserLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />, // ใช้ UserLayout สำหรับเส้นทางที่มี Navbar
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default AppRoutes;
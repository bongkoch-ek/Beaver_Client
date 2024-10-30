import Navbar from '@/components/ui/navbar';
import React from 'react';
import  {Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div >
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
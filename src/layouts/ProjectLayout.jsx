import React from 'react';
import  {Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';


const UserLayout = () => {
  return (
    <div className='bg-gray-100'>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
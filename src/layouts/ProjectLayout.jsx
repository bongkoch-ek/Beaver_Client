import React from 'react';
import  {Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';


const UserLayout = () => {
  return (
    <div className='bg-gray-100'>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
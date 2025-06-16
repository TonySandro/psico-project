import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/navigation/sidebar/sideBar';
import NavBar from '../components/navigation/navbar/navBar';

const MainLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SideBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

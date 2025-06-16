import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/navigation/sidebar/sideBar';

const MainLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <main style={{ flex: 1, padding: '16px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

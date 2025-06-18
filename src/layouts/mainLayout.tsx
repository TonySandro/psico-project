import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../components/ui/SideMenu';
import AppNavbar from '../components/ui/AppNavbar';

const MainLayout: React.FC = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <SideMenu />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <AppNavbar />
                <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;

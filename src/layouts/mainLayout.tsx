import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../components/ui/SideMenu';
import AppBarLayout from '../components/ui/AppNavbar';
 
const MainLayout: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <SideMenu mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
            <AppBarLayout onMenuClick={handleDrawerToggle} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;

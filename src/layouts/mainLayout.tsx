import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SideMenu from '../components/ui/SideMenu';
import AppNavbar from '../components/ui/AppNavbar';
import AppBarLayout from '../components/ui/AppNavbar';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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

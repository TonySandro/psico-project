import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import SideMenu from '../components/ui/SideMenu';
import AppBarLayout from '../components/ui/AppNavbar';

const MainLayout: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
            <SideMenu mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <AppBarLayout onMenuClick={handleDrawerToggle} />

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        p: { xs: 2, md: 3 }, // Padding responsivo
                        mt: 8 // Espaço para AppBar fixa se necessário, ou ajustar AppNavbar
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;

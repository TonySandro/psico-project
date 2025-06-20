import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface AppBarLayoutProps {
  onMenuClick: () => void;
}

export default function AppBarLayout({ onMenuClick }: AppBarLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-start' }}>
        {isMobile && (
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ color: 'black' }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

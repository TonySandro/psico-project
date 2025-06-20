import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AppBranding() {
  return (
    <Box
      component={Link}
      to="/home"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        cursor: 'pointer',
        height: 50,
        width: '100%',
        px: 2,
        backgroundColor: 'transparent',
        transition: 'background-color 0.2s ease-in-out',

        '&:hover': {
          backgroundColor: '#8ac0ca2f',
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#000000',
          fontWeight: 500,
          fontSize: '1.2rem',
          textAlign: 'center',
        }}
      >
        NeuroPPAvalia
      </Typography>
    </Box>
  );
}

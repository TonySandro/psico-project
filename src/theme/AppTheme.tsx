
import { createTheme, ThemeOptions } from '@mui/material/styles';

const palette = {
    primary: {
        main: '#00796B', // Teal (Clinical, Clean, Trust)
        light: '#B2DFDB',
        dark: '#004D40',
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#7986CB', // Soft Indigo (Calming)
        light: '#C5CAE9',
        dark: '#303F9F',
        contrastText: '#ffffff',
    },
    background: {
        default: '#F4F6F8', // Very light grey/blue ish
        paper: '#FFFFFF',
    },
    text: {
        primary: '#1A2027',
        secondary: '#3E5060',
    },
    success: {
        main: '#4CAF50',
        light: '#E8F5E9',
    },
    info: {
        main: '#03A9F4',
        light: '#E1F5FE',
    },
    warning: {
        main: '#FF9800',
        light: '#FFF3E0',
    },
    error: {
        main: '#EF5350',
        light: '#FFEBEE',
    },
};

const typography = {
    fontFamily: [
        'Inter',
        'Poppins',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
    ].join(','),
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
};

const components: ThemeOptions['components'] = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
            },
            contained: {
                '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                },
            },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Soft shadow
                border: 'none',
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none', // Remove default dark mode overlay if user switches (not yet implemented but good practice)
            },
        },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                borderRight: '1px solid rgba(0, 0, 0, 0.05)',
                backgroundColor: '#FFFFFF',
            },
        },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: 'transparent',
            },
        },
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                margin: '4px 8px',
                '&.Mui-selected': {
                    backgroundColor: '#E0F2F1', // Very light primary
                    color: '#00796B',
                    '&:hover': {
                        backgroundColor: '#B2DFDB',
                    },
                    '& .MuiListItemIcon-root': {
                        color: '#00796B',
                    },
                },
            },
        },
    },
};

export const theme = createTheme({
    palette,
    typography,
    components,
    shape: {
        borderRadius: 8,
    },
});

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#14B8A6',
      light: '#2DD4BF',
      dark: '#0F766E',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#10B981',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#F59E0B',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#EF4444',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      disabled: '#9CA3AF'
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    divider: '#E5E7EB'
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66
    }
  },
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '0px 5px 15px rgba(0, 0, 0, 0.08)',
    '0px 10px 24px rgba(0, 0, 0, 0.08)',
    '0px 15px 35px rgba(0, 0, 0, 0.08)',
    '0px 20px 40px rgba(0, 0, 0, 0.08)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)'
  ]
});

export default theme;
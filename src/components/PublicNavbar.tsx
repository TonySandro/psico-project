import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { HeartPulse, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { label: 'Plataforma', path: '/plataforma' },
  { label: 'Recursos', path: '/plataforma#recursos' },
  { label: 'Quem Somos', path: '/quem-somos' },
];

export default function PublicNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (path: string) => {
    setMobileOpen(false);
    if (path.includes('#')) {
      const [basePath, hash] = path.split('#');
      if (location.pathname !== basePath) {
        navigate(path);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        navigate(path);
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Toolbar sx={{ maxWidth: 1280, mx: 'auto', width: '100%', px: { xs: 2, md: 4 } }}>
          {/* Brand */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <HeartPulse size={20} color="white" />
            </Box>
            <Typography variant="h6" fontWeight={700} sx={{ fontSize: '1.1rem' }}>
              NPPAvalia
            </Typography>
          </Stack>

          {/* Desktop nav links */}
          {!isMobile && (
            <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
              {navLinks.map((link) => {
                const isActive = (() => {
                  if (link.path === '/plataforma') {
                    return location.pathname === '/plataforma' && location.hash !== '#recursos';
                  }
                  if (link.path === '/plataforma#recursos') {
                    return (location.pathname === '/plataforma' && location.hash === '#recursos') || location.pathname.startsWith('/recursos/');
                  }
                  return location.pathname === link.path;
                })();

                return (
                  <Button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    sx={{
                      color: isActive ? 'primary.main' : 'text.secondary',
                      fontWeight: isActive ? 600 : 500,
                      '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                      textTransform: 'none',
                      fontSize: '0.9rem',
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </Stack>
          )}

          {/* CTAs */}
          {!isMobile && (
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate('/login')}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Entrar
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate('/signup')}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Criar conta
              </Button>
            </Stack>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton onClick={() => setMobileOpen(true)} color="inherit">
              <Menu size={22} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 260, p: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography fontWeight={700}>NPPAvalia</Typography>
          <IconButton onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </IconButton>
        </Box>
        <List disablePadding>
          {navLinks.map((link) => {
            const isActive = (() => {
              if (link.path === '/plataforma') {
                return location.pathname === '/plataforma' && location.hash !== '#recursos';
              }
              if (link.path === '/plataforma#recursos') {
                return (location.pathname === '/plataforma' && location.hash === '#recursos') || location.pathname.startsWith('/recursos/');
              }
              return location.pathname === link.path;
            })();

            return (
              <ListItemButton
                key={link.path}
                onClick={() => handleNav(link.path)}
                sx={{
                  borderRadius: 1,
                  bgcolor: isActive ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                  color: isActive ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    bgcolor: isActive ? 'rgba(59, 130, 246, 0.12)' : 'action.hover',
                  }
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'primary.main' : 'inherit'
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button fullWidth variant="outlined" onClick={() => { setMobileOpen(false); navigate('/login'); }} sx={{ textTransform: 'none' }}>
            Entrar
          </Button>
          <Button fullWidth variant="contained" onClick={() => { setMobileOpen(false); navigate('/signup'); }} sx={{ textTransform: 'none' }}>
            Criar conta
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

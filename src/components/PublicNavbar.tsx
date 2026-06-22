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
import { useState, useEffect } from 'react';

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'background.paper',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          color: 'text.primary',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.05)',
          zIndex: theme.zIndex.appBar,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(0, 0, 0, 0.02)',
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
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.08) rotate(5deg)',
                }
              }}
            >
              <HeartPulse size={20} color="white" />
            </Box>
            <Typography variant="h6" fontWeight={700} sx={{ fontSize: '1.1rem', letterSpacing: -0.2 }}>
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
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      position: 'relative',
                      px: 2,
                      py: 1,
                      transition: 'color 0.2s',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        width: isActive ? '70%' : '0%',
                        height: '2px',
                        bgcolor: 'primary.main',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: 'translateX(-50%)',
                      },
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: 'transparent',
                        '&::after': {
                          width: '70%',
                        },
                      },
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
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 2.5,
                  py: 0.8,
                  borderRadius: 2,
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'grey.50',
                    borderColor: 'text.secondary',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Entrar
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate('/signup')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 2.5,
                  py: 0.8,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.3)',
                    transform: 'translateY(-1px)',
                    bgcolor: 'primary.dark',
                  },
                }}
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
        PaperProps={{
          sx: {
            width: 280,
            p: 3,
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            borderLeft: '1px solid rgba(0, 0, 0, 0.05)',
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '6px',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HeartPulse size={16} color="white" />
            </Box>
            <Typography fontWeight={700} variant="subtitle1">NPPAvalia</Typography>
          </Stack>
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
                  borderRadius: 2,
                  mb: 0.5,
                  bgcolor: isActive ? 'rgba(59, 130, 246, 0.06)' : 'transparent',
                  color: isActive ? 'primary.main' : 'text.primary',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'action.hover',
                    transform: 'translateX(4px)',
                  }
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.95rem',
                    color: isActive ? 'primary.main' : 'inherit'
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
        <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5, pt: 4 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => { setMobileOpen(false); navigate('/login'); }}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              py: 1,
              borderRadius: 2,
            }}
          >
            Entrar
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => { setMobileOpen(false); navigate('/signup'); }}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              py: 1,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
            }}
          >
            Criar conta
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

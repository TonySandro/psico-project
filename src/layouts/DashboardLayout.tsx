import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Avatar, Menu, MenuItem, Divider, Box, Dialog, DialogContent, Button } from '@mui/material';
import { Menu as MenuIcon, LayoutDashboard, Users, ClipboardList, MessageSquare, UserCircle, LogOut, FileText, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { useLogout } from '@/hooks/useAuth';
import ErrorBoundary from '@/components/ErrorBoundary';

const DRAWER_WIDTH = 240;

const menuItems = [
  { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Pacientes', path: '/app/patients', icon: Users },
  { label: 'Anamneses', path: '/app/anamnesis/templates', icon: FileText },
  { label: 'Rel. Professor', path: '/app/teacher-report/templates', icon: FileText },
  { label: 'Testes', path: '/app/tests', icon: ClipboardList },
  { label: 'Feedback', path: '/app/feedback', icon: MessageSquare },
  { label: 'Perfil', path: '/app/profile', icon: UserCircle }
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showBetaModal, setShowBetaModal] = useState(() => {
    return !localStorage.getItem('npp_seen_free_test_notice');
  });

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/');
      }
    });
  };

  return (
    <Box className="flex h-screen">
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon size={24} />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Sistema de Gestão Clínica
          </Typography>

          <IconButton onClick={handleUserMenuOpen}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                fontSize: '0.875rem'
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Stack className="px-4 py-2 min-w-[200px]">
              <Typography variant="body2" fontWeight={600}>
                {user?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Stack>
            <Divider />
            <MenuItem onClick={() => { navigate('/app/profile'); handleUserMenuClose(); }}>
              <ListItemIcon>
                <UserCircle size={20} />
              </ListItemIcon>
              Perfil
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogOut size={20} />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="persistent"
        open={sidebarOpen}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }
        }}
      >
        <Toolbar />
        <Box className="p-4">
          <List>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <ListItem key={item.path} disablePadding className="mb-1">
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    selected={isActive}
                    sx={{
                      borderRadius: '8px',
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          bgcolor: 'primary.dark'
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'primary.contrastText'
                        }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Icon size={20} />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        className="flex-1 overflow-auto"
        sx={{
          marginLeft: sidebarOpen ? 0 : `-${DRAWER_WIDTH}px`,
          transition: (theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
          bgcolor: 'background.default'
        }}
      >
        <Toolbar />
        <Box className="p-6">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Box>
      </Box>

      {/* Aviso de Fase de Testes / Gratuito */}
      <Dialog
        open={showBetaModal}
        onClose={() => {
          localStorage.setItem('npp_seen_free_test_notice', 'true');
          setShowBetaModal(false);
        }}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            backgroundImage: 'none',
            bgcolor: '#ffffff',
            overflow: 'hidden'
          }
        }}
      >
        {/* Banner com Gradiente e Ícone */}
        <Box
          sx={{
            height: '140px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}
        >
          {/* Botão de Fechar no Canto Superior Direito */}
          <IconButton
            onClick={() => {
              localStorage.setItem('npp_seen_free_test_notice', 'true');
              setShowBetaModal(false);
            }}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              color: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                color: '#ffffff',
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <X size={20} />
          </IconButton>
          
          <Stack spacing={1} alignItems="center" sx={{ mt: 2 }}>
            <Box
              sx={{
                p: 1.5,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                animation: 'pulse 2s infinite ease-in-out',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.4)' },
                  '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(255, 255, 255, 0)' },
                  '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' }
                }
              }}
            >
              <Sparkles size={32} className="text-white" />
            </Box>
          </Stack>
        </Box>

        <DialogContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1F2937', mb: 1.5, letterSpacing: '-0.5px' }}>
            Acesso Gratuito & Fase de Testes
          </Typography>
          
          <Typography variant="body2" sx={{ color: '#4B5563', mb: 3, lineHeight: 1.6, fontSize: '0.95rem' }}>
            Olá! O <strong>NeuroPPAvalia</strong> está atualmente em <strong>fase de testes (Beta)</strong> e disponível <strong>totalmente de graça</strong> para você.
            <br /><br />
            Como a plataforma está em constante evolução, o seu feedback é extremamente importante para nós! Se encontrar algum erro ou quiser sugerir alguma melhoria, por favor envie através da aba <strong>Feedback</strong> no menu lateral.
          </Typography>

          <Stack spacing={1.5} direction="column" width="100%">
            <Button
              onClick={() => {
                localStorage.setItem('npp_seen_free_test_notice', 'true');
                setShowBetaModal(false);
                navigate('/app/feedback');
              }}
              variant="contained"
              disableElevation
              sx={{
                py: 1.5,
                borderRadius: 2.5,
                bgcolor: '#3B82F6',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                textTransform: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: '#2563EB',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }
              }}
            >
              Ir para Feedback
            </Button>
            
            <Button
              onClick={() => {
                localStorage.setItem('npp_seen_free_test_notice', 'true');
                setShowBetaModal(false);
              }}
              variant="outlined"
              sx={{
                py: 1.2,
                borderRadius: 2.5,
                borderColor: '#D1D5DB',
                color: '#4B5563',
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#9CA3AF',
                  bgcolor: '#F9FAFB',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Começar a usar
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

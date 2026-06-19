import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useSubscription } from '@/hooks/useSubscription';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { loading, isExpired } = useSubscription();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#F9FAFB' }}>
        <CircularProgress size={50} sx={{ color: '#3B82F6' }} />
      </Box>
    );
  }

  if (isExpired) {
    return <Navigate to="/payment/subscribe" replace />;
  }

  return <>{children}</>;
}
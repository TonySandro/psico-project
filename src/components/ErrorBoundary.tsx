import React from 'react';
import * as Sentry from '@sentry/react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface FallbackProps {
  error?: Error;
  resetError?: () => void;
}

const ErrorFallback: React.FC<FallbackProps> = ({ resetError }) => {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh', py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
          width: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2
          }}
        >
          <AlertTriangle size={32} />
        </Box>

        <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom color="text.primary">
          Algo inesperado aconteceu
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Nossa equipe foi notificada e já estamos trabalhando para resolver o problema.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<RefreshCw size={18} />}
          onClick={() => {
            if (resetError) {
              resetError();
            } else {
              window.location.reload();
            }
          }}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Recarregar Página
        </Button>
      </Paper>
    </Container>
  );
};

export const GlobalErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => {
        const errObj = error as Error | undefined;
        const errorMsg = errObj?.message || String(error || '');
        if (
          errorMsg.includes('Failed to fetch dynamically imported module') ||
          errorMsg.includes('Importing a module script failed') ||
          errObj?.name === 'ChunkLoadError'
        ) {
          const refreshed = sessionStorage.getItem('eb-chunk-refreshed');
          if (!refreshed) {
            sessionStorage.setItem('eb-chunk-refreshed', 'true');
            window.location.reload();
            return <React.Fragment />;
          }
        }
        return <ErrorFallback error={errObj} resetError={resetError} />;
      }}
      showDialog={false}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default GlobalErrorBoundary;

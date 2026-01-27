import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, Button, Typography, Alert, Stack, Box, CircularProgress } from '@mui/material';
import { HeartPulse, CheckCircle, XCircle } from 'lucide-react';


type ConfirmationState = 'loading' | 'success' | 'error';

export default function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<ConfirmationState>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const token = searchParams.get('token');

  const confirmEmail = async () => {
    if (!token) {
      setState('error');
      setErrorMessage('Token de confirmação não encontrado na URL.');
      return;
    }

    try {
      setState('loading');
      // await api.get(`/confirm-email?token=${token}`);
      setState('success');
    } catch (error: any) {
      setState('error');
      setErrorMessage(
        error.response?.data?.message ||
        'Erro ao confirmar email. O link pode estar expirado ou inválido.'
      );
    }
  };

  useEffect(() => {
    confirmEmail();
  }, []);

  const handleRetry = () => {
    confirmEmail();
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center"
      sx={{ bgcolor: 'background.default' }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', mx: 2 }}>
        <CardContent className="p-8">
          <Stack spacing={3} alignItems="center" className="mb-6">
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '12px',
                bgcolor: state === 'success' ? 'success.main' : state === 'error' ? 'error.main' : 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease'
              }}
            >
              {state === 'loading' && <HeartPulse size={32} color="white" />}
              {state === 'success' && <CheckCircle size={32} color="white" />}
              {state === 'error' && <XCircle size={32} color="white" />}
            </Box>
            <Stack alignItems="center">
              <Typography variant="h5" fontWeight={700}>
                {state === 'loading' && 'Confirmando Email'}
                {state === 'success' && 'Email Confirmado!'}
                {state === 'error' && 'Erro na Confirmação'}
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                {state === 'loading' && 'Aguarde enquanto confirmamos seu email...'}
                {state === 'success' && 'Sua conta foi ativada com sucesso'}
                {state === 'error' && 'Não foi possível confirmar seu email'}
              </Typography>
            </Stack>
          </Stack>

          {state === 'loading' && (
            <Box display="flex" justifyContent="center" py={3}>
              <CircularProgress />
            </Box>
          )}

          {state === 'success' && (
            <Stack spacing={2}>
              <Alert severity="success">
                Seu email foi confirmado com sucesso! Agora você pode fazer login na plataforma.
              </Alert>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                fullWidth
              >
                Ir para Login
              </Button>
            </Stack>
          )}

          {state === 'error' && (
            <Stack spacing={2}>
              <Alert severity="error">
                {errorMessage}
              </Alert>
              <Button
                onClick={handleRetry}
                variant="contained"
                size="large"
                fullWidth
              >
                Tentar Novamente
              </Button>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Precisa de ajuda?{' '}
                <Link to="/login" style={{ color: 'inherit', fontWeight: 600 }}>
                  Voltar ao Login
                </Link>
              </Typography>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

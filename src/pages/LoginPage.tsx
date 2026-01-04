import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Typography, Alert, Stack, Box } from '@mui/material';
import { useLogin } from '@/hooks/useAuth';
import { HeartPulse } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password }, {
      onSuccess: () => {
        navigate('/dashboard');
      }
    });
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
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <HeartPulse size={32} color="white" />
            </Box>
            <Stack alignItems="center">
              <Typography variant="h5" fontWeight={700}>
                Bem-vindo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Entre na sua conta
              </Typography>
            </Stack>
          </Stack>

          {error && (
            <Alert severity="error" className="mb-4">
              Email ou senha inválidos
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              
              <TextField
                fullWidth
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isPending}
                sx={{ mt: 2 }}
              >
                {isPending ? 'Entrando...' : 'Entrar'}
              </Button>

              <Typography variant="body2" color="text.secondary" textAlign="center">
                Não tem uma conta?{' '}
                <Link to="/signup" style={{ color: 'inherit', fontWeight: 600 }}>
                  Cadastre-se
                </Link>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
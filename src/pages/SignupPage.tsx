import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Typography, Alert, Stack, Box } from '@mui/material';
import { useSignup } from '@/hooks/useAuth';
import { HeartPulse } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { mutate: signup, isPending } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== passwordConfirmation) {
      setErrorMessage('As senhas não coincidem');
      return;
    }

    signup({ name, email, password, passwordConfirmation }, {
      onSuccess: () => {
        navigate('/dashboard');
      },
      onError: () => {
        setErrorMessage('Erro ao criar conta. Tente novamente.');
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
                Criar Conta
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comece a gerenciar seus pacientes
              </Typography>
            </Stack>
          </Stack>

          {errorMessage && (
            <Alert severity="error" className="mb-4">
              {errorMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />

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
                autoComplete="new-password"
              />

              <TextField
                fullWidth
                label="Confirmar Senha"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                autoComplete="new-password"
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isPending}
                sx={{ mt: 2 }}
              >
                {isPending ? 'Criando conta...' : 'Cadastrar'}
              </Button>

              <Typography variant="body2" color="text.secondary" textAlign="center">
                Já tem uma conta?{' '}
                <Link to="/login" style={{ color: 'inherit', fontWeight: 600 }}>
                  Entre
                </Link>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
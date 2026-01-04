import { useState } from 'react';
import { Typography, Stack, Card, CardContent, TextField, Button, Chip, Divider, Alert } from '@mui/material';
import { useAuthStore } from '@/stores/authStore';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (newPassword && newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    // TODO: Implement profile update
    console.log({ name, email, password, newPassword });
    setSuccess(true);
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Perfil
      </Typography>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h6">Plano Atual</Typography>
              <Chip label="Plano Gratuito" color="primary" sx={{ width: 'fit-content' }} />
            </Stack>

            <Divider />

            <Stack spacing={1}>
              <Typography variant="h6">Informações da Conta</Typography>
              <Typography variant="body2" color="text.secondary">
                Atualize suas informações pessoais
              </Typography>
            </Stack>

            {success && (
              <Alert severity="success">
                Perfil atualizado com sucesso!
              </Alert>
            )}

            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Divider />

                <Typography variant="subtitle2" fontWeight={600}>
                  Alterar Senha
                </Typography>

                <TextField
                  label="Senha Atual"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Deixe em branco para não alterar"
                />

                <TextField
                  label="Nova Senha"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Deixe em branco para não alterar"
                />

                <TextField
                  label="Confirmar Nova Senha"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Deixe em branco para não alterar"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Salvar Alterações
                </Button>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
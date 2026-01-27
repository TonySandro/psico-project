import { useState, useEffect } from 'react';
import {
  Typography,
  Stack,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Divider,
  Alert,
  Avatar,
  Box,
  Grid,
  Container,
  InputAdornment,
  IconButton,
  LinearProgress
} from '@mui/material';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Lock,
  Eye,
  EyeOff,
  Check,
  Star,
  Headphones,
  ArrowRight,
  Shield,
  Calendar,
  Camera
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/services/api';
import { useAccount } from '@/hooks/useAccount';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  useAccount(user?.id);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const [phone, setPhone] = useState('(00) 00000-0000');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (!user?.id) throw new Error('Usuário não identificado');

      await api.put(`/update-account/${user.id}`, {
        name,
        email
      });

      updateUser({ name, email });

      setSuccessMsg('Dados atualizados com sucesso!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg('As senhas não coincidem');
      return;
    }
    setSuccessMsg('Solicitação de troca de senha enviada!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 4 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ color: '#1a1a1a', mb: 1 }}>
            Perfil do Usuário
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie suas informações pessoais, segurança e detalhes da assinatura.
          </Typography>
        </Box>

        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={3}>
              <Box position="relative">
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: '#10B981',
                    fontSize: '2rem',
                    fontWeight: 700
                  }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: '#6366F1',
                    color: 'white',
                    p: 0.5,
                    borderRadius: '50%',
                    display: 'flex',
                    border: '2px solid white',
                    cursor: 'pointer'
                  }}
                >
                  <Camera size={14} />
                </Box>
              </Box>

              <Box flex={1} textAlign={{ xs: 'center', sm: 'left' }}>
                <Typography variant="h5" fontWeight={700}>
                  {user?.name || 'Usuário'}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent={{ xs: 'center', sm: 'flex-start' }}
                  sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
                >
                  <Calendar size={14} />
                  <span>Membro desde Janeiro de 2024</span>
                </Stack>
              </Box>

              <Button variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                Ver Perfil Público
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
            <Stack spacing={3}>



              {/* 2. Personal Data Form */}
              <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 4 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                    <User size={20} color="#6366F1" />
                    <Typography variant="h6" fontWeight={700}>
                      Dados Pessoais
                    </Typography>
                  </Stack>

                  <form onSubmit={handleUpdateProfile}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Nome Completo</Typography>
                        <TextField
                          fullWidth
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Seu nome completo"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <User size={18} className="text-gray-400" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#FAFAFA' } }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Endereço de Email</Typography>
                        <TextField
                          fullWidth
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Mail size={18} className="text-gray-400" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#FAFAFA' } }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Telefone</Typography>
                        <TextField
                          fullWidth
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(00) 00000-0000"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone size={18} className="text-gray-400" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#FAFAFA' } }}
                        />
                      </Grid>

                      <Grid item xs={12} display="flex" justifyContent="flex-end">
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={loading}
                          sx={{
                            borderRadius: 2,
                            px: 4,
                            bgcolor: '#6200ea',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { bgcolor: '#4a00b0' }
                          }}
                        >
                          {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>

              {/* 3. Security Form */}
              <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 4 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                    <Shield size={20} color="#6366F1" />
                    <Typography variant="h6" fontWeight={700}>
                      Segurança e Senha
                    </Typography>
                  </Stack>

                  <form onSubmit={handleUpdatePassword}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Senha Atual</Typography>
                        <TextField
                          fullWidth
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock size={18} className="text-gray-400" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#FAFAFA' } }}
                        />
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Nova Senha</Typography>
                        <TextField
                          fullWidth
                          type={showPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock size={18} className="text-gray-400" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          helperText="Mínimo de 8 caracteres com letras e números."
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#FAFAFA' } }}
                        />
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Confirmar Nova Senha</Typography>
                        <TextField
                          fullWidth
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock size={18} className="text-gray-400" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#FAFAFA' } }}
                        />
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button
                          variant="outlined"
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            borderColor: 'grey.300',
                            color: 'text.primary'
                          }}
                          onClick={() => {
                            setCurrentPassword('');
                            setNewPassword('');
                            setConfirmPassword('');
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            bgcolor: '#6200ea',
                            '&:hover': { bgcolor: '#4a00b0' }
                          }}
                        >
                          Atualizar Senha
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} lg={5}>
            <Stack spacing={3}>

              {/* Plan Card */}
              <Card
                sx={{
                  borderRadius: 3,
                  bgcolor: '#1e1b4b',
                  color: 'white',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <Box sx={{ position: 'absolute', top: 20, right: 20, opacity: 0.2 }}>
                  <Star size={120} fill="white" />
                </Box>

                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Plano Grátis - Tester
                  </Typography>
                  <Chip
                    label="ATIVO"
                    size="small"
                    sx={{
                      bgcolor: '#10B981',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      height: 24,
                      mb: 2
                    }}
                  />

                  <Box display="flex" alignItems="baseline" sx={{ mb: 3 }}>
                    <Typography variant="h3" fontWeight={700}>
                      Grátis
                    </Typography>
                    {/* <Typography variant="body1" sx={{ opacity: 0.7, ml: 1 }}>
                      /mês
                    </Typography> */}
                  </Box>

                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {[
                      'Acesso total à plataforma',
                      'Suporte prioritário via WhatsApp',
                      'Usuários ilimitados'
                    ].map((feature, idx) => (
                      <Stack key={idx} direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            bgcolor: '#10B981',
                            borderRadius: '50%',
                            p: 0.5,
                            display: 'flex'
                          }}
                        >
                          <Check size={12} color="white" />
                        </Box>
                        <Typography variant="body2">{feature}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
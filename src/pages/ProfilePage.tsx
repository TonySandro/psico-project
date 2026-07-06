import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Typography, Stack, Card, CardContent, TextField, Button, Chip,
  Divider, Alert, Avatar, Box, Grid, Container, InputAdornment, IconButton,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import {
  User, Mail, Phone, Lock, Eye, EyeOff, Check, Star, Shield,
  Calendar, Camera, CreditCard, Info
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/services/api';
import { useAccount } from '@/hooks/useAccount';
import { useSubscription } from '@/hooks/useSubscription';

// Schemas
const personalDataSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  phone: z.string().min(10, "Telefone inválido")
});

const emailDataSchema = z.object({
  newEmail: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória")
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Senha atual é obrigatória"),
  newPassword: z.string()
    .min(8, "A nova senha deve ter no mínimo 8 caracteres")
    .regex(/[a-zA-Z]/, "A senha deve conter letras")
    .regex(/[0-9]/, "A senha deve conter números"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type PersonalDataForm = z.infer<typeof personalDataSchema>;
type EmailDataForm = z.infer<typeof emailDataSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const { subscription } = useSubscription();

  useAccount(user?.id);

  const isPremiumActive = user?.subscriptionStatus === 'active' || subscription?.status === 'active';

  const [globalSuccessMsg, setGlobalSuccessMsg] = useState('');
  const [globalErrorMsg, setGlobalErrorMsg] = useState('');
  
  const [subscribing, setSubscribing] = useState(false);

  // Modals
  const [confirmPersonalModal, setConfirmPersonalModal] = useState(false);

  // Forms
  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    formState: { errors: errorsPersonal, isDirty: isDirtyPersonal, isValid: isValidPersonal },
    getValues: getValuesPersonal,
    watch: watchPersonal,
    reset: resetPersonal
  } = useForm<PersonalDataForm>({ mode: 'onChange' });

  const watchPersonalData = watchPersonal();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail, isSubmitting: isSubmittingEmail, isValid: isValidEmail },
    reset: resetEmail,
    setError: setEmailError
  } = useForm<EmailDataForm>({ mode: 'onChange' });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword, isValid: isValidPassword },
    reset: resetPassword
  } = useForm<PasswordForm>({ mode: 'onChange' });

  useEffect(() => {
    if (user) {
      resetPersonal({
        name: user.name || ''
      });
    }
  }, [user, resetPersonal]);

  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePersonalSubmitPre = () => {
    setConfirmPersonalModal(true);
  };

  const [isSubmittingPersonal, setIsSubmittingPersonal] = useState(false);

  const onConfirmPersonalData = async () => {
    setConfirmPersonalModal(false);
    setIsSubmittingPersonal(true);
    setGlobalErrorMsg('');
    setGlobalSuccessMsg('');

    try {
      if (!user?.id) throw new Error('Usuário não identificado');
      const data = getValuesPersonal();
      
      const parsedData = personalDataSchema.parse(data);

      await api.put(`/update-account/${user.id}`, {
        name: parsedData.name,
        phone: parsedData.phone,
        email: user.email // preserving email just in case backend requires it
      });

      updateUser({ name: parsedData.name });
      resetPersonal(parsedData); // resets isDirty to false

      setGlobalSuccessMsg('Dados atualizados com sucesso!');
      window.scrollTo(0, 0);
      setTimeout(() => setGlobalSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
      setGlobalErrorMsg('Erro ao atualizar perfil. Tente novamente.');
      window.scrollTo(0, 0);
    } finally {
      setIsSubmittingPersonal(false);
    }
  };

  const onEmailSubmit = async (data: EmailDataForm) => {
    setGlobalErrorMsg('');
    setGlobalSuccessMsg('');
    try {
      if (!user?.id) throw new Error('Usuário não identificado');
      emailDataSchema.parse(data);
      
      await api.post(`/request-email-change/${user.id}`, {
        newEmail: data.newEmail,
        password: data.password
      });
      
      setGlobalSuccessMsg('Enviamos um link de confirmação para o novo e-mail. Seu e-mail atual continuará ativo até a confirmação.');
      window.scrollTo(0, 0);
      resetEmail();
      setTimeout(() => setGlobalSuccessMsg(''), 6000);
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.message?.includes('uso') || err.response?.data?.error?.includes('uso')) {
        setEmailError('newEmail', { message: 'Este e-mail já está em uso.' });
      } else if (err.response?.status === 401 || err.response?.data?.error?.includes('senha') || err.response?.data?.error?.includes('password')) {
        setEmailError('password', { message: 'Senha incorreta.' });
      } else {
        setGlobalErrorMsg('Erro ao solicitar troca de e-mail.');
      }
      window.scrollTo(0, 0);
    }
  };

  const onPasswordSubmit = async (data: PasswordForm) => {
    setGlobalErrorMsg('');
    setGlobalSuccessMsg('');
    try {
      if (!user?.id) throw new Error('Usuário não identificado');
      passwordSchema.parse(data);
      
      await api.put(`/update-password/${user.id}`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      setGlobalSuccessMsg('Senha atualizada com sucesso. Por segurança, talvez seja necessário entrar novamente.');
      window.scrollTo(0, 0);
      resetPassword();
      setTimeout(() => setGlobalSuccessMsg(''), 6000);
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 400 || err.response?.status === 401 || err.response?.data?.error?.includes('incorrect')) {
        setGlobalErrorMsg(err.response?.data?.error || 'Senha atual incorreta.');
      } else {
        setGlobalErrorMsg('Erro ao atualizar senha.');
      }
      window.scrollTo(0, 0);
    }
  };

  const handleSubscribe = async () => {
    try {
      setSubscribing(true);
      setGlobalErrorMsg('');

      const response = await api.post('/payment/preference', {
        description: "Assinatura Premium Mensal",
        price: 29.90
      });

      if (response.data && response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        throw new Error('URL de checkout não recebida');
      }
    } catch (err: any) {
      console.error(err);
      setGlobalErrorMsg(err.response?.data?.error || 'Erro ao iniciar pagamento. Tente novamente.');
      window.scrollTo(0, 0);
    } finally {
      setSubscribing(false);
    }
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

        {globalSuccessMsg && <Alert severity="success">{globalSuccessMsg}</Alert>}
        {globalErrorMsg && <Alert severity="error">{globalErrorMsg}</Alert>}

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
                  <span>Membro desde {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : ''}</span>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Stack spacing={3}>

              {/* 1. Personal Data Form */}
              <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 4 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                    <User size={20} color="#6366F1" />
                    <Typography variant="h6" fontWeight={700}>
                      Dados Pessoais
                    </Typography>
                  </Stack>

                  <form onSubmit={handleSubmitPersonal(handlePersonalSubmitPre)}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Nome Completo</Typography>
                        <TextField
                          fullWidth
                          {...registerPersonal('name')}
                          error={!!errorsPersonal.name}
                          helperText={errorsPersonal.name?.message}
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

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Telefone</Typography>
                        <TextField
                          fullWidth
                          {...registerPersonal('phone')}
                          error={!!errorsPersonal.phone}
                          helperText={errorsPersonal.phone?.message}
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

                      <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end">
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={!isDirtyPersonal || !isValidPersonal || isSubmittingPersonal}
                          sx={{
                            borderRadius: 2,
                            px: 4,
                            bgcolor: '#6200ea',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { bgcolor: '#4a00b0' },
                            '&.Mui-disabled': { bgcolor: '#e0e0e0', color: '#9e9e9e' }
                          }}
                        >
                          {isSubmittingPersonal ? 'Salvando...' : 'Salvar Alterações'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>

              {/* 2. Email Change Form */}
              <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 4 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                    <Mail size={20} color="#6366F1" />
                    <Typography variant="h6" fontWeight={700}>
                      Alteração de E-mail
                    </Typography>
                  </Stack>

                  <Box sx={{ p: 2, bgcolor: '#F3F4F6', borderRadius: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Info size={18} className="text-blue-500" />
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>E-mail Atual</Typography>
                      <Typography variant="body2" fontWeight={500}>{user?.email}</Typography>
                    </Box>
                  </Box>

                  <form onSubmit={handleSubmitEmail(onEmailSubmit)}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Novo E-mail</Typography>
                        <TextField
                          fullWidth
                          {...registerEmail('newEmail')}
                          error={!!errorsEmail.newEmail}
                          helperText={errorsEmail.newEmail?.message}
                          placeholder="novo@email.com"
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

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Senha Atual (para confirmar)</Typography>
                        <TextField
                          fullWidth
                          type={showCurrentPassword ? 'text' : 'password'}
                          {...registerEmail('password')}
                          error={!!errorsEmail.password}
                          helperText={errorsEmail.password?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock size={18} className="text-gray-400" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} edge="end">
                                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#FAFAFA' } }}
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end">
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={!isValidEmail || isSubmittingEmail}
                          sx={{
                            borderRadius: 2,
                            px: 4,
                            bgcolor: '#6200ea',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { bgcolor: '#4a00b0' },
                            '&.Mui-disabled': { bgcolor: '#e0e0e0', color: '#9e9e9e' }
                          }}
                        >
                          {isSubmittingEmail ? 'Enviando...' : 'Atualizar E-mail'}
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

                  <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Senha Atual</Typography>
                        <TextField
                          fullWidth
                          type={showCurrentPassword ? 'text' : 'password'}
                          {...registerPassword('currentPassword')}
                          error={!!errorsPassword.currentPassword}
                          helperText={errorsPassword.currentPassword?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock size={18} className="text-gray-400" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} edge="end">
                                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#FAFAFA' } }}
                        />
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Nova Senha</Typography>
                        <TextField
                          fullWidth
                          type={showPassword ? 'text' : 'password'}
                          {...registerPassword('newPassword')}
                          error={!!errorsPassword.newPassword}
                          helperText={errorsPassword.newPassword?.message || "Mínimo de 8 caracteres com letras e números."}
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
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#FAFAFA' } }}
                        />
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Confirmar Nova Senha</Typography>
                        <TextField
                          fullWidth
                          type={showConfirmPassword ? 'text' : 'password'}
                          {...registerPassword('confirmPassword')}
                          error={!!errorsPassword.confirmPassword}
                          helperText={errorsPassword.confirmPassword?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock size={18} className="text-gray-400" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </IconButton>
                              </InputAdornment>
                            )
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
                          onClick={() => resetPassword()}
                        >
                          Limpar
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={!isValidPassword || isSubmittingPassword}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            bgcolor: '#6200ea',
                            '&:hover': { bgcolor: '#4a00b0' },
                            '&.Mui-disabled': { bgcolor: '#e0e0e0', color: '#9e9e9e' }
                          }}
                        >
                          {isSubmittingPassword ? 'Atualizando...' : 'Atualizar Senha'}
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack spacing={3}>

              {/* Plan Card */}
              <Card
                sx={{
                  borderRadius: 3,
                  bgcolor: isPremiumActive ? '#4F46E5' : '#1e1b4b',
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
                    {isPremiumActive ? 'Plano Premium' : 'Plano Grátis'}
                  </Typography>
                  <Chip
                    label={isPremiumActive ? 'PREMIUM ATIVO' : 'FREE'}
                    size="small"
                    sx={{
                      bgcolor: isPremiumActive ? '#F59E0B' : '#6B7280',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      height: 24,
                      mb: 2
                    }}
                  />

                  {!isPremiumActive && (
                    <Box display="flex" alignItems="baseline" sx={{ mb: 3 }}>
                      <Typography variant="h3" fontWeight={700}>
                        Grátis
                      </Typography>
                    </Box>
                  )}

                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {[
                      'Acesso total à plataforma',
                      'Relatórios Ilimitados',
                      'Suporte prioritário',
                      !isPremiumActive ? 'Limite de 5 pacientes' : 'Pacientes ilimitados'
                    ].map((feature, idx) => (
                      <Stack key={idx} direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            bgcolor: isPremiumActive ? '#F59E0B' : 'rgba(255,255,255,0.2)',
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

                  {!isPremiumActive && (
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={handleSubscribe}
                      disabled={subscribing}
                      startIcon={<CreditCard size={20} />}
                      sx={{
                        bgcolor: '#F59E0B',
                        color: 'white',
                        fontWeight: 700,
                        '&:hover': { bgcolor: '#D97706' },
                        py: 1.5
                      }}
                    >
                      {subscribing ? 'Processando...' : 'Obter Premium - R$ 29,90'}
                    </Button>
                  )}

                  {isPremiumActive && (
                    <Typography variant="body2" sx={{ opacity: 0.8, fontStyle: 'italic' }}>
                      Sua assinatura está ativa e renova automaticamente.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Stack>

      {/* Confirmation Modal */}
      <Dialog
        open={confirmPersonalModal}
        onClose={() => setConfirmPersonalModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle id="alert-dialog-title" fontWeight={700}>
          Confirmar Alterações
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você está prestes a alterar seus dados pessoais. Deseja confirmar?
          </DialogContentText>
          <Box sx={{ mt: 2, bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary">Novo Nome:</Typography>
            <Typography variant="body1" fontWeight={600} mb={1}>{watchPersonalData?.name}</Typography>
            
            <Typography variant="body2" color="text.secondary">Novo Telefone:</Typography>
            <Typography variant="body1" fontWeight={600}>{watchPersonalData?.phone}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmPersonalModal(false)} color="inherit" sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button onClick={onConfirmPersonalData} variant="contained" sx={{ bgcolor: '#6200ea', textTransform: 'none', '&:hover': { bgcolor: '#4a00b0' } }} autoFocus>
            Confirmar e Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
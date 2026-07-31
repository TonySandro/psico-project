import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Typography, Stack, Card, CardContent, TextField, Button, Chip,
  Divider, Alert, Avatar, Box, Grid, Container, InputAdornment, IconButton,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  LinearProgress, Paper, Tabs, Tab
} from '@mui/material';
import {
  User, Mail, Phone, Lock, Eye, EyeOff, Check, Star, Shield,
  Calendar, Camera, CreditCard, Info, Clock, RefreshCw, AlertCircle,
  Users, FileText, ClipboardList, ShieldCheck, CheckCircle2, Sparkles, XCircle
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/services/api';
import { useAccount } from '@/hooks/useAccount';
import { useSubscription } from '@/hooks/useSubscription';
import { useStatistics } from '@/hooks/useStatistics';

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

// Helper functions for date formatting
const formatDate = (dateInput?: string | Date | null) => {
  if (!dateInput) return null;
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

const getDaysUntil = (dateInput?: string | Date | null) => {
  if (!dateInput) return null;
  const target = new Date(dateInput);
  if (isNaN(target.getTime())) return null;
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  const {
    subscription,
    cancelSubscription,
    cancelling,
    isActive,
    isTrial,
    isExpired
  } = useSubscription();

  useAccount(user?.id);
  const { data: stats } = useStatistics(user?.id || '');

  const isPremiumActive = user?.subscriptionStatus === 'active' || subscription?.status === 'active' || isActive;
  const isCancelledButActive = subscription?.status === 'cancelled' && subscription?.endsAt && new Date() <= new Date(subscription.endsAt);

  const [globalSuccessMsg, setGlobalSuccessMsg] = useState('');
  const [globalErrorMsg, setGlobalErrorMsg] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Modals
  const [confirmPersonalModal, setConfirmPersonalModal] = useState(false);
  const [confirmCancelSubModal, setConfirmCancelSubModal] = useState(false);

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
        name: user.name || '',
        phone: user.phone || ''
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
        email: user.email
      });

      updateUser({ name: parsedData.name, phone: parsedData.phone });
      resetPersonal(parsedData);

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

      const response = await api.post('/payment/subscribe', {
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

  const handleCancelSubscription = async () => {
    setConfirmCancelSubModal(false);
    setGlobalErrorMsg('');
    setGlobalSuccessMsg('');
    try {
      await cancelSubscription();
      setGlobalSuccessMsg('Sua solicitação de cancelamento foi processada. Seu acesso continuará ativo até o final do período pago.');
      window.scrollTo(0, 0);
    } catch (err: any) {
      console.error(err);
      setGlobalErrorMsg(err.response?.data?.error || 'Erro ao cancelar assinatura. Tente novamente ou entre em contato com o suporte.');
      window.scrollTo(0, 0);
    }
  };

  const renewalDateRaw = subscription?.endsAt || user?.subscriptionEndsAt;
  const formattedRenewalDate = formatDate(renewalDateRaw);
  const daysUntilRenewal = getDaysUntil(renewalDateRaw);

  const trialEndsDateRaw = subscription?.trialEndsAt;
  const formattedTrialEndsDate = formatDate(trialEndsDateRaw);
  const daysTrialLeft = subscription?.daysLeft ?? getDaysUntil(trialEndsDateRaw) ?? 0;

  return (
    <Container maxWidth="xl" sx={{ pb: 6 }}>
      <Stack spacing={4}>
        {/* Header Section */}
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ color: '#111827', mb: 1 }}>
            Meu Perfil
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie suas informações pessoais, segurança, plano de assinatura e métricas da conta.
          </Typography>
        </Box>

        {globalSuccessMsg && <Alert severity="success" sx={{ borderRadius: 2 }}>{globalSuccessMsg}</Alert>}
        {globalErrorMsg && <Alert severity="error" sx={{ borderRadius: 2 }}>{globalErrorMsg}</Alert>}

        {/* User Card Header */}
        <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <CardContent sx={{ p: 3.5 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={3}>
                <Box position="relative">
                  <Avatar
                    sx={{
                      width: 88,
                      height: 88,
                      bgcolor: '#4F46E5',
                      fontSize: '2.2rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 14px rgba(79,70,229,0.3)'
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </Avatar>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 2,
                      right: 2,
                      bgcolor: '#10B981',
                      color: 'white',
                      p: 0.6,
                      borderRadius: '50%',
                      display: 'flex',
                      border: '2.5px solid white',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                    }}
                  >
                    <Camera size={14} />
                  </Box>
                </Box>

                <Box textAlign={{ xs: 'center', sm: 'left' }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} justifyContent={{ xs: 'center', sm: 'flex-start' }} mb={0.5}>
                    <Typography variant="h5" fontWeight={800} color="#1F2937">
                      {user?.name || 'Usuário'}
                    </Typography>
                    <Chip
                      icon={<ShieldCheck size={14} color="white" />}
                      label={isPremiumActive ? "PREMIUM" : isTrial ? "TESTE GRATUITO" : "CONTA GRÁTIS"}
                      size="small"
                      sx={{
                        bgcolor: isPremiumActive ? '#10B981' : isTrial ? '#F59E0B' : '#6B7280',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        px: 0.5
                      }}
                    />
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {user?.email}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent={{ xs: 'center', sm: 'flex-start' }}
                    sx={{ color: 'text.secondary', fontSize: '0.85rem' }}
                  >
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Calendar size={14} />
                      <span>Membro desde {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}</span>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Quick Usage Statistics Cards */}
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: '#F3F4F6', border: '1px solid #E5E7EB' }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#EEF2FF', color: '#4F46E5', display: 'flex' }}>
                  <Users size={24} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    PACIENTES CADASTRADOS
                  </Typography>
                  <Typography variant="h5" fontWeight={800} color="#111827">
                    {stats?.totalActivePatients ?? 0}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: '#F3F4F6', border: '1px solid #E5E7EB' }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#ECFDF5', color: '#10B981', display: 'flex' }}>
                  <ClipboardList size={24} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    AVALIAÇÕES APLICADAS
                  </Typography>
                  <Typography variant="h5" fontWeight={800} color="#111827">
                    {stats?.totalProtocols ?? 0}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: '#F3F4F6', border: '1px solid #E5E7EB' }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#FEF3C7', color: '#D97706', display: 'flex' }}>
                  <FileText size={24} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    RELATÓRIOS EMITIDOS
                  </Typography>
                  <Typography variant="h5" fontWeight={800} color="#111827">
                    {stats?.totalReports ?? 0}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Main Content Layout */}
        <Grid container spacing={3}>
          {/* Left Column - Forms */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Stack spacing={3}>
              {/* 1. Personal Data Form */}
              <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                    <User size={22} color="#4F46E5" />
                    <Typography variant="h6" fontWeight={700}>
                      Dados Pessoais
                    </Typography>
                  </Stack>

                  <form onSubmit={handleSubmitPersonal(handlePersonalSubmitPre)}>
                    <Grid container spacing={2.5}>
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
                                <User size= {18} className="text-gray-400" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#FAFAFA' } }}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Telefone / WhatsApp</Typography>
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
                            bgcolor: '#4F46E5',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { bgcolor: '#4338CA' },
                            '&.Mui-disabled': { bgcolor: '#E5E7EB', color: '#9CA3AF' }
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
                <CardContent sx={{ p: 3.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                    <Mail size={22} color="#4F46E5" />
                    <Typography variant="h6" fontWeight={700}>
                      Alteração de E-mail
                    </Typography>
                  </Stack>

                  <Box sx={{ p: 2, bgcolor: '#F3F4F6', borderRadius: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Info size={20} className="text-blue-500" />
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>E-mail Atual da Conta</Typography>
                      <Typography variant="body2" fontWeight={600} color="#1F2937">{user?.email}</Typography>
                    </Box>
                  </Box>

                  <form onSubmit={handleSubmitEmail(onEmailSubmit)}>
                    <Grid container spacing={2.5}>
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
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Senha Atual (para confirmação)</Typography>
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
                            bgcolor: '#4F46E5',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { bgcolor: '#4338CA' },
                            '&.Mui-disabled': { bgcolor: '#E5E7EB', color: '#9CA3AF' }
                          }}
                        >
                          {isSubmittingEmail ? 'Enviando...' : 'Atualizar E-mail'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>

              {/* 3. Security & Password Form */}
              <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                    <Shield size={22} color="#4F46E5" />
                    <Typography variant="h6" fontWeight={700}>
                      Segurança e Senha
                    </Typography>
                  </Stack>

                  <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
                    <Stack spacing={2.5}>
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

                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Nova Senha</Typography>
                          <TextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            {...registerPassword('newPassword')}
                            error={!!errorsPassword.newPassword}
                            helperText={errorsPassword.newPassword?.message || "Mínimo de 8 caracteres (letras e números)."}
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
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
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
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 1 }} />

                      <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button
                          variant="outlined"
                          sx={{ borderRadius: 2, textTransform: 'none', borderColor: 'grey.300', color: 'text.primary' }}
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
                            bgcolor: '#4F46E5',
                            '&:hover': { bgcolor: '#4338CA' },
                            '&.Mui-disabled': { bgcolor: '#E5E7EB', color: '#9CA3AF' }
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

          {/* Right Column - Subscription Card */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack spacing={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  bgcolor: isPremiumActive ? '#1E1B4B' : isTrial ? '#1E1B4B' : '#111827',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0px 8px 30px rgba(0,0,0,0.12)'
                }}
              >
                <Box sx={{ position: 'absolute', top: -20, right: -20, opacity: 0.12 }}>
                  <Star size={180} fill="white" />
                </Box>

                <CardContent sx={{ p: 4 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#A5B4FC', fontWeight: 700, letterSpacing: 1 }}>
                        SUA ASSINATURA
                      </Typography>
                      <Typography variant="h5" fontWeight={800} sx={{ color: 'white', mt: 0.5 }}>
                        {isPremiumActive ? 'Plano Premium' : isTrial ? 'Teste Gratuito' : 'Plano Grátis'}
                      </Typography>
                    </Box>

                    <Chip
                      label={isPremiumActive ? 'PREMIUM ATIVO' : isTrial ? 'EM TESTE' : 'EXPIRADO'}
                      size="small"
                      sx={{
                        bgcolor: isPremiumActive ? '#10B981' : isTrial ? '#F59E0B' : '#EF4444',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '0.72rem',
                        px: 1,
                        height: 26
                      }}
                    />
                  </Stack>

                  {/* ACTIVE SUBSCRIPTION DETAILS */}
                  {isPremiumActive && !isCancelledButActive && (
                    <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.07)', borderRadius: 2.5, p: 2.5, mb: 3.5, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Box display="flex" alignItems="center" gap={1}>
                            <Calendar size={18} color="#A5B4FC" />
                            <Typography variant="body2" color="#E0E7FF" fontWeight={500}>
                              Próxima Renovação:
                            </Typography>
                          </Box>
                          <Typography variant="subtitle2" fontWeight={800} color="white">
                            {formattedRenewalDate || 'Em breve'}
                          </Typography>
                        </Stack>

                        {daysUntilRenewal !== null && (
                          <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center" gap={1}>
                              <Clock size={18} color="#A5B4FC" />
                              <Typography variant="body2" color="#E0E7FF" fontWeight={500}>
                                Renovação em:
                              </Typography>
                            </Box>
                            <Chip
                              label={daysUntilRenewal === 1 ? 'Amanhã' : `${daysUntilRenewal} dias`}
                              size="small"
                              sx={{ bgcolor: '#10B981', color: 'white', fontWeight: 700, fontSize: '0.75rem' }}
                            />
                          </Stack>
                        )}

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Box display="flex" alignItems="center" gap={1}>
                            <CreditCard size={18} color="#A5B4FC" />
                            <Typography variant="body2" color="#E0E7FF" fontWeight={500}>
                              Valor do Plano:
                            </Typography>
                          </Box>
                          <Typography variant="subtitle2" fontWeight={700} color="white">
                            R$ 29,90 / mês
                          </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Box display="flex" alignItems="center" gap={1}>
                            <RefreshCw size={18} color="#A5B4FC" />
                            <Typography variant="body2" color="#E0E7FF" fontWeight={500}>
                              Renovação Automática:
                            </Typography>
                          </Box>
                          <Chip label="Ativada" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.2)', color: '#34D399', fontWeight: 700 }} />
                        </Stack>

                        {subscription?.mpSubscriptionId && (
                          <Typography variant="caption" sx={{ color: '#9CA3AF', pt: 1, display: 'block', wordBreak: 'break-all' }}>
                            ID da Assinatura: {subscription.mpSubscriptionId}
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  )}

                  {/* CANCELLED BUT ACTIVE DETAILS */}
                  {isCancelledButActive && (
                    <Box sx={{ bgcolor: 'rgba(239, 68, 68, 0.15)', borderRadius: 2.5, p: 2.5, mb: 3.5, border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                      <Stack spacing={1.5}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <AlertCircle size={20} color="#FCA5A5" />
                          <Typography variant="subtitle2" fontWeight={700} color="#FCA5A5">
                            Assinatura Cancelada
                          </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ opacity: 0.9, color: '#E0E7FF' }}>
                          Sua assinatura foi cancelada. Seu acesso continuará liberado até <strong>{formattedRenewalDate || 'o fim do período pago'}</strong>.
                        </Typography>
                      </Stack>
                    </Box>
                  )}

                  {/* TRIAL DETAILS */}
                  {isTrial && (
                    <Box sx={{ bgcolor: 'rgba(245, 158, 11, 0.12)', borderRadius: 2.5, p: 2.5, mb: 3.5, border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                      <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Box display="flex" alignItems="center" gap={1}>
                            <Calendar size={18} color="#FBBF24" />
                            <Typography variant="body2" color="#E0E7FF" fontWeight={500}>
                              Término do Teste:
                            </Typography>
                          </Box>
                          <Typography variant="subtitle2" fontWeight={800} color="#FBBF24">
                            {formattedTrialEndsDate || 'Em breve'}
                          </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Box display="flex" alignItems="center" gap={1}>
                            <Clock size={18} color="#FBBF24" />
                            <Typography variant="body2" color="#E0E7FF" fontWeight={500}>
                              Dias Restantes:
                            </Typography>
                          </Box>
                          <Chip
                            label={`${daysTrialLeft} dia(s)`}
                            size="small"
                            sx={{ bgcolor: '#F59E0B', color: 'white', fontWeight: 800, fontSize: '0.75rem' }}
                          />
                        </Stack>

                        <Box sx={{ pt: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#D1D5DB', mb: 0.5, display: 'block' }}>
                            Progresso do teste gratuito (14 dias)
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={Math.max(0, Math.min(100, ((daysTrialLeft / 14) * 100)))}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: 'rgba(255,255,255,0.15)',
                              '& .MuiLinearProgress-bar': { bgcolor: '#F59E0B', borderRadius: 4 }
                            }}
                          />
                        </Box>
                      </Stack>
                    </Box>
                  )}

                  {/* EXPIRED DETAILS */}
                  {isExpired && !isTrial && (
                    <Box sx={{ bgcolor: 'rgba(239, 68, 68, 0.15)', borderRadius: 2.5, p: 2.5, mb: 3.5, border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                      <Stack spacing={1.5}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <XCircle size={20} color="#FCA5A5" />
                          <Typography variant="subtitle2" fontWeight={700} color="#FCA5A5">
                            Assinatura Expirada
                          </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ color: '#E0E7FF' }}>
                          Seu período de acesso expirou. Assine para liberar pacientes e relatórios ilimitados.
                        </Typography>
                      </Stack>
                    </Box>
                  )}

                  {/* BENEFITS CHECKLIST */}
                  <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#A5B4FC', mb: 2, letterSpacing: 0.5 }}>
                    INCLUSO NO SEU PLANO:
                  </Typography>

                  <Stack spacing={1.8} sx={{ mb: 4 }}>
                    {[
                      'Acesso ilimitado a todos os testes psicológicos',
                      'Emissão ilimitada de relatórios em PDF',
                      'Anamnese e relatórios escolares públicos',
                      'Suporte prioritário via WhatsApp'
                    ].map((feature, idx) => (
                      <Stack key={idx} direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            bgcolor: isPremiumActive ? '#10B981' : 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            p: 0.4,
                            display: 'flex'
                          }}
                        >
                          <Check size={12} color="white" />
                        </Box>
                        <Typography variant="body2" color="#E0E7FF">{feature}</Typography>
                      </Stack>
                    ))}
                  </Stack>

                  {/* ACTION BUTTONS */}
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
                        fontWeight: 800,
                        fontSize: '1rem',
                        '&:hover': { bgcolor: '#D97706' },
                        py: 1.6,
                        borderRadius: 2.5,
                        boxShadow: '0 4px 14px rgba(245,158,11,0.4)',
                        textTransform: 'none'
                      }}
                    >
                      {subscribing ? 'Processando...' : 'Obter Premium - R$ 29,90 / mês'}
                    </Button>
                  )}

                  {isPremiumActive && !isCancelledButActive && (
                    <Button
                      variant="outlined"
                      fullWidth
                      size="medium"
                      onClick={() => setConfirmCancelSubModal(true)}
                      disabled={cancelling}
                      sx={{
                        color: '#FCA5A5',
                        borderColor: 'rgba(252, 165, 165, 0.3)',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#EF4444',
                          bgcolor: 'rgba(239, 68, 68, 0.1)'
                        }
                      }}
                    >
                      {cancelling ? 'Cancelando...' : 'Cancelar Assinatura'}
                    </Button>
                  )}

                  {isCancelledButActive && (
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={handleSubscribe}
                      disabled={subscribing}
                      startIcon={<Sparkles size={20} />}
                      sx={{
                        bgcolor: '#10B981',
                        color: 'white',
                        fontWeight: 800,
                        '&:hover': { bgcolor: '#059669' },
                        py: 1.5,
                        borderRadius: 2.5,
                        textTransform: 'none'
                      }}
                    >
                      {subscribing ? 'Processando...' : 'Reativar Assinatura Premium'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Stack>

      {/* Confirmation Personal Data Modal */}
      <Dialog
        open={confirmPersonalModal}
        onClose={() => setConfirmPersonalModal(false)}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle fontWeight={700}>
          Confirmar Alterações de Dados
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você está prestes a atualizar suas informações pessoais. Deseja confirmar?
          </DialogContentText>
          <Box sx={{ mt: 2, bgcolor: '#F3F4F6', p: 2, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Novo Nome:</Typography>
            <Typography variant="body1" fontWeight={600} mb={1}>{watchPersonalData?.name}</Typography>
            
            <Typography variant="caption" color="text.secondary">Novo Telefone:</Typography>
            <Typography variant="body1" fontWeight={600}>{watchPersonalData?.phone}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmPersonalModal(false)} color="inherit" sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button onClick={onConfirmPersonalData} variant="contained" sx={{ bgcolor: '#4F46E5', textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#4338CA' } }} autoFocus>
            Confirmar e Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Cancel Subscription Modal */}
      <Dialog
        open={confirmCancelSubModal}
        onClose={() => setConfirmCancelSubModal(false)}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle fontWeight={700} sx={{ color: '#D97706', display: 'flex', alignItems: 'center', gap: 1 }}>
          <AlertCircle size={24} />
          Confirmar Cancelamento da Assinatura
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza que deseja cancelar a sua assinatura Premium?
          </DialogContentText>
          <Box sx={{ mt: 2, bgcolor: '#FEF3C7', p: 2, borderRadius: 2, border: '1px solid #FCD34D' }}>
            <Typography variant="body2" color="#92400E" fontWeight={700} mb={0.5}>
              Importante saber:
            </Typography>
            <Typography variant="body2" color="#92400E" component="ul" sx={{ pl: 2, m: 0 }}>
              <li>Seu acesso continuará liberado até {formattedRenewalDate || 'o final do período pago'}.</li>
              <li>Não haverá cobranças futuras automáticas.</li>
              <li>Você poderá reativar o seu plano a qualquer momento.</li>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmCancelSubModal(false)} color="inherit" sx={{ textTransform: 'none' }}>
            Manter Assinatura
          </Button>
          <Button
            onClick={handleCancelSubscription}
            variant="contained"
            color="error"
            disabled={cancelling}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            {cancelling ? 'Cancelando...' : 'Confirmar Cancelamento'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
import { Box, Typography, Button, Container, Card, CardContent, Stack, Grid, Chip } from '@mui/material';
import { Lock, Check, CreditCard, Sparkles, Star } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

export default function SubscribePage() {
  const { initiatePayment, subscribing, subscription } = useSubscription();

  const features = [
    'Acesso ilimitado a todos os protocolos de testes',
    'Gestão completa e ilimitada de pacientes',
    'Criação de anamneses detalhadas e estruturadas',
    'Geração de relatórios de professores e pareceres clínicos',
    'Suporte prioritário e atualizações contínuas',
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        py: 6,
        px: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0) 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, md: 10 }}>
            <Card
              sx={{
                borderRadius: 5,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                color: '#ffffff',
                overflow: 'visible',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -30,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bgcolor: '#F59E0B',
                  borderRadius: '50%',
                  p: 2,
                  boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Lock size={32} color="#ffffff" />
              </Box>

              <CardContent sx={{ p: { xs: 4, sm: 6 }, pt: { xs: 6, sm: 8 } }}>
                <Box textAlign="center" sx={{ mb: 5 }}>
                  <Chip
                    icon={<Sparkles size={14} color="#F59E0B" style={{ marginRight: 4 }} />}
                    label="PLANO PREMIUM"
                    sx={{
                      bgcolor: 'rgba(245, 158, 11, 0.15)',
                      color: '#F59E0B',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      mb: 2,
                      px: 1,
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                    }}
                  />
                  <Typography variant="h3" fontWeight={800} gutterBottom sx={{ letterSpacing: '-1.5px', color: '#ffffff' }}>
                    Acesso Premium Exigido
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', mx: 'auto' }}>
                    {subscription?.message || 'Seu período de testes gratuito expirou ou você ainda não possui uma assinatura ativa. Assine hoje para continuar avaliando seus pacientes com eficiência.'}
                  </Typography>
                </Box>

                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Typography variant="h5" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star size={20} fill="#F59E0B" color="#F59E0B" /> Benefícios da Assinatura
                      </Typography>
                      <Stack spacing={2.5}>
                        {features.map((feature, index) => (
                          <Box key={index} display="flex" alignItems="flex-start" gap={2}>
                            <Box
                              sx={{
                                bgcolor: 'rgba(16, 185, 129, 0.2)',
                                borderRadius: '50%',
                                p: 0.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mt: 0.3,
                              }}
                            >
                              <Check size={14} color="#10B981" strokeWidth={3} />
                            </Box>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.5 }}>
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Card
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: 4,
                        p: 4,
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', tracking: 1, mb: 1 }}>
                        Assinatura Mensal
                      </Typography>
                      <Box display="flex" alignItems="baseline" sx={{ mb: 1 }}>
                        <Typography variant="h2" fontWeight={900} sx={{ color: '#ffffff' }}>
                          R$ 29,90
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.5)', ml: 1 }}>
                          / mês
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', mb: 4 }}>
                        Cancele quando quiser, sem fidelidade.
                      </Typography>

                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={initiatePayment}
                        disabled={subscribing}
                        startIcon={<CreditCard size={20} />}
                        sx={{
                          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                          boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)',
                          color: '#ffffff',
                          fontWeight: 700,
                          py: 2,
                          borderRadius: 3,
                          textTransform: 'none',
                          fontSize: '1rem',
                          transition: 'all 0.2s',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 24px rgba(245, 158, 11, 0.4)',
                          },
                          '&:active': {
                            transform: 'translateY(0)',
                          },
                        }}
                      >
                        {subscribing ? 'Redirecionando...' : 'Assinar Agora'}
                      </Button>

                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', mt: 3, display: 'block' }}>
                        Processado de forma segura pelo Mercado Pago.
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

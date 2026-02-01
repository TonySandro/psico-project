import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, Container, Stack, Card, CardContent, Grid } from '@mui/material';
import { HeartPulse, ClipboardList, BarChart, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Gestão de Pacientes',
      description: 'Organize e acompanhe todos os seus pacientes em um só lugar, com histórico completo e acessível.'
    },
    {
      icon: ClipboardList,
      title: 'Protocolos de Avaliação',
      description: 'Acesse testes padronizados como CARS, Stroop, ATA, SNAP e Token Test integrados ao sistema.'
    },
    {
      icon: BarChart,
      title: 'Relatórios e Estatísticas',
      description: 'Visualize dados importantes com gráficos e métricas que facilitam a tomada de decisões.'
    }
  ];

  const benefits = [
    'Gestão completa de pacientes',
    'Protocolos de avaliação integrados',
    'Anamnese digital estruturada',
    'Relatórios automáticos',
    'Estatísticas em tempo real',
    'Acesso seguro em qualquer lugar'
  ];

  return (
    <Box>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1
        }}
      >
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '8px',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <HeartPulse size={24} color="white" />
            </Box>
            <Typography variant="h6" fontWeight={700} sx={{ display: { xs: 'none', sm: 'block' } }}>
              NPPAvalia
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => navigate('/login')}
            >
              Entrar
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/signup')}
            >
              Cadastrar
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDFA 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <Typography
                  variant="h2"
                  fontWeight={700}
                  sx={{
                    fontSize: { xs: '2rem', md: '3rem' },
                    lineHeight: 1.2
                  }}
                >
                  Sistema Completo de Gestão Clínica para{' '}
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    Psicopedagogos
                  </Box>
                </Typography>

                <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                  Simplifique sua rotina clínica com ferramentas profissionais para gestão de pacientes,
                  aplicação de testes e geração de relatórios.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRight size={20} />}
                    onClick={() => navigate('/signup')}
                    sx={{ px: 4 }}
                  >
                    Começar Gratuitamente
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                  >
                    Já tenho conta
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src="https://pixabay.com/get/g9bb1706ae17afccc9585e8d72c6f92e9d2fec2cf8096c60f066aee3e98564d49a4b1e11f7aa3b848ddec45c8add1fa6c.svg"
                  alt="Medical healthcare team - Mohamed_hassan on Pixabay"
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Stack spacing={6}>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography variant="h3" fontWeight={700}>
              Tudo que você precisa em um só lugar
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
              Ferramentas profissionais desenvolvidas especialmente para psicopedagogos e neuropsicopedagogos
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Grid key={index} size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: '12px',
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                          }}
                        >
                          <Icon size={28} />
                        </Box>

                        <Typography variant="h5" fontWeight={600}>
                          {feature.title}
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <Typography variant="h3" fontWeight={700}>
                  Profissionalismo e Eficiência
                </Typography>

                <Typography variant="h6" color="text.secondary">
                  Uma plataforma completa que reúne todas as ferramentas essenciais
                  para o dia a dia do profissional da psicopedagogia.
                </Typography>

                <Stack spacing={1.5} sx={{ pt: 2 }}>
                  {benefits.map((benefit, index) => (
                    <Stack key={index} direction="row" spacing={2} alignItems="center">
                      <CheckCircle size={24} color="#10B981" />
                      <Typography variant="body1">{benefit}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src="https://pixabay.com/get/g123b6e44c818a8176a03b9615a1939f32fc01f5b609aa5e02165ef54dc46f4ad518e5ecc6ac87e6ed2f7069fdeada987.svg"
                  alt="Medical doctor with mask - Megan_Rexazin_Conde on Pixabay"
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Card
          sx={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%)',
            color: 'white'
          }}
        >
          <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Stack spacing={3} alignItems="center">
              <Typography variant="h3" fontWeight={700}>
                Pronto para começar?
              </Typography>

              <Typography variant="h6" sx={{ opacity: 0.95, maxWidth: 600 }}>
                Crie sua conta gratuitamente e descubra como nossa plataforma
                pode transformar sua prática clínica.
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/signup')}
                sx={{
                  mt: 2,
                  px: 4,
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
                endIcon={<ArrowRight size={20} />}
              >
                Cadastrar Gratuitamente
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: 'grey.900',
          color: 'white',
          py: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <HeartPulse size={24} color="white" />
                </Box>
                <Typography variant="h6" fontWeight={700}>
                  NPPAvalia
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Sistema profissional de gestão clínica para psicopedagogos e neuropsicopedagogos.
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight={600}>
                  Contato
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  suporte@nppavalia.com.br
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © {new Date().getFullYear()} NPPAvalia. Todos os direitos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
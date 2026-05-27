import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, Container, Stack, Card, CardContent, Grid, Avatar } from '@mui/material';
import { HeartPulse, ArrowLeft, GraduationCap, ShieldCheck, Heart } from 'lucide-react';

export default function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={1} 
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
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
              NeuroPPAvalia
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              startIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/')}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              Voltar
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/login')}
            >
              Entrar
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDFA 100%)',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              fontSize: { xs: '2.25rem', md: '3.5rem' },
              lineHeight: 1.2,
              mb: 3
            }}
          >
            Quem Somos
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, lineHeight: 1.6 }}>
            A união entre a experiência clínica em neuropsicopedagogia e a engenharia de software 
            para transformar e otimizar a prática avaliativa no Brasil.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8, flexGrow: 1 }}>
        <Grid container spacing={8}>
          {/* Mission and Vision */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                Nossa Missão
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                O <strong>NeuroPPAvalia</strong> nasceu de uma necessidade real de consultório. 
                Profissionais de psicopedagogia e neuropsicopedagogia lidam diariamente com um volume 
                massivo de prontuários físicos, tabelas de testes complexas e processos manuais de correção.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                Nossa missão é fornecer uma plataforma tecnológica de excelência, segura e intuitiva, 
                que elimine a burocracia do processo de avaliação diagnóstica. Com isso, permitimos que o 
                profissional dedique seu tempo precioso ao que realmente importa: a escuta clínica, a 
                intervenção de qualidade e o acolhimento do paciente.
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText', p: 4, height: '100%' }}>
              <CardContent>
                <Stack spacing={3}>
                  <Typography variant="h5" fontWeight={700}>
                    Nossos Valores Fundamentais
                  </Typography>
                  
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <ShieldCheck size={28} style={{ flexShrink: 0 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>Segurança & Conformidade (LGPD)</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        O tratamento de dados sensíveis de saúde é assunto sério. Aplicamos as melhores práticas de criptografia e proteção jurídica de dados.
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <GraduationCap size={28} style={{ flexShrink: 0 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>Rigor Científico</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Todas as nossas ferramentas de correção de testes e triagens seguem fielmente os manuais técnicos e escalas acadêmicas regulamentadas.
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Heart size={28} style={{ flexShrink: 0 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>Foco no Profissional</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Acreditamos que a tecnologia deve ser um facilitador invisível, desenvolvida sob a supervisão de quem atua no consultório de verdade.
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Founders Section (E-E-A-T Focus) */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mt: 6 }}>
              <Typography variant="h4" fontWeight={700} textAlign="center" sx={{ mb: 6 }}>
                Os Fundadores
              </Typography>

              <Grid container spacing={4} justifyContent="center">
                {/* Ana Paula */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card 
                    sx={{ 
                      p: 4, 
                      height: '100%', 
                      borderTop: '5px solid', 
                      borderColor: 'primary.main',
                      boxShadow: 3
                    }}
                  >
                    <Stack spacing={3} alignItems="center" textAlign="center">
                      <Avatar 
                        sx={{ 
                          width: 100, 
                          height: 100, 
                          bgcolor: 'teal.500', 
                          fontSize: '2rem', 
                          fontWeight: 700 
                        }}
                      >
                        AP
                      </Avatar>
                      <Box>
                        <Typography variant="h5" fontWeight={700}>
                          Ana Paula Lima Duarte
                        </Typography>
                        <Typography variant="subtitle1" color="primary.main" fontWeight={600}>
                          Co-fundadora & Diretora Clínica
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                        Psicopedagoga e Neuropsicopedagoga com mais de 20 anos de atuação clínica no diagnóstico, 
                        intervenção e assessoria de dificuldades e transtornos de aprendizagem. Ana Paula é a mente 
                        por trás da validação científica do NeuroPPAvalia, garantindo que cada ferramenta de triagem, 
                        protocolo de teste (como CARS, Stroop, ATA, SNAP) e relatório digital atenda exatamente aos 
                        mais altos padrões exigidos pela prática profissional e ética clínica.
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>

                {/* Tony Sandro */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card 
                    sx={{ 
                      p: 4, 
                      height: '100%', 
                      borderTop: '5px solid', 
                      borderColor: 'secondary.main',
                      boxShadow: 3
                    }}
                  >
                    <Stack spacing={3} alignItems="center" textAlign="center">
                      <Avatar 
                        sx={{ 
                          width: 100, 
                          height: 100, 
                          bgcolor: 'blue.500', 
                          fontSize: '2rem', 
                          fontWeight: 700 
                        }}
                      >
                        TD
                      </Avatar>
                      <Box>
                        <Typography variant="h5" fontWeight={700}>
                          Tony Sandro Duarte Anselmo
                        </Typography>
                        <Typography variant="subtitle1" color="secondary.main" fontWeight={600}>
                          Co-fundador & Diretor de Tecnologia
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                        Programador e especialista em Engenharia de Software com mais de 5 anos de experiência no 
                        desenvolvimento de sistemas escaláveis e seguros. Tony é responsável por projetar uma 
                        arquitetura de software robusta, focada em segurança da informação, criptografia em trânsito 
                        e em repouso, e o cumprimento rigoroso da Lei Geral de Proteção de Dados (LGPD) no 
                        gerenciamento das informações sensíveis dos pacientes e profissionais.
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: 'grey.900',
          color: 'white',
          py: 6,
          mt: 'auto'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '6px',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <HeartPulse size={18} color="white" />
              </Box>
              <Typography variant="h6" fontWeight={700}>
                NeuroPPAvalia
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © {new Date().getFullYear()} NeuroPPAvalia. Todos os direitos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

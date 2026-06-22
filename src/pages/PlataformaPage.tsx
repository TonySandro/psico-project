import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Stack, Typography, Button, Card, CardContent, Chip,
} from '@mui/material';
import {
  ArrowRight, Users, ClipboardList, BarChart, FileText, Brain, BookOpen,
  Layers, ShieldCheck, CheckCircle,
} from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import StructuredData from '@/components/StructuredData';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import AnimatedSection from '@/components/AnimatedSection';

const resources = [
  { icon: BarChart, title: 'Dashboard', desc: 'Visão geral dos atendimentos e indicadores da rotina clínica.', path: '/plataforma' },
  { icon: Users, title: 'Gestão de Pacientes', desc: 'Cadastro e acompanhamento de todos os seus pacientes.', path: '/recursos/pacientes' },
  { icon: FileText, title: 'Prontuário Digital', desc: 'Registro organizado de informações clínicas e histórico.', path: '/recursos/prontuario' },
  { icon: ClipboardList, title: 'Anamnese Online', desc: 'Formulários digitais com link de acesso para responsáveis.', path: '/recursos/anamnese' },
  { icon: Brain, title: 'Testes Psicopedagógicos', desc: 'Acesso a testes integrados como CARS, Stroop, ATA, SNAP e mais.', path: '/recursos/testes' },
  { icon: BookOpen, title: 'Relatório do Professor', desc: 'Formulário de relato escolar com organização das respostas.', path: '/recursos/relatorios' },
  { icon: Layers, title: 'Organização de Relatórios', desc: 'Editor para estruturar informações para devolutivas.', path: '/recursos/relatorios' },
  { icon: ShieldCheck, title: 'Segurança e LGPD', desc: 'Ambiente profissional em conformidade com a LGPD.', path: '/plataforma' },
];

const sdData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Plataforma NPPAvalia — Avaliação Psicopedagógica',
  description: 'Conheça todos os recursos do NPPAvalia: gestão de pacientes, prontuários, anamneses, testes e relatórios psicopedagógicos.',
  url: 'https://nppavalia.com.br/plataforma',
};

export default function PlataformaPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <PageMeta
        title="Plataforma NPPAvalia | Avaliação Psicopedagógica, Prontuários e Relatórios"
        description="Conheça todos os recursos do NPPAvalia: gestão de pacientes, prontuários digitais, anamneses, testes psicopedagógicos e organização de relatórios para psicopedagogos."
      />
      <StructuredData data={sdData} />
      <header><PublicNavbar /></header>

      <main>
        {/* Hero */}
        <Box
          component="section"
          sx={{
            pt: { xs: 14, md: 18 },
            pb: { xs: 8, md: 12 },
            background: 'linear-gradient(160deg, #EFF6FF 0%, #F0FDFA 100%)',
            overflow: 'hidden',
          }}
        >
          <Container maxWidth="md">
            <Stack spacing={3} alignItems={{ xs: 'flex-start', md: 'center' }} textAlign={{ xs: 'left', md: 'center' }}>
              <AnimatedSection animation="fadeUp" delay={0}>
                <Chip label="Plataforma" size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700, fontSize: '0.7rem' }} />
              </AnimatedSection>
              <AnimatedSection animation="fadeUp" delay={150}>
                <Typography
                  component="h1"
                  variant="h2"
                  fontWeight={800}
                  sx={{ fontSize: { xs: '1.9rem', md: '2.8rem' }, lineHeight: 1.2 }}
                >
                  NPPAvalia: Plataforma para Avaliação Psicopedagógica
                </Typography>
              </AnimatedSection>
              <AnimatedSection animation="fadeUp" delay={300}>
                <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ lineHeight: 1.7, maxWidth: 680 }}>
                  Um sistema de gestão clínica desenvolvido para psicopedagogos e neuropsicopedagogos que precisam
                  organizar pacientes, anamneses, testes, prontuários e relatórios em um único ambiente digital.
                </Typography>
              </AnimatedSection>
              <AnimatedSection animation="fadeUp" delay={450}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRight size={18} />}
                    onClick={() => navigate('/signup')}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 700,
                      borderRadius: 2,
                      px: 4,
                      boxShadow: '0 8px 24px rgba(91, 19, 236, 0.25)',
                      '&:hover': {
                        boxShadow: '0 12px 28px rgba(91, 19, 236, 0.35)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    Criar conta gratuita
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 4,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        bgcolor: 'rgba(59, 130, 246, 0.04)',
                      }
                    }}
                  >
                    Já tenho conta
                  </Button>
                </Stack>
              </AnimatedSection>
            </Stack>
          </Container>
        </Box>

        {/* O que é */}
        <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper', overflow: 'hidden' }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedSection animation="fadeRight">
                  <Stack spacing={3}>
                    <Typography component="h2" variant="h4" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                      O que é o NPPAvalia?
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      O <strong>NPPAvalia</strong> é uma plataforma digital de apoio à rotina de avaliação psicopedagógica.
                      Ele reúne em um só sistema as principais ferramentas que psicopedagogos e neuropsicopedagogos precisam
                      para organizar seu trabalho clínico com mais eficiência.
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      A plataforma <strong>não realiza diagnóstico</strong> e <strong>não substitui o profissional</strong>.
                      Seu papel é organizar registros, apoiar o preenchimento de informações clínicas e facilitar
                      a estruturação de dados para relatórios, sempre com o psicopedagogo no controle do processo.
                    </Typography>
                    <Stack spacing={1.5}>
                      {[
                        'Gestão de pacientes psicopedagógicos',
                        'Prontuário psicopedagógico digital',
                        'Anamnese estruturada com acesso remoto',
                        'Testes psicopedagógicos integrados',
                        'Organização de relatórios e devolutivas',
                      ].map((item) => (
                        <Stack key={item} direction="row" spacing={1.5} alignItems="center">
                          <CheckCircle size={16} color="#3B82F6" style={{ flexShrink: 0 }} />
                          <Typography variant="body2" fontWeight={500}>{item}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </AnimatedSection>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedSection animation="fadeLeft" className="animate-float">
                  <Box
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Box sx={{ px: 2, py: 1, bgcolor: 'grey.100', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', gap: 0.8 }}>
                      {['#EF4444', '#F59E0B', '#10B981'].map((c) => (
                        <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c }} />
                      ))}
                    </Box>
                    <img
                      src="/demo-images/dashboard-nppavalia.webp"
                      alt="Dashboard da plataforma NPPAvalia com indicadores fictícios de pacientes e avaliações"
                      loading="lazy"
                      width={800}
                      height={500}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </Box>
                </AnimatedSection>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Recursos */}
        <Box component="section" id="recursos" sx={{ py: { xs: 8, md: 10 }, bgcolor: 'grey.50' }}>
          <Container maxWidth="lg">
            <Stack spacing={5}>
              <AnimatedSection animation="fadeUp" textAlign="center" alignItems="center">
                <Typography component="h2" variant="h4" fontWeight={700}>Recursos da plataforma</Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 580, lineHeight: 1.7 }}>
                  Ferramentas integradas para apoiar a rotina psicopedagógica do início ao fim do processo avaliativo.
                </Typography>
              </AnimatedSection>
              <Grid container spacing={3}>
                {resources.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                      <AnimatedSection animation="fadeUp" delay={index * 80} height="100%">
                        <Card
                          onClick={() => navigate(item.path)}
                          sx={{
                            height: '100%',
                            cursor: 'pointer',
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow: 'none',
                            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                            '&:hover': {
                              boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
                              borderColor: 'primary.main',
                              transform: 'translateY(-5px)'
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: 2,
                                bgcolor: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.1) rotate(4deg)' }
                              }}
                            >
                              <Icon size={22} color="white" />
                            </Box>
                            <Typography component="h3" variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>{item.title}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{item.desc}</Typography>
                          </CardContent>
                        </Card>
                      </AnimatedSection>
                    </Grid>
                  );
                })}
              </Grid>
            </Stack>
          </Container>
        </Box>

        {/* CTA */}
        <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper', textAlign: 'center', overflow: 'hidden' }}>
          <Container maxWidth="sm">
            <AnimatedSection animation="scaleIn">
              <Typography component="h2" variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                Pronto para organizar sua rotina psicopedagógica?
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
                Crie sua conta gratuitamente e explore os recursos disponíveis.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight size={18} />}
                  onClick={() => navigate('/signup')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 4,
                    boxShadow: '0 8px 24px rgba(91, 19, 236, 0.25)',
                    '&:hover': {
                      boxShadow: '0 12px 28px rgba(91, 19, 236, 0.35)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Criar conta
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      bgcolor: 'rgba(59, 130, 246, 0.04)',
                    }
                  }}
                >
                  Voltar para Home
                </Button>
              </Stack>
            </AnimatedSection>
          </Container>
        </Box>
      </main>

      <PublicFooter />
    </Box>
  );
}

import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Stack, Typography, Button, Chip } from '@mui/material';
import { ArrowRight, Users, CheckCircle, FolderOpen, BarChart, ArrowLeft } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import StructuredData from '@/components/StructuredData';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';

const sdData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Gestão de Pacientes para Psicopedagogos | NPPAvalia',
  description: 'Organize e acompanhe todos os seus pacientes psicopedagógicos em uma plataforma criada para psicopedagogos e neuropsicopedagogos.',
  url: 'https://nppavalia.com.br/recursos/pacientes',
};

export default function RecursoPacientesPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <PageMeta
        title="Gestão de Pacientes para Psicopedagogos | NPPAvalia"
        description="Organize e acompanhe todos os seus pacientes psicopedagógicos em uma plataforma criada para psicopedagogos e neuropsicopedagogos. Cadastro, busca e histórico centralizado."
      />
      <StructuredData data={sdData} />
      <header><PublicNavbar /></header>

      <main>
        {/* Hero */}
        <Box
          component="section"
          sx={{
            pt: { xs: 14, md: 18 },
            pb: { xs: 8, md: 10 },
            background: 'linear-gradient(160deg, #EFF6FF 0%, #F0FDFA 100%)',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={3}>
                  <Chip label="Recursos / Pacientes" size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700, fontSize: '0.7rem', width: 'fit-content' }} />
                  <Typography component="h1" variant="h2" fontWeight={800} sx={{ fontSize: { xs: '1.8rem', md: '2.6rem' }, lineHeight: 1.2 }}>
                    Gestão de Pacientes para Psicopedagogos
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ lineHeight: 1.7 }}>
                    Cadastre, organize e acompanhe todos os seus pacientes em um único ambiente digital,
                    com histórico completo, busca rápida e acesso seguro a qualquer momento.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowRight size={18} />}
                      onClick={() => navigate('/signup')}
                      sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2, px: 4 }}
                    >
                      Criar conta gratuita
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<ArrowLeft size={16} />}
                      onClick={() => navigate('/plataforma')}
                      sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
                    >
                      Ver todos os recursos
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                  <Box sx={{ px: 2, py: 1, bgcolor: 'grey.100', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', gap: 0.8 }}>
                    {['#EF4444', '#F59E0B', '#10B981'].map((c) => <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c }} />)}
                  </Box>
                  <img
                    src="/demo-images/pacientes-nppavalia.webp"
                    alt="Tela de cadastro de pacientes com informações demonstrativas na plataforma NPPAvalia"
                    loading="eager"
                    width={800}
                    height={500}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Content */}
        <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Grid container spacing={8} alignItems="flex-start">
              <Grid size={{ xs: 12, md: 7 }}>
                <Stack spacing={4}>
                  <Box>
                    <Typography component="h2" variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                      Por que organizar seus pacientes na plataforma?
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                      A gestão de pacientes é a base do trabalho do psicopedagogo. O NPPAvalia permite que você
                      cadastre cada paciente com as informações necessárias e tenha acesso rápido a todo o histórico
                      de atendimentos, testes aplicados, anamneses e relatórios.
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      Diferente de planilhas ou fichas em papel, a plataforma organiza tudo em um só lugar,
                      com busca rápida e acesso seguro, facilitando a rotina do consultório ou clínica.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component="h2" variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                      O que você pode fazer na área de pacientes?
                    </Typography>
                    <Stack spacing={1.5}>
                      {[
                        'Cadastrar novos pacientes com informações básicas e dados de contato',
                        'Organizar o histórico de atendimentos por paciente',
                        'Acessar anamneses, testes e relatórios vinculados a cada paciente',
                        'Buscar pacientes rapidamente por nome',
                        'Visualizar prontuário completo de forma centralizada',
                        'Registrar evoluções e informações clínicas ao longo do tempo',
                      ].map((item) => (
                        <Stack key={item} direction="row" spacing={1.5} alignItems="flex-start">
                          <CheckCircle size={16} color="#3B82F6" style={{ marginTop: 3, flexShrink: 0 }} />
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{item}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <Typography component="h2" variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                      Dados fictícios nas demonstrações
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      Todas as telas de demonstração da plataforma utilizam exclusivamente dados fictícios,
                      como "Paciente Exemplo", "Ana Fictícia" ou "João Demonstração". Nenhum dado real de paciente
                      é utilizado em capturas de tela ou materiais de divulgação.
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ bgcolor: 'grey.50', borderRadius: 3, p: 4, border: '1px solid', borderColor: 'divider' }}>
                  <Typography component="h3" variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                    Para quem é este recurso?
                  </Typography>
                  <Stack spacing={2.5}>
                    {[
                      { icon: Users, title: 'Psicopedagogos clínicos', desc: 'Que atendem múltiplos pacientes e precisam de organização eficiente.' },
                      { icon: FolderOpen, title: 'Clínicas e consultórios', desc: 'Com maior volume de atendimentos e necessidade de controle centralizado.' },
                      { icon: BarChart, title: 'Profissionais em avaliação', desc: 'Que precisam acompanhar o processo avaliativo de cada paciente individualmente.' },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <Stack key={item.title} direction="row" spacing={2} alignItems="flex-start">
                          <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon size={20} color="white" />
                          </Box>
                          <Box>
                            <Typography fontWeight={600} variant="body2">{item.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                          </Box>
                        </Stack>
                      );
                    })}
                  </Stack>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRight size={16} />}
                    onClick={() => navigate('/signup')}
                    sx={{ mt: 4, textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
                  >
                    Começar agora
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>

      <PublicFooter />
    </Box>
  );
}

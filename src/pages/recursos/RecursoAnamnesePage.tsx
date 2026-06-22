import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Stack, Typography, Button, Chip } from '@mui/material';
import { ArrowRight, ClipboardList, CheckCircle, Link, Users, ArrowLeft } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import StructuredData from '@/components/StructuredData';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import AnimatedSection from '@/components/AnimatedSection';

const sdData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Anamnese Psicopedagógica Online | NPPAvalia',
  description: 'Crie e organize anamneses psicopedagógicas digitais com link de acesso para responsáveis. Plataforma para psicopedagogos e neuropsicopedagogos.',
  url: 'https://nppavalia.com.br/recursos/anamnese',
};

export default function RecursoAnamnesePage() {
  const navigate = useNavigate();

  return (
    <Box>
      <PageMeta
        title="Anamnese Psicopedagógica Online | NPPAvalia"
        description="Crie e organize anamneses psicopedagógicas digitais com link de acesso para responsáveis. Formulários estruturados para a rotina de avaliação psicopedagógica."
      />
      <StructuredData data={sdData} />
      <header><PublicNavbar /></header>

      <main>
        {/* Hero */}
        <Box
          component="section"
          sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 8, md: 10 }, background: 'linear-gradient(160deg, #EFF6FF 0%, #F0FDFA 100%)' }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedSection animation="fadeUp" delay={0}>
                  <Stack spacing={3}>
                  <Chip label="Recursos / Anamnese" size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700, fontSize: '0.7rem', width: 'fit-content' }} />
                  <Typography component="h1" variant="h2" fontWeight={800} sx={{ fontSize: { xs: '1.8rem', md: '2.6rem' }, lineHeight: 1.2 }}>
                    Anamnese Psicopedagógica Online
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ lineHeight: 1.7 }}>
                    Crie modelos de anamnese digital e envie um link para que os responsáveis preencham
                    antes ou durante o processo de avaliação psicopedagógica, sem necessidade de formulários em papel.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button variant="contained" size="large" endIcon={<ArrowRight size={18} />} onClick={() => navigate('/signup')} sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2, px: 4 }}>
                      Criar conta gratuita
                    </Button>
                    <Button variant="outlined" size="large" startIcon={<ArrowLeft size={16} />} onClick={() => navigate('/plataforma')} sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2 }}>
                      Ver todos os recursos
                    </Button>
                  </Stack>
                </Stack>
                </AnimatedSection>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedSection animation="fadeLeft" delay={200} className="animate-float">
                  <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                  <Box sx={{ px: 2, py: 1, bgcolor: 'grey.100', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', gap: 0.8 }}>
                    {['#EF4444', '#F59E0B', '#10B981'].map((c) => <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c }} />)}
                  </Box>
                  <img
                    src="/demo-images/anamnese-nppavalia.webp"
                    alt="Tela de anamnese psicopedagógica com dados fictícios na plataforma NPPAvalia"
                    loading="eager"
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

        {/* Content */}
        <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper', overflow: 'hidden' }}>
          <Container maxWidth="lg">
            <AnimatedSection animation="fadeUp" delay={100}>
            <Grid container spacing={8} alignItems="flex-start">
              <Grid size={{ xs: 12, md: 7 }}>
                <Stack spacing={4}>
                  <Box>
                    <Typography component="h2" variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                      Anamnese digital estruturada para psicopedagogos
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                      A anamnese é uma etapa fundamental na avaliação psicopedagógica. No NPPAvalia, você pode criar modelos
                      personalizados de anamnese, com campos estruturados para coletar as informações necessárias sobre o histórico
                      do paciente — incluindo queixas, desenvolvimento, histórico escolar e familiar.
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      Um link exclusivo pode ser gerado e enviado aos responsáveis para preenchimento remoto, sem necessidade
                      de presença física e sem que eles precisem criar uma conta na plataforma.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component="h2" variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                      Recursos disponíveis na área de anamnese
                    </Typography>
                    <Stack spacing={1.5}>
                      {[
                        'Criação de modelos de anamnese personalizados',
                        'Geração de link de acesso para preenchimento pelos responsáveis',
                        'Visualização das respostas diretamente no prontuário do paciente',
                        'Histórico de anamneses por paciente',
                        'Anamnese padrão disponível para uso imediato',
                        'Acesso seguro sem necessidade de login para os responsáveis',
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
                      A anamnese apoia — não substitui — a entrevista clínica
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      O preenchimento digital da anamnese é uma forma de organizar informações antes ou durante o processo de avaliação.
                      A entrevista clínica, análise das respostas e julgamento das informações coletadas são sempre responsabilidade
                      do psicopedagogo responsável pelo atendimento.
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ bgcolor: 'grey.50', borderRadius: 3, p: 4, border: '1px solid', borderColor: 'divider' }}>
                  <Typography component="h3" variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                    Como funciona na prática
                  </Typography>
                  <Stack spacing={2.5}>
                    {[
                      { icon: ClipboardList, title: 'Crie o modelo', desc: 'Monte a anamnese com as perguntas relevantes para sua prática clínica.' },
                      { icon: Link, title: 'Envie o link', desc: 'Compartilhe um link com os responsáveis por WhatsApp ou e-mail.' },
                      { icon: Users, title: 'Acesse as respostas', desc: 'Visualize tudo no prontuário do paciente, organizado e acessível.' },
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
                  <Button fullWidth variant="contained" size="large" endIcon={<ArrowRight size={16} />} onClick={() => navigate('/signup')} sx={{ mt: 4, textTransform: 'none', fontWeight: 700, borderRadius: 2 }}>
                    Começar agora
                  </Button>
                </Box>
              </Grid>
            </Grid>
            </AnimatedSection>
          </Container>
        </Box>
      </main>

      <PublicFooter />
    </Box>
  );
}

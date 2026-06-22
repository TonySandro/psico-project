import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Stack, Typography, Button, Chip, Alert } from '@mui/material';
import { ArrowRight, Brain, CheckCircle, ShieldCheck, AlertTriangle, ArrowLeft } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import StructuredData from '@/components/StructuredData';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import AnimatedSection from '@/components/AnimatedSection';

const sdData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Testes Psicopedagógicos na Plataforma NPPAvalia',
  description: 'Acesse testes psicopedagógicos integrados como CARS, Stroop, ATA, SNAP, Token Test e AQ-10. A plataforma apoia organização e registro — o julgamento clínico é do profissional.',
  url: 'https://nppavalia.com.br/recursos/testes',
};

const testesDisponiveis = [
  { name: 'CARS', desc: 'Childhood Autism Rating Scale — escala para avaliação de comportamentos associados ao autismo.' },
  { name: 'Stroop', desc: 'Teste de atenção e controle inibitório para avaliação de funções executivas.' },
  { name: 'ATA', desc: 'Avaliação de Transtorno de Atenção para apoio ao registro de observações.' },
  { name: 'SNAP-IV', desc: 'Escala de avaliação de sintomas de desatenção e hiperatividade.' },
  { name: 'Token Test', desc: 'Teste de compreensão verbal e processamento de instruções.' },
  { name: 'AQ-10', desc: 'Autism-Spectrum Quotient — questionário de rastreio para aspectos do espectro autista.' },
  { name: 'M-CHAT-R', desc: 'Modified Checklist for Autism in Toddlers — triagem de comportamentos em crianças pequenas.' },
  { name: 'TDE-2', desc: 'Teste de Desempenho Escolar 2ª edição — avaliação de leitura, escrita e aritmética.' },
];

export default function RecursoTestesPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <PageMeta
        title="Testes Psicopedagógicos na Plataforma NPPAvalia"
        description="Acesse testes psicopedagógicos integrados como CARS, Stroop, ATA, SNAP, Token Test e AQ-10 na plataforma NPPAvalia. A plataforma apoia organização e registro de resultados."
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
                  <Chip label="Recursos / Testes" size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700, fontSize: '0.7rem', width: 'fit-content' }} />
                  <Typography component="h1" variant="h2" fontWeight={800} sx={{ fontSize: { xs: '1.8rem', md: '2.6rem' }, lineHeight: 1.2 }}>
                    Testes Psicopedagógicos na Plataforma NPPAvalia
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ lineHeight: 1.7 }}>
                    Acesse testes psicopedagógicos integrados para apoio à organização, registro e,
                    quando permitido, correção automatizada de pontuações durante o processo de avaliação.
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
                    src="/demo-images/testes-nppavalia.webp"
                    alt="Tela de testes psicopedagógicos disponíveis na plataforma NPPAvalia"
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
            <Stack spacing={6}>
              {/* Ethics notice */}
              <Alert
                icon={<AlertTriangle size={20} />}
                severity="info"
                sx={{ borderRadius: 2, '& .MuiAlert-message': { lineHeight: 1.7 } }}
              >
                <strong>Aviso importante:</strong> A plataforma NPPAvalia realiza apenas o registro e, quando aplicável,
                o cálculo da pontuação dos testes. A aplicação, interpretação clínica e conclusão diagnóstica devem ser
                feitas pelo profissional habilitado, com base no material original do teste, observação clínica, anamnese
                e demais instrumentos utilizados. A plataforma não substitui os materiais originais dos testes.
              </Alert>

              <Grid container spacing={8} alignItems="flex-start">
                <Grid size={{ xs: 12, md: 7 }}>
                  <Stack spacing={4}>
                    <Box>
                      <Typography component="h2" variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                        Como os testes funcionam no NPPAvalia?
                      </Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                        A área de testes do NPPAvalia oferece acesso a instrumentos psicopedagógicos integrados à plataforma.
                        Para cada teste, o profissional pode registrar as respostas observadas durante a aplicação presencial,
                        e a plataforma auxilia no cálculo de pontuações e organização dos resultados quando isso é possível e permitido.
                      </Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        Os resultados ficam vinculados ao prontuário do paciente, facilitando o acesso às informações durante
                        a elaboração do relatório. A plataforma não fornece interpretação automática dos resultados — essa
                        etapa é sempre responsabilidade do profissional.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography component="h2" variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                        O que a plataforma oferece na área de testes?
                      </Typography>
                      <Stack spacing={1.5}>
                        {[
                          'Registro das respostas coletadas durante a aplicação presencial',
                          'Cálculo automatizado de pontuação quando aplicável e permitido',
                          'Organização dos resultados vinculados ao prontuário do paciente',
                          'Histórico de testes aplicados por paciente',
                          'Acesso facilitado às informações para elaboração de relatórios',
                          'Tela com aviso ético em cada teste sobre limitações da plataforma',
                        ].map((item) => (
                          <Stack key={item} direction="row" spacing={1.5} alignItems="flex-start">
                            <CheckCircle size={16} color="#3B82F6" style={{ marginTop: 3, flexShrink: 0 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{item}</Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Box>

                    {/* Testes disponíveis */}
                    <Box>
                      <Typography component="h2" variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                        Testes disponíveis na plataforma
                      </Typography>
                      <Grid container spacing={2}>
                        {testesDisponiveis.map((t) => (
                          <Grid key={t.name} size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ bgcolor: 'grey.50', borderRadius: 2, p: 2, border: '1px solid', borderColor: 'divider' }}>
                              <Typography fontWeight={700} variant="body2" color="primary.main">{t.name}</Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>{t.desc}</Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                  <Box sx={{ bgcolor: 'grey.50', borderRadius: 3, p: 4, border: '1px solid', borderColor: 'divider' }}>
                    <Typography component="h3" variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                      Cuidados éticos da plataforma
                    </Typography>
                    <Stack spacing={2.5}>
                      {[
                        { icon: ShieldCheck, title: 'Sem conteúdo protegido exposto', desc: 'A plataforma não exibe tabelas, percentis ou critérios de correção restritos dos instrumentos.' },
                        { icon: Brain, title: 'Sem diagnóstico automático', desc: 'Nenhum resultado gerado pela plataforma é apresentado como diagnóstico.' },
                        { icon: AlertTriangle, title: 'Aviso ético em cada teste', desc: 'Cada tela de teste inclui aviso sobre as limitações da plataforma e responsabilidade do profissional.' },
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
                      Acessar a plataforma
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
            </AnimatedSection>
          </Container>
        </Box>
      </main>

      <PublicFooter />
    </Box>
  );
}

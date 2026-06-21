import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Stack, Typography, Button, Chip } from '@mui/material';
import { ArrowRight, FileText, CheckCircle, Clock, ShieldCheck, ArrowLeft } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import StructuredData from '@/components/StructuredData';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';

const sdData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Prontuário Psicopedagógico Digital | NPPAvalia',
  description: 'Organize o prontuário psicopedagógico dos seus pacientes de forma digital, centralizada e segura na plataforma NPPAvalia.',
  url: 'https://nppavalia.com.br/recursos/prontuario',
};

export default function RecursoProntuarioPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <PageMeta
        title="Prontuário Psicopedagógico Digital | NPPAvalia"
        description="Organize o prontuário psicopedagógico dos seus pacientes de forma digital, centralizada e segura. Registre histórico clínico, testes e evoluções na plataforma NPPAvalia."
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
                <Stack spacing={3}>
                  <Chip label="Recursos / Prontuário" size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700, fontSize: '0.7rem', width: 'fit-content' }} />
                  <Typography component="h1" variant="h2" fontWeight={800} sx={{ fontSize: { xs: '1.8rem', md: '2.6rem' }, lineHeight: 1.2 }}>
                    Prontuário Psicopedagógico Digital
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ lineHeight: 1.7 }}>
                    Centralize as informações clínicas de cada paciente em um prontuário psicopedagógico
                    digital organizado, acessível e seguro — tudo em um só lugar.
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
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                  <Box sx={{ px: 2, py: 1, bgcolor: 'grey.100', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', gap: 0.8 }}>
                    {['#EF4444', '#F59E0B', '#10B981'].map((c) => <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c }} />)}
                  </Box>
                  <img
                    src="/demo-images/prontuario-nppavalia.webp"
                    alt="Tela de prontuário psicopedagógico com dados fictícios na plataforma NPPAvalia"
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
                      O que é o prontuário psicopedagógico no NPPAvalia?
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                      O prontuário psicopedagógico é o espaço central de registro de informações clínicas de cada paciente.
                      No NPPAvalia, ele reúne em um único lugar o histórico de atendimentos, os resultados de testes aplicados,
                      as anamneses preenchidas, os relatórios do professor e os relatórios elaborados pelo profissional.
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      O objetivo é que o psicopedagogo tenha acesso rápido e organizado a todas as informações relevantes
                      de um paciente, sem depender de papéis, pastas físicas ou planilhas dispersas.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component="h2" variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                      O que está disponível no prontuário?
                    </Typography>
                    <Stack spacing={1.5}>
                      {[
                        'Dados cadastrais e informações do paciente',
                        'Histórico de anamneses preenchidas',
                        'Resultados de testes psicopedagógicos aplicados',
                        'Relatórios do professor vinculados ao paciente',
                        'Relatórios e devolutivas elaborados pelo profissional',
                        'Registro de evoluções e observações clínicas',
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
                      Importante: o prontuário não substitui o julgamento clínico
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      O prontuário digital do NPPAvalia é uma ferramenta de organização e registro. Toda análise clínica,
                      interpretação de resultados e conclusão diagnóstica são de responsabilidade exclusiva do profissional
                      psicopedagogo ou neuropsicopedagogo responsável pelo atendimento.
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ bgcolor: 'grey.50', borderRadius: 3, p: 4, border: '1px solid', borderColor: 'divider' }}>
                  <Typography component="h3" variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                    Benefícios do prontuário digital
                  </Typography>
                  <Stack spacing={2.5}>
                    {[
                      { icon: FileText, title: 'Centralização de informações', desc: 'Todos os dados do paciente em um único registro acessível.' },
                      { icon: Clock, title: 'Agilidade no acesso', desc: 'Encontre rapidamente o histórico de qualquer paciente.' },
                      { icon: ShieldCheck, title: 'Organização profissional', desc: 'Registro estruturado para apoio à rotina de avaliação.' },
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
          </Container>
        </Box>
      </main>

      <PublicFooter />
    </Box>
  );
}

import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Stack, Typography, Button, Chip } from '@mui/material';
import { ArrowRight, FileText, CheckCircle, Layers, BookOpen, ArrowLeft } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import StructuredData from '@/components/StructuredData';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';

const sdData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Relatórios Psicopedagógicos com Mais Organização | NPPAvalia',
  description: 'Organize e estruture relatórios psicopedagógicos com o editor da plataforma NPPAvalia. Apoio à construção de devolutivas para psicopedagogos e neuropsicopedagogos.',
  url: 'https://nppavalia.com.br/recursos/relatorios',
};

export default function RecursoRelatoriosPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <PageMeta
        title="Relatórios Psicopedagógicos com Mais Organização | NPPAvalia"
        description="Organize e estruture relatórios psicopedagógicos com o editor da plataforma NPPAvalia. Apoio à construção de devolutivas para psicopedagogos e neuropsicopedagogos."
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
                  <Chip label="Recursos / Relatórios" size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700, fontSize: '0.7rem', width: 'fit-content' }} />
                  <Typography component="h1" variant="h2" fontWeight={800} sx={{ fontSize: { xs: '1.8rem', md: '2.6rem' }, lineHeight: 1.2 }}>
                    Relatórios Psicopedagógicos com Mais Organização
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ lineHeight: 1.7 }}>
                    Organize as informações coletadas ao longo da avaliação psicopedagógica em um editor de
                    relatórios estruturado, facilitando a elaboração de devolutivas e laudos.
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
                    src="/demo-images/relatorio-professor-nppavalia.webp"
                    alt="Tela de relatório do professor com exemplo fictício na plataforma NPPAvalia"
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
                      Apoio à organização de relatórios psicopedagógicos
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                      Elaborar um relatório psicopedagógico requer organizar diversas informações coletadas ao longo
                      do processo avaliativo: dados da anamnese, resultados de testes, observações clínicas, relatos
                      de professores e muito mais.
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                      O NPPAvalia disponibiliza um <strong>editor de relatórios</strong> que permite estruturar essas
                      informações de forma organizada, com formatação de texto e organização por seções, facilitando
                      a escrita pelo profissional responsável.
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      Além disso, a plataforma conta com o recurso de <strong>Relatório do Professor</strong>, que
                      permite enviar um formulário de relato escolar ao professor e organizar as respostas diretamente
                      no prontuário do paciente.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component="h2" variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                      O que está disponível na área de relatórios?
                    </Typography>
                    <Stack spacing={1.5}>
                      {[
                        'Editor de relatórios psicopedagógicos com formatação de texto',
                        'Organização de informações por seções do relatório',
                        'Relatório do Professor com link de envio para professores e responsáveis',
                        'Visualização das respostas do professor no prontuário do paciente',
                        'Histórico de relatórios por paciente',
                        'Acesso facilitado às informações coletadas ao longo da avaliação',
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
                      O conteúdo clínico do relatório é sempre do profissional
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      O editor de relatórios é uma ferramenta de organização e escrita. A análise clínica, a interpretação
                      dos resultados, as conclusões diagnósticas e o conteúdo final do relatório são de inteira
                      responsabilidade do psicopedagogo ou neuropsicopedagogo responsável pelo atendimento.
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ bgcolor: 'grey.50', borderRadius: 3, p: 4, border: '1px solid', borderColor: 'divider' }}>
                  <Typography component="h3" variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                    Recursos disponíveis
                  </Typography>
                  <Stack spacing={2.5}>
                    {[
                      { icon: FileText, title: 'Editor de relatórios', desc: 'Escreva e organize relatórios psicopedagógicos com formatação de texto.' },
                      { icon: BookOpen, title: 'Relatório do Professor', desc: 'Envie formulário ao professor e receba respostas diretamente na plataforma.' },
                      { icon: Layers, title: 'Histórico por paciente', desc: 'Todos os relatórios ficam vinculados ao prontuário do paciente.' },
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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Stack, Typography, Button, Card, CardContent,
  Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, Chip,
} from '@mui/material';
import {
  Users, ClipboardList, BarChart, FileText, Brain, HeartPulse,
  ArrowRight, CheckCircle, ChevronDown, BookOpen, ShieldCheck,
  Clock, FolderOpen, Layers, Star,
} from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import StructuredData from '@/components/StructuredData';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';

// ── Demo screenshots (served from public/) ──────────────────────────────────
const DEMO_IMAGES = {
  dashboard: '/demo-images/dashboard-nppavalia.webp',
  pacientes: '/demo-images/pacientes-nppavalia.webp',
  prontuario: '/demo-images/prontuario-nppavalia.webp',
  anamnese: '/demo-images/anamnese-nppavalia.webp',
  relatorio: '/demo-images/relatorio-professor-nppavalia.webp',
  testes: '/demo-images/testes-nppavalia.webp',
};

// ── JSON-LD structured data ──────────────────────────────────────────────────
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://nppavalia.com.br/#software',
      name: 'NPPAvalia',
      url: 'https://nppavalia.com.br',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'All',
      description:
        'Plataforma para avaliação psicopedagógica, prontuários e relatórios. Organização de pacientes, anamneses e testes psicopedagógicos para psicopedagogos e neuropsicopedagogos.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://nppavalia.com.br/#organization',
      name: 'NPPAvalia',
      url: 'https://nppavalia.com.br',
      logo: 'https://nppavalia.com.br/icons/android-chrome-512x512.webp',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O NPPAvalia faz diagnóstico?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. O NPPAvalia não realiza diagnóstico. A plataforma apoia a organização de informações clínicas e o registro de resultados de testes, mas a análise diagnóstica é sempre responsabilidade do profissional habilitado.',
          },
        },
        {
          '@type': 'Question',
          name: 'A plataforma substitui o psicopedagogo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. O NPPAvalia é uma ferramenta de apoio à rotina clínica. Todo julgamento profissional, análise e conclusão diagnóstica são de responsabilidade exclusiva do psicopedagogo ou neuropsicopedagogo.',
          },
        },
        {
          '@type': 'Question',
          name: 'Posso usar para organizar meus pacientes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. A plataforma foi criada especificamente para que psicopedagogos e neuropsicopedagogos possam cadastrar e acompanhar seus pacientes de forma organizada e segura.',
          },
        },
        {
          '@type': 'Question',
          name: 'A plataforma gera relatórios automaticamente?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O NPPAvalia oferece um editor de relatórios que facilita a organização das informações coletadas. O conteúdo clínico do relatório é sempre elaborado pelo profissional.',
          },
        },
        {
          '@type': 'Question',
          name: 'Os dados usados nas demonstrações são reais?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. Todos os dados exibidos nas telas de demonstração são completamente fictícios, criados apenas para fins ilustrativos. Nenhum dado real de paciente é utilizado.',
          },
        },
        {
          '@type': 'Question',
          name: 'Preciso assinar para acessar os testes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Alguns recursos avançados, incluindo o acesso completo à área de testes psicopedagógicos, requerem um plano ativo na plataforma. Consulte os detalhes de planos ao se cadastrar.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quais profissionais podem usar a plataforma?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O NPPAvalia é indicado para psicopedagogos clínicos, neuropsicopedagogos, profissionais de educação especial e clínicas que realizam avaliações psicopedagógicas e precisam organizar registros e relatórios.',
          },
        },
      ],
    },
  ],
};

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Chip
      label={children}
      size="small"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        fontWeight: 700,
        fontSize: '0.7rem',
        letterSpacing: 1,
        textTransform: 'uppercase',
        mb: 2,
      }}
    />
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      component="h2"
      variant="h3"
      fontWeight={700}
      sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, lineHeight: 1.25, mb: 2 }}
    >
      {children}
    </Typography>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();
  const [screenshotTab, setScreenshotTab] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<string | false>(false);

  const handleFaqChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  // ── Data ──────────────────────────────────────────────────────────────────

  const targetAudience = [
    {
      icon: Brain,
      title: 'Psicopedagogos Clínicos',
      description:
        'Profissionais que realizam avaliações psicopedagógicas em consultório ou clínica e precisam de organização e agilidade no registro de informações.',
    },
    {
      icon: HeartPulse,
      title: 'Neuropsicopedagogos',
      description:
        'Especialistas em neuropsicopedagogia que aplicam testes, organizam prontuários e elaboram relatórios para pacientes com diferentes perfis de aprendizagem.',
    },
    {
      icon: FolderOpen,
      title: 'Clínicas e Consultórios',
      description:
        'Espaços clínicos que atendem múltiplos pacientes e precisam de um sistema centralizado para gestão dos registros e acompanhamento de avaliações.',
    },
    {
      icon: BookOpen,
      title: 'Profissionais de Avaliação',
      description:
        'Qualquer profissional habilitado que realize avaliações psicopedagógicas e precise organizar registros, testes aplicados e informações para relatórios.',
    },
  ];

  const resources = [
    {
      icon: BarChart,
      title: 'Dashboard',
      description: 'Visão geral dos atendimentos com indicadores e acompanhamento da rotina clínica.',
      path: '/plataforma',
    },
    {
      icon: Users,
      title: 'Gestão de Pacientes',
      description: 'Cadastro, busca e acompanhamento de todos os seus pacientes em um só lugar.',
      path: '/recursos/pacientes',
    },
    {
      icon: FileText,
      title: 'Prontuário do Paciente',
      description: 'Registro organizado de informações clínicas, histórico e evoluções de cada paciente.',
      path: '/recursos/prontuario',
    },
    {
      icon: ClipboardList,
      title: 'Anamnese',
      description: 'Criação e preenchimento de anamneses digitais estruturadas, com link de acesso para responsáveis.',
      path: '/recursos/anamnese',
    },
    {
      icon: Brain,
      title: 'Testes Disponíveis',
      description: 'Acesso a testes psicopedagógicos como CARS, Stroop, ATA, SNAP, Token Test e AQ-10.',
      path: '/recursos/testes',
    },
    {
      icon: BookOpen,
      title: 'Relatório do Professor',
      description: 'Envio de formulário de relato escolar ao professor, com organização das respostas no prontuário.',
      path: '/recursos/relatorios',
    },
    {
      icon: Layers,
      title: 'Organização de Relatórios',
      description: 'Editor de relatórios psicopedagógicos para estruturar e organizar informações para devolutivas.',
      path: '/recursos/relatorios',
    },
    {
      icon: ShieldCheck,
      title: 'Segurança e LGPD',
      description: 'Ambiente com foco em segurança e conformidade com a Lei Geral de Proteção de Dados.',
      path: '/plataforma',
    },
  ];

  const steps = [
    { num: '01', title: 'Cadastre-se na plataforma', desc: 'Crie sua conta gratuitamente e acesse o ambiente profissional.' },
    { num: '02', title: 'Adicione seus pacientes', desc: 'Cadastre os pacientes que serão atendidos, organizando informações básicas de cada um.' },
    { num: '03', title: 'Preencha anamnese e prontuário', desc: 'Registre o histórico clínico, queixas e informações coletadas nas entrevistas iniciais.' },
    { num: '04', title: 'Acesse os testes disponíveis', desc: 'Utilize os testes psicopedagógicos integrados à plataforma para apoio às avaliações.' },
    { num: '05', title: 'Registre resultados e informações', desc: 'Organize os resultados e informações relevantes coletados ao longo da avaliação.' },
    { num: '06', title: 'Estruture dados para relatórios', desc: 'Use o editor de relatórios para organizar as informações para devolutivas e laudos.' },
  ];

  const benefits = [
    { icon: Clock, title: 'Menos tempo administrativo', desc: 'Reduza o tempo gasto com organização de papéis, fichas e documentos dispersos.' },
    { icon: FolderOpen, title: 'Mais organização clínica', desc: 'Centralize informações do paciente, testes, anamneses e relatórios em um único ambiente.' },
    { icon: Users, title: 'Gestão de pacientes', desc: 'Acompanhe todos os seus pacientes com histórico completo e acessível a qualquer momento.' },
    { icon: BarChart, title: 'Acompanhamento de evolução', desc: 'Visualize informações registradas ao longo do tempo para acompanhar o processo avaliativo.' },
    { icon: FileText, title: 'Apoio na elaboração de relatórios', desc: 'Organize as informações coletadas de forma estruturada para facilitar a escrita de relatórios.' },
    { icon: Star, title: 'Rotina de avaliação mais clara', desc: 'Um fluxo organizado da anamnese ao relatório para apoiar a prática profissional.' },
  ];

  const faqs = [
    {
      q: 'O NPPAvalia faz diagnóstico?',
      a: 'Não. O NPPAvalia não realiza diagnóstico. A plataforma apoia a organização de informações clínicas e o registro de dados coletados nos testes, mas a análise diagnóstica é sempre responsabilidade do profissional habilitado, com base em seu julgamento clínico.',
    },
    {
      q: 'A plataforma substitui o psicopedagogo?',
      a: 'Não. O NPPAvalia é uma ferramenta de apoio à rotina clínica. Todo julgamento profissional, análise e conclusão diagnóstica são de responsabilidade exclusiva do psicopedagogo ou neuropsicopedagogo responsável pelo atendimento.',
    },
    {
      q: 'Posso usar para organizar meus pacientes?',
      a: 'Sim. A plataforma foi criada especificamente para que psicopedagogos e neuropsicopedagogos possam cadastrar e acompanhar seus pacientes de forma organizada, segura e centralizada.',
    },
    {
      q: 'A plataforma gera relatórios automaticamente?',
      a: 'O NPPAvalia oferece um editor de relatórios que facilita a organização das informações coletadas durante a avaliação. O conteúdo clínico do relatório — análise, interpretação e conclusão — é sempre elaborado pelo profissional responsável.',
    },
    {
      q: 'Os dados usados nas demonstrações são reais?',
      a: 'Não. Todos os dados exibidos nas telas de demonstração são completamente fictícios, criados apenas para fins ilustrativos. Nenhum dado real de paciente é utilizado nas demonstrações da plataforma.',
    },
    {
      q: 'Preciso assinar para acessar os testes?',
      a: 'Alguns recursos avançados, incluindo o acesso completo à área de testes psicopedagógicos, requerem um plano ativo. Você pode se cadastrar gratuitamente e verificar os detalhes de acesso dentro da plataforma.',
    },
    {
      q: 'Quais profissionais podem usar a plataforma?',
      a: 'O NPPAvalia é indicado para psicopedagogos clínicos, neuropsicopedagogos, profissionais de educação especial e clínicas que realizam avaliações psicopedagógicas e precisam de uma ferramenta para organizar registros, testes e relatórios.',
    },
  ];

  const screenshotTabs = [
    { label: 'Dashboard', img: DEMO_IMAGES.dashboard, alt: 'Dashboard da plataforma NPPAvalia com indicadores fictícios de pacientes e avaliações' },
    { label: 'Pacientes', img: DEMO_IMAGES.pacientes, alt: 'Tela de cadastro de pacientes com informações demonstrativas' },
    { label: 'Prontuário', img: DEMO_IMAGES.prontuario, alt: 'Tela de prontuário psicopedagógico com dados fictícios' },
    { label: 'Anamnese', img: DEMO_IMAGES.anamnese, alt: 'Tela de anamnese psicopedagógica com dados fictícios' },
    { label: 'Rel. Professor', img: DEMO_IMAGES.relatorio, alt: 'Tela de relatório do professor com exemplo fictício' },
    { label: 'Testes', img: DEMO_IMAGES.testes, alt: 'Tela de testes psicopedagógicos disponíveis na plataforma NPPAvalia' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Box>
      <PageMeta
        title="NPPAvalia | Plataforma para Avaliação Psicopedagógica"
        description="Organize pacientes, anamneses, prontuários, testes e relatórios psicopedagógicos em uma plataforma criada para a rotina de psicopedagogos e neuropsicopedagogos."
      />
      <StructuredData data={structuredData} />

      <header>
        <PublicNavbar />
      </header>

      <main>
        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        <Box
          component="section"
          id="inicio"
          aria-label="Apresentação da plataforma NPPAvalia"
          sx={{
            pt: { xs: 14, md: 18 },
            pb: { xs: 8, md: 12 },
            background: 'linear-gradient(160deg, #EFF6FF 0%, #F0FDFA 60%, #FAFFFE 100%)',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={3}>
                  <Chip
                    label="Para psicopedagogos e neuropsicopedagogos"
                    size="small"
                    sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700, fontSize: '0.7rem', letterSpacing: 0.5, width: 'fit-content' }}
                  />
                  <Typography
                    component="h1"
                    variant="h2"
                    fontWeight={800}
                    sx={{ fontSize: { xs: '1.9rem', md: '2.8rem' }, lineHeight: 1.15, color: 'text.primary' }}
                  >
                    Plataforma para{' '}
                    <Box component="span" sx={{ color: 'primary.main' }}>
                      Avaliação Psicopedagógica,
                    </Box>{' '}
                    Prontuários e Relatórios
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1.7, fontWeight: 400 }}>
                    Organize pacientes, anamneses, testes, prontuários e relatórios em um só lugar,
                    com mais agilidade e segurança para a rotina psicopedagógica.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowRight size={18} />}
                      onClick={() => navigate('/signup')}
                      sx={{ px: 4, py: 1.5, fontWeight: 700, textTransform: 'none', fontSize: '1rem', borderRadius: 2 }}
                    >
                      Começar agora
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => document.getElementById('recursos')?.scrollIntoView({ behavior: 'smooth' })}
                      sx={{ px: 4, py: 1.5, fontWeight: 600, textTransform: 'none', fontSize: '1rem', borderRadius: 2 }}
                    >
                      Conhecer recursos
                    </Button>
                  </Stack>
                  <Stack direction="row" spacing={3} sx={{ pt: 1 }}>
                    {['Gratuito para começar', 'Conformidade com LGPD', 'Dados seguros'].map((t) => (
                      <Stack key={t} direction="row" alignItems="center" spacing={0.5}>
                        <CheckCircle size={14} color="#10B981" />
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>{t}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 24px 48px -12px rgba(0,0,0,0.18)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    bgcolor: 'background.paper',
                  }}
                >
                  {/* Browser chrome bar */}
                  <Box sx={{ px: 2, py: 1, bgcolor: 'grey.100', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    {['#EF4444', '#F59E0B', '#10B981'].map((c) => (
                      <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c }} />
                    ))}
                    <Box sx={{ ml: 1, flex: 1, bgcolor: 'white', borderRadius: 1, px: 2, py: 0.4, fontSize: '0.75rem', color: 'text.disabled', border: '1px solid', borderColor: 'divider' }}>
                      nppavalia.com.br/app/dashboard
                    </Box>
                  </Box>
                  <img
                    src={DEMO_IMAGES.dashboard}
                    alt="Dashboard da plataforma NPPAvalia com indicadores fictícios de pacientes e avaliações"
                    width={800}
                    height={500}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ── 2. O QUE É ───────────────────────────────────────────────────── */}
        <Box
          component="section"
          id="o-que-e"
          aria-label="O que é o NPPAvalia"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}
        >
          <Container maxWidth="md">
            <Stack spacing={4} alignItems="center" textAlign="center">
              <SectionLabel>O que é o NPPAvalia</SectionLabel>
              <SectionHeading>Uma plataforma criada para apoiar a rotina de avaliação psicopedagógica</SectionHeading>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 720 }}>
                O <strong>NPPAvalia</strong> é um sistema de gestão clínica desenvolvido para psicopedagogos e neuropsicopedagogos.
                Ele centraliza informações de pacientes, anamneses, prontuários psicopedagógicos, testes psicopedagógicos e relatórios psicopedagógicos
                em um único ambiente digital — organizado, seguro e acessível.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 720 }}>
                A plataforma <strong>não realiza diagnóstico</strong> e <strong>não substitui o profissional</strong>.
                Ela apoia a organização e o registro de informações, a correção de alguns testes quando permitido, e a estruturação
                de dados para que o psicopedagogo possa elaborar relatórios e devolutivas com mais clareza e agilidade.
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2, textAlign: 'left' }} justifyContent="center">
                {[
                  'Avaliação psicopedagógica estruturada',
                  'Prontuário psicopedagógico digital',
                  'Gestão de pacientes centralizada',
                  'Testes psicopedagógicos integrados',
                  'Anamnese digital com link de acesso',
                  'Relatórios psicopedagógicos organizados',
                ].map((item) => (
                  <Grid key={item} size={{ xs: 12, sm: 6 }}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <CheckCircle size={18} color="#3B82F6" style={{ marginTop: 2, flexShrink: 0 }} />
                      <Typography variant="body2" fontWeight={500}>{item}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/plataforma')}
                sx={{ mt: 2, textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
              >
                Saiba mais sobre a plataforma
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* ── 3. PARA QUEM É ───────────────────────────────────────────────── */}
        <Box
          component="section"
          id="para-quem"
          aria-label="Para quem é o NPPAvalia"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}
        >
          <Container maxWidth="lg">
            <Stack spacing={6}>
              <Stack spacing={2} textAlign="center" alignItems="center">
                <SectionLabel>Para quem é</SectionLabel>
                <SectionHeading>Feito para psicopedagógos e neuropsicopedagogos</SectionHeading>
                <Typography color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.7 }}>
                  A plataforma foi desenvolvida com foco nas necessidades reais de quem realiza avaliações
                  psicopedagógicas e precisa de organização clínica no dia a dia.
                </Typography>
              </Stack>
              <Grid container spacing={3}>
                {targetAudience.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card
                        sx={{
                          height: '100%',
                          borderRadius: 3,
                          border: '1px solid',
                          borderColor: 'divider',
                          boxShadow: 'none',
                          transition: 'all 0.25s',
                          '&:hover': { boxShadow: 4, borderColor: 'primary.light', transform: 'translateY(-4px)' },
                        }}
                      >
                        <CardContent sx={{ p: 3.5 }}>
                          <Box
                            sx={{
                              width: 52,
                              height: 52,
                              borderRadius: 2,
                              bgcolor: 'primary.main',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 2.5,
                            }}
                          >
                            <Icon size={26} color="white" />
                          </Box>
                          <Typography component="h3" variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Stack>
          </Container>
        </Box>

        {/* ── 4. PRINCIPAIS RECURSOS ───────────────────────────────────────── */}
        <Box
          component="section"
          id="recursos"
          aria-label="Principais recursos da plataforma"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}
        >
          <Container maxWidth="lg">
            <Stack spacing={6}>
              <Stack spacing={2} textAlign="center" alignItems="center">
                <SectionLabel>Principais recursos</SectionLabel>
                <SectionHeading>Tudo que você precisa em um só lugar</SectionHeading>
                <Typography color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.7 }}>
                  Ferramentas desenvolvidas para apoiar a rotina clínica de psicopedagogos e
                  neuropsicopedagogos, do cadastro do paciente ao relatório final.
                </Typography>
              </Stack>
              <Grid container spacing={3}>
                {resources.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card
                        onClick={() => navigate(item.path)}
                        sx={{
                          height: '100%',
                          borderRadius: 3,
                          border: '1px solid',
                          borderColor: 'divider',
                          boxShadow: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.25s',
                          '&:hover': { boxShadow: 3, borderColor: 'primary.main', transform: 'translateY(-3px)' },
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
                            }}
                          >
                            <Icon size={22} color="white" />
                          </Box>
                          <Typography component="h3" variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Stack>
          </Container>
        </Box>

        {/* ── 5. COMO FUNCIONA ─────────────────────────────────────────────── */}
        <Box
          component="section"
          id="como-funciona"
          aria-label="Como funciona o NPPAvalia"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}
        >
          <Container maxWidth="lg">
            <Stack spacing={6}>
              <Stack spacing={2} textAlign="center" alignItems="center">
                <SectionLabel>Como funciona</SectionLabel>
                <SectionHeading>Da anamnese ao relatório, passo a passo</SectionHeading>
                <Typography color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.7 }}>
                  Um fluxo simples e organizado para apoiar todo o processo de avaliação psicopedagógica.
                </Typography>
              </Stack>
              <Grid container spacing={3}>
                {steps.map((step, i) => (
                  <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box
                      sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        p: 3.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: 4,
                          height: '100%',
                          bgcolor: 'primary.main',
                          borderRadius: '3px 0 0 3px',
                        },
                      }}
                    >
                      <Typography
                        sx={{ fontSize: '2rem', fontWeight: 800, color: 'primary.main', opacity: 0.15, lineHeight: 1, mb: 1.5 }}
                      >
                        {step.num}
                      </Typography>
                      <Typography component="h3" variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {step.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Container>
        </Box>

        {/* ── 6. SCREENSHOTS ───────────────────────────────────────────────── */}
        <Box
          component="section"
          id="screenshots"
          aria-label="Screenshots da plataforma NPPAvalia"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}
        >
          <Container maxWidth="lg">
            <Stack spacing={5}>
              <Stack spacing={2} textAlign="center" alignItems="center">
                <SectionLabel>Veja a plataforma</SectionLabel>
                <SectionHeading>Conheça a interface da plataforma</SectionHeading>
                <Typography color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.7 }}>
                  Todas as telas abaixo utilizam dados <strong>100% fictícios</strong>, criados apenas para demonstração. Nenhum dado real de paciente é exibido.
                </Typography>
              </Stack>
              <Box>
                <Tabs
                  value={screenshotTab}
                  onChange={(_, v) => setScreenshotTab(v)}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    mb: 3,
                    '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 },
                    '& .MuiTabs-indicator': { height: 3, borderRadius: 2 },
                  }}
                >
                  {screenshotTabs.map((t) => (
                    <Tab key={t.label} label={t.label} />
                  ))}
                </Tabs>
                {screenshotTabs.map((t, i) => (
                  <Box
                    key={t.label}
                    role="tabpanel"
                    hidden={screenshotTab !== i}
                    id={`screenshot-panel-${i}`}
                    aria-labelledby={`screenshot-tab-${i}`}
                  >
                    {screenshotTab === i && (
                      <Box
                        sx={{
                          borderRadius: 3,
                          overflow: 'hidden',
                          border: '1px solid',
                          borderColor: 'divider',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        }}
                      >
                        <Box sx={{ px: 2, py: 1, bgcolor: 'grey.100', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          {['#EF4444', '#F59E0B', '#10B981'].map((c) => (
                            <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c }} />
                          ))}
                          <Box sx={{ ml: 1, flex: 1, bgcolor: 'white', borderRadius: 1, px: 2, py: 0.4, fontSize: '0.75rem', color: 'text.disabled', border: '1px solid', borderColor: 'divider' }}>
                            nppavalia.com.br — dados fictícios para demonstração
                          </Box>
                        </Box>
                        <img
                          src={t.img}
                          alt={t.alt}
                          loading="lazy"
                          width={1280}
                          height={720}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Stack>
          </Container>
        </Box>

        {/* ── 7. BENEFÍCIOS ────────────────────────────────────────────────── */}
        <Box
          component="section"
          id="beneficios"
          aria-label="Benefícios do NPPAvalia"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}
        >
          <Container maxWidth="lg">
            <Stack spacing={6}>
              <Stack spacing={2} textAlign="center" alignItems="center">
                <SectionLabel>Benefícios</SectionLabel>
                <SectionHeading>Mais organização para a rotina psicopedagógica</SectionHeading>
                <Typography color="text.secondary" sx={{ maxWidth: 580, lineHeight: 1.7 }}>
                  O NPPAvalia foi pensado para reduzir a carga administrativa e apoiar a organização clínica, deixando mais espaço para o trabalho técnico do profissional.
                </Typography>
              </Stack>
              <Grid container spacing={3}>
                {benefits.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Box
                        sx={{
                          bgcolor: 'background.paper',
                          borderRadius: 3,
                          p: 3.5,
                          border: '1px solid',
                          borderColor: 'divider',
                          height: '100%',
                          transition: 'all 0.2s',
                          '&:hover': { boxShadow: 2, borderColor: 'primary.light' },
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                          }}
                        >
                          <Icon size={24} color="white" />
                        </Box>
                        <Typography component="h3" variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                          {item.desc}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Stack>
          </Container>
        </Box>

        {/* ── 8. CONFIANÇA ─────────────────────────────────────────────────── */}
        <Box
          component="section"
          id="confianca"
          aria-label="Compromisso e cuidados da plataforma NPPAvalia"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: 'primary.main', color: 'white' }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <SectionLabel>Nossa abordagem</SectionLabel>
                <Typography
                  component="h2"
                  variant="h3"
                  fontWeight={700}
                  sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, lineHeight: 1.25, mb: 3, color: 'white' }}
                >
                  Uma plataforma com foco no trabalho técnico do psicopedagogo
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, mb: 3 }}>
                  O NPPAvalia foi desenvolvido com atenção ao rigor técnico da prática psicopedagógica.
                  Nossa missão é apoiar o trabalho do profissional — nunca substituí-lo.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 4,
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                  endIcon={<ArrowRight size={18} />}
                >
                  Criar conta gratuita
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2.5}>
                  {[
                    { icon: ShieldCheck, title: 'Dados organizados e protegidos', desc: 'Ambiente profissional com atenção à segurança e conformidade com a LGPD.' },
                    { icon: BookOpen, title: 'Apoio ao trabalho técnico', desc: 'A plataforma organiza registros e apoia o processo — o julgamento clínico é sempre do profissional.' },
                    { icon: Brain, title: 'Sem substituir a análise clínica', desc: 'Nenhum resultado gerado pela plataforma substitui a avaliação, análise ou conclusão do psicopedagogo.' },
                    { icon: FileText, title: 'Sem conteúdo protegido exposto', desc: 'A plataforma não expõe materiais, tabelas ou critérios de correção restritos dos instrumentos utilizados.' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Box
                        key={item.title}
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.12)',
                          backdropFilter: 'blur(4px)',
                          borderRadius: 2,
                          p: 2.5,
                          border: '1px solid rgba(255,255,255,0.2)',
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Icon size={22} color="white" style={{ flexShrink: 0, marginTop: 2 }} />
                          <Box>
                            <Typography fontWeight={700} sx={{ mb: 0.5, color: 'white' }}>{item.title}</Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{item.desc}</Typography>
                          </Box>
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ── 9. FAQ ───────────────────────────────────────────────────────── */}
        <Box
          component="section"
          id="faq"
          aria-label="Perguntas frequentes sobre o NPPAvalia"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}
        >
          <Container maxWidth="md">
            <Stack spacing={5}>
              <Stack spacing={2} textAlign="center" alignItems="center">
                <SectionLabel>Perguntas frequentes</SectionLabel>
                <SectionHeading>Dúvidas comuns sobre o NPPAvalia</SectionHeading>
              </Stack>
              <Box>
                {faqs.map((faq, i) => (
                  <Accordion
                    key={i}
                    expanded={expandedFaq === `faq-${i}`}
                    onChange={handleFaqChange(`faq-${i}`)}
                    disableGutters
                    elevation={0}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '12px !important',
                      mb: 1.5,
                      '&::before': { display: 'none' },
                      '&.Mui-expanded': { borderColor: 'primary.main' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ChevronDown size={20} />}
                      sx={{ px: 3, py: 1, '& .MuiAccordionSummary-content': { my: 1.5 } }}
                    >
                      <Typography fontWeight={600} sx={{ fontSize: '0.95rem' }}>
                        {faq.q}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 3, pb: 2.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        {faq.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Stack>
          </Container>
        </Box>

        {/* ── 10. CTA FINAL ────────────────────────────────────────────────── */}
        <Box
          component="section"
          id="cta-final"
          aria-label="Chamada final para cadastro"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                textAlign: 'center',
                bgcolor: 'background.paper',
                borderRadius: 4,
                p: { xs: 5, md: 8 },
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 8px 40px rgba(59,130,246,0.08)',
              }}
            >
              <Typography
                component="h2"
                variant="h3"
                fontWeight={800}
                sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, lineHeight: 1.3, mb: 2 }}
              >
                Organize sua rotina psicopedagógica em uma plataforma feita para avaliações, pacientes e relatórios.
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.05rem', lineHeight: 1.7 }}>
                Crie sua conta gratuitamente e conheça os recursos disponíveis para psicopedagogos e neuropsicopedagogos.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight size={18} />}
                  onClick={() => navigate('/signup')}
                  sx={{ px: 5, py: 1.5, fontWeight: 700, textTransform: 'none', fontSize: '1rem', borderRadius: 2 }}
                >
                  Criar conta
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/plataforma')}
                  sx={{ px: 5, py: 1.5, fontWeight: 600, textTransform: 'none', fontSize: '1rem', borderRadius: 2 }}
                >
                  Ver recursos da plataforma
                </Button>
              </Stack>
            </Box>
          </Container>
        </Box>
      </main>

      <PublicFooter />
    </Box>
  );
}
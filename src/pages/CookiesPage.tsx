import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import AnimatedSection from '@/components/AnimatedSection';
import { Typography, Box, Container, Stack, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Cookie } from 'lucide-react';

export default function CookiesPage() {


  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header><PublicNavbar /></header>

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 14, md: 18 },
          pb: { xs: 8, md: 10 },
          background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDFA 100%)',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={2} alignItems="center">
            <AnimatedSection animation="fadeUp" delay={0}>
              <Box sx={{ color: 'primary.main', display: 'flex', justifyContent: 'center' }}>
                <Cookie size={48} />
              </Box>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={150}>
              <Typography
                variant="h2"
                fontWeight={800}
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  lineHeight: 1.2,
                  mb: 1
                }}
              >
                Política de Cookies
              </Typography>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={300}>
              <Typography variant="body1" color="text.secondary">
                Última atualização: 27 de maio de 2026.
              </Typography>
            </AnimatedSection>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 8, flexGrow: 1 }}>
        <AnimatedSection animation="fadeUp" delay={100}>
        <Stack spacing={4} sx={{ fontSize: '1rem', lineHeight: 1.7, color: 'text.secondary' }}>
          <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
            Esta Política de Cookies explica o que são cookies, como o <strong>NPPAvalia</strong> os utiliza e como você pode gerenciar suas preferências em nosso site e aplicação.
          </Typography>

          <Divider />

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              1. O que são Cookies?
            </Typography>
            <Typography variant="body1">
              Cookies são pequenos arquivos de texto criados pelo site visitado e salvos no computador ou dispositivo móvel do usuário, através do navegador de internet. Esses arquivos contêm informações que auxiliam na identificação do usuário, na personalização da sua navegação e no funcionamento técnico seguro de aplicações autenticadas.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              2. Como Utilizamos Cookies?
            </Typography>
            <Typography variant="body1">
              Utilizamos cookies estritamente necessários para permitir que você faça login em sua conta, navegue pelas páginas privadas com segurança e proteja o sistema contra fraudes (como ataques CSRF). Também podemos utilizar cookies de desempenho analítico (como estatísticas de carregamento de página do Vercel Speed Insights) para mensurar o tempo de carregamento e estabilidade do sistema.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              3. Tipos de Cookies Coletados
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
              <Table>
                <TableHead sx={{ bgcolor: 'grey.50' }}>
                  <TableRow>
                    <TableCell><strong>Categoria</strong></TableCell>
                    <TableCell><strong>Finalidade</strong></TableCell>
                    <TableCell><strong>Duração</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Estritamente Necessários (Sessão e Autenticação)</strong></TableCell>
                    <TableCell>Armazenam o token de autenticação JWT e informações de login para que você permaneça conectado com segurança enquanto navega pelas rotas da aplicação.</TableCell>
                    <TableCell>Expira ao fechar o navegador ou ao fazer logout.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Segurança (Prevenção de Fraudes)</strong></TableCell>
                    <TableCell>Proteção de sessões do usuário e prevenção de ataques cibernéticos a formulários de dados clínicos.</TableCell>
                    <TableCell>Persistente / Sessão.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Desempenho e Diagnóstico (Opcionais)</strong></TableCell>
                    <TableCell>Coleta estatísticas anônimas de tempo de resposta do servidor e velocidade de renderização da página (Vercel Speed Insights).</TableCell>
                    <TableCell>Persistente.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              4. Consentimento e Controle de Cookies
            </Typography>
            <Typography variant="body1">
              Ao acessar o NPPAvalia pela primeira vez, você é notificado sobre o uso de cookies.
              Os cookies estritamente necessários são ativados automaticamente por serem indispensáveis para a
              execução segura da plataforma de saúde. Caso você não concorde com a ativação de cookies de
              sessão necessários, infelizmente não será possível utilizar a área logada do sistema.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              5. Como Desativar os Cookies no Navegador
            </Typography>
            <Typography variant="body1">
              Você pode, a qualquer momento, desativar, bloquear ou excluir cookies diretamente nas configurações
              do seu navegador de preferência. Siga os links oficiais de ajuda de cada navegador:
            </Typography>
            <Typography variant="body2" component="div" sx={{ mt: 1 }}>
              <ul>
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                <li><a href="https://support.microsoft.com/pt-br/windows/gerenciar-e-excluir-cookies" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
                <li><a href="https://support.mozilla.org/pt-BR/kb/gerencie-configuracoes-de-armazenamento-local-de-sites" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
              </ul>
            </Typography>
          </Box>
        </Stack>
        </AnimatedSection>
      </Container>

      <PublicFooter />
    </Box>
  );
}

import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, Container, Stack, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { HeartPulse, ArrowLeft, Cookie } from 'lucide-react';

export default function CookiesPage() {
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
              NPPAvalia
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
          pb: { xs: 6, md: 8 },
          background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDFA 100%)',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={2} alignItems="center">
            <Box sx={{ color: 'primary.main', display: 'flex', justifyContent: 'center' }}>
              <Cookie size={48} />
            </Box>
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
            <Typography variant="body1" color="text.secondary">
              Última atualização: 27 de maio de 2026.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 8, flexGrow: 1 }}>
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
                NPPAvalia
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © {new Date().getFullYear()} NPPAvalia. Todos os direitos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

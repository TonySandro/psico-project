import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, Container, Stack, Divider } from '@mui/material';
import { HeartPulse, ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
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
          pb: { xs: 6, md: 8 },
          background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDFA 100%)',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={2} alignItems="center">
            <Box sx={{ color: 'primary.main', display: 'flex', justifyContent: 'center' }}>
              <FileText size={48} />
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
              Termos de Uso
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
            Bem-vindo ao <strong>NeuroPPAvalia</strong>. Ao se cadastrar e utilizar a nossa plataforma, você concorda expressamente com os seguintes Termos de Uso. Leia-os atentamente antes de prosseguir com a utilização dos nossos serviços.
          </Typography>

          <Divider />

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              1. Escopo e Objeto do Serviço
            </Typography>
            <Typography variant="body1">
              O NeuroPPAvalia é um software em nuvem (SaaS) projetado especificamente como ferramenta de apoio a profissionais das áreas de Psicopedagogia, Neuropsicopedagogia, Psicologia e Educação. A plataforma disponibiliza recursos para o cadastro de pacientes, preenchimento de anamneses, automatização de cálculos de testes padronizados e estruturação de relatórios clínicos.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              2. Isenção de Responsabilidade e Atuação Clínica (Cláusula YMYL)
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}>
              IMPORTANTE: O NeuroPPAvalia não emite diagnósticos clínicos e não substitui de nenhuma forma o julgamento profissional.
            </Typography>
            <Typography variant="body1">
              Nossa plataforma atua única e exclusivamente como um <strong>auxiliar técnico</strong> para a organização e agilização dos processos de triagem e preenchimento de documentos. Todos os laudos, relatórios, diagnósticos e encaminhamentos gerados com o auxílio do software são de <strong>inteira, exclusiva e intransferível responsabilidade do profissional de saúde/educação registrado</strong> que operou o sistema.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              3. Cadastro de Usuários e Requisitos de Habilitação
            </Typography>
            <Typography variant="body1">
              Para utilizar o NeuroPPAvalia, o usuário declara e garante que possui a habilitação técnica e legal necessária para o exercício profissional da psicopedagogia, neuropsicopedagogia ou especialidade médica/educativa equivalente no Brasil. O usuário é inteiramente responsável por manter o sigilo de sua senha de acesso e de seu e-mail cadastrado, respondendo por toda atividade realizada em sua conta.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              4. Propriedade Intelectual
            </Typography>
            <Typography variant="body1">
              Todo o código-fonte, design visual, logotipos, layouts, ferramentas de cálculo automatizado de testes e bancos de dados do NeuroPPAvalia pertencem exclusivamente aos fundadores e desenvolvedores da plataforma. É estritamente proibido realizar engenharia reversa, cópia ou distribuição do material proprietário sem autorização prévia por escrito.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              5. Armazenamento e Disponibilidade
            </Typography>
            <Typography variant="body1">
              Buscamos manter a plataforma disponível 24 horas por dia, 7 dias por semana, com altos padrões de segurança. Contudo, em virtude de manutenções preventivas, atualizações ou interrupções decorrentes de falhas em serviços de infraestrutura terceiros (como servidores em nuvem), o sistema poderá apresentar instabilidade momentânea. Recomendamos que o profissional mantenha cópia exportada dos seus relatórios finalizados.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              6. Rescisão e Exclusão da Conta
            </Typography>
            <Typography variant="body1">
              O profissional pode cancelar sua assinatura e solicitar a exclusão de sua conta a qualquer momento. Em cumprimento à LGPD, a exclusão da conta resultará na eliminação definitiva e irreversível de todos os dados de pacientes vinculados àquele profissional em nossos bancos de dados ativos após o período legal de retenção financeira ou contábil necessário.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              7. Foro de Eleição
            </Typography>
            <Typography variant="body1">
              Para dirimir quaisquer controvérsias decorrentes destes Termos de Uso, as partes elegem o foro da Comarca do domicílio dos fundadores da plataforma, com renúncia expressa a qualquer outro.
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

import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import AnimatedSection from '@/components/AnimatedSection';
import { Typography, Box, Container, Stack, Divider } from '@mui/material';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {


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
                <Shield size={48} />
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
                Política de Privacidade
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
            A sua privacidade é de extrema importância para nós do <strong>NPPAvalia</strong>. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações pessoais e dados de saúde sensíveis dos profissionais de psicopedagogia/neuropsicopedagogia e de seus respectivos pacientes, em conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong>.
          </Typography>

          <Divider />

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              1. Definições Importantes sob a LGPD
            </Typography>
            <Typography variant="body2" component="div">
              <ul>
                <li><strong>Controlador:</strong> O profissional de psicopedagogia/neuropsicopedagogia que assina o serviço e insere os dados de seus pacientes no sistema, definindo a finalidade do tratamento.</li>
                <li><strong>Operador:</strong> O NPPAvalia, que realiza o tratamento de dados pessoais sob as instruções e em nome do Controlador.</li>
                <li><strong>Titular de Dados:</strong> O profissional (usuário do sistema) e seus pacientes (cujas informações clínicas são inseridas na plataforma).</li>
                <li><strong>Dados Sensíveis:</strong> Dados de saúde, anamneses, diagnósticos e resultados de testes neuropsicopedagógicos dos pacientes (Artigo 5º, II da LGPD).</li>
              </ul>
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              2. Dados Coletados
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Coletamos dados em duas frentes distintas:
            </Typography>
            <Typography variant="body2" component="div">
              <ol>
                <li><strong>Dados do Profissional (Controlador):</strong> Nome completo, e-mail, senha criptografada, telefone, registro profissional (ex: CBO, CPF ou CNPJ) e dados de cobrança.</li>
                <li><strong>Dados do Paciente (inseridos pelo Profissional):</strong> Nome, data de nascimento, nome dos responsáveis (para menores), histórico escolar, histórico de saúde familiar, queixas clínicas, anamneses estruturadas, respostas a testes (como CARS, Stroop, ATA, SNAP, Token Test, AQ-10) e laudos de evolução.</li>
              </ol>
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              3. Finalidade do Tratamento de Dados
            </Typography>
            <Typography variant="body1">
              Todos os dados pessoais sensíveis inseridos no NPPAvalia são utilizados exclusivamente para:
            </Typography>
            <Typography variant="body2" component="div">
              <ul>
                <li>Viabilizar a gestão clínica do profissional (agenda, fichas cadastrais).</li>
                <li>Automatizar e calcular correções de testes psicopedagógicos.</li>
                <li>Estruturar relatórios e laudos clínicos.</li>
                <li>Garantir a segurança e integridade das informações clínicas e backups.</li>
              </ul>
              Nós <strong>nunca</strong> compartilhamos, vendemos ou utilizamos os dados dos pacientes para fins de publicidade, marketing ou pesquisa comercial própria.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              4. Consentimento e Legalidade
            </Typography>
            <Typography variant="body1">
              É responsabilidade legal exclusiva do profissional (Controlador) obter o consentimento livre, expresso e informado dos pacientes ou de seus responsáveis legais (no caso de crianças e adolescentes) para o tratamento de dados de saúde sensíveis inseridos na plataforma, nos termos do Artigo 11 e Artigo 14 da LGPD. O NPPAvalia fornece modelos de Termos de Consentimento que podem ser assinados fisicamente ou digitalmente pelos responsáveis.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              5. Segurança da Informação
            </Typography>
            <Typography variant="body1">
              Adotamos medidas técnicas, administrativas e organizacionais rígidas para proteger os dados armazenados:
            </Typography>
            <Typography variant="body2" component="div">
              <ul>
                <li>Criptografia de dados sensíveis em trânsito (HTTPS/TLS) e criptografia em repouso nos bancos de dados.</li>
                <li>Controles de acesso rígidos: apenas o profissional que cadastrou o paciente tem acesso aos seus respectivos dados de saúde.</li>
                <li>Backups periódicos automáticos e blindagem contra invasões.</li>
                <li>Rastreabilidade de logs de acesso de auditoria.</li>
              </ul>
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              6. Direitos dos Titulares de Dados (Artigo 18 da LGPD)
            </Typography>
            <Typography variant="body1">
              Os pacientes (ou seus responsáveis) podem exercer seus direitos de confirmação de existência de tratamento, acesso, correção de dados incompletos ou eliminação diretamente junto ao profissional de saúde (Controlador). O NPPAvalia dispõe de mecanismos internos para que o profissional exporte, edite ou exclua permanentemente os prontuários de forma imediata.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
              7. Contato e Encarregado de Proteção de Dados (DPO)
            </Typography>
            <Typography variant="body1">
              Para esclarecer dúvidas sobre esta Política de Privacidade ou sobre as práticas de proteção de dados do NPPAvalia, entre em contato com nosso Encarregado pelo e-mail: <strong>suporte@nppavalia.com.br</strong>.
            </Typography>
          </Box>
        </Stack>
        </AnimatedSection>
      </Container>

      <PublicFooter />
    </Box>
  );
}

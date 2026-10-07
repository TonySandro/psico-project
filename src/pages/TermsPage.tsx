import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import AnimatedSection from '@/components/AnimatedSection';
import PageMeta from '@/components/PageMeta';
import StructuredData from '@/components/StructuredData';
import {
  Typography,
  Box,
  Container,
  Stack,
  Alert,
  Paper,
} from '@mui/material';
import {
  FileText,
  ShieldAlert,
  Scale,
  Lock,
  UserCheck,
  CreditCard,
  AlertTriangle,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

const structuredDataTerms = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': 'Termos e Condições de Uso — NPPAvalia',
  'description': 'Termos e condições gerais de uso e conformidade com a LGPD da plataforma clínica NPPAvalia.',
  'url': 'https://nppavalia.com.br/termos-de-uso',
  'publisher': {
    '@type': 'Organization',
    'name': 'NPPAvalia',
    'url': 'https://nppavalia.com.br',
  },
};

export default function TermsPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC' }}>
      <PageMeta
        title="Termos e Condições de Uso | NPPAvalia"
        description="Termos e Condições Gerais de Uso da plataforma NPPAvalia. Regras de utilização, conformidade com a LGPD (Lei 13.709/2018), responsabilidade clínica e privacidade."
      />
      <StructuredData data={structuredDataTerms} />

      <header>
        <PublicNavbar />
      </header>

      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          pt: { xs: 14, md: 18 },
          pb: { xs: 8, md: 10 },
          background: 'linear-gradient(135deg, #EEF2FF 0%, #E0F2FE 50%, #F0FDFA 100%)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={2.5} alignItems="center">
            <AnimatedSection animation="fadeUp" delay={0}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 3,
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.25)',
                  mx: 'auto',
                }}
              >
                <FileText size={36} />
              </Box>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={150}>
              <Typography
                variant="h1"
                fontWeight={800}
                sx={{
                  fontSize: { xs: '2.2rem', md: '3.25rem' },
                  letterSpacing: '-0.03em',
                  color: '#0F172A',
                  lineHeight: 1.15,
                }}
              >
                Termos e Condições de Uso
              </Typography>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={250}>
              <Typography
                variant="body1"
                sx={{
                  color: '#475569',
                  maxWidth: 620,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.6,
                }}
              >
                Diretrizes de utilização da plataforma NPPAvalia, direitos, deveres dos profissionais e conformidade estrita com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </Typography>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={350}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 0.75,
                  borderRadius: 999,
                  bgcolor: 'white',
                  border: '1px solid #CBD5E1',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}
              >
                <ShieldCheck size={16} color="#059669" />
                <Typography variant="caption" fontWeight={600} color="#334155">
                  Última atualização: 13 de setembro de 2026 • Versão 2.4
                </Typography>
              </Box>
            </AnimatedSection>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, flexGrow: 1 }}>
        <AnimatedSection animation="fadeUp" delay={100}>
          <Stack spacing={5} sx={{ color: '#334155', fontSize: '1.025rem', lineHeight: 1.8 }}>

            {/* Cláusula de Destaque YMYL */}
            <Alert
              severity="warning"
              icon={<ShieldAlert size={28} color="#D97706" />}
              sx={{
                borderRadius: 3,
                p: 2.5,
                bgcolor: '#FFFBEB',
                border: '1px solid #FDE68A',
                '& .MuiAlert-message': { width: '100%' },
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} color="#92400E" sx={{ mb: 0.5 }}>
                Aviso Essencial ao Profissional (Isenção de Responsabilidade Diagnóstica)
              </Typography>
              <Typography variant="body2" color="#78350F" sx={{ lineHeight: 1.65 }}>
                O <strong>NPPAvalia</strong> é um software de apoio técnico e organização documental para a rotina de psicopedagogos, neuropsicopedagogos, psicólogos e educadores. <strong>A plataforma NÃO realiza diagnósticos clínicos, NÃO prescreve intervenções e NÃO substitui o exame presencial e o julgamento técnico soberano do profissional habilitado.</strong> Todos os relatórios, laudos e conclusões emitidos com o auxílio da ferramenta são de exclusiva e indelegável responsabilidade técnica do profissional usuário.
              </Typography>
            </Alert>

            {/* Seção 1 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ color: 'primary.main', display: 'flex' }}><Scale size={24} /></Box>
                <Typography variant="h5" fontWeight={700} color="#0F172A">
                  1. Apresentação e Aceitação dos Termos
                </Typography>
              </Stack>
              <Typography variant="body1" paragraph>
                Estes Termos e Condições Gerais de Uso (&quot;Termos&quot;) regem o acesso e a utilização dos serviços disponibilizados pela plataforma <strong>NPPAvalia</strong> (&quot;Plataforma&quot;, &quot;nós&quot; ou &quot;nosso&quot;), acessível por meio do domínio <strong>nppavalia.com.br</strong> e seus subdomínios associados.
              </Typography>
              <Typography variant="body1" paragraph>
                Ao criar uma conta, clicar na caixa de seleção (&quot;Li e concordo com os Termos e Condições&quot;) ou de qualquer forma utilizar os recursos da Plataforma, você declara ter lido, compreendido e aceito integral e expressamente as disposições aqui estabelecidas, bem como nossa{' '}
                <a href="/politica-de-privacidade" className="text-blue-600 font-semibold hover:underline">
                  Política de Privacidade
                </a>{' '}
                e{' '}
                <a href="/politica-de-cookies" className="text-blue-600 font-semibold hover:underline">
                  Política de Cookies
                </a>.
              </Typography>
              <Typography variant="body1">
                Caso você discorde de qualquer condição disposta nestes Termos, solicitamos que não finalize seu cadastro e interrompa imediatamente o uso da Plataforma.
              </Typography>
            </Paper>

            {/* Seção 2 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Typography variant="h5" fontWeight={700} color="#0F172A" sx={{ mb: 2 }}>
                2. Definições Aplicáveis
              </Typography>
              <Typography variant="body1" paragraph>
                Para a exata compreensão destes Termos e de acordo com a legislação brasileira (notadamente a Lei nº 13.709/2018 - LGPD e Lei nº 12.965/2014 - Marco Civil da Internet), adotam-se as seguintes definições:
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, '& li': { mb: 1.5 } }}>
                <li>
                  <strong>Plataforma (SaaS):</strong> O ambiente tecnológico em nuvem mantido pelo NPPAvalia, composto por softwares, módulos de prontuário eletrônico, formulários de anamnese, protocolos de triagem, testes e relatórios.
                </li>
                <li>
                  <strong>Usuário / Profissional:</strong> A pessoa física legalmente habilitada (psicopedagogo, neuropsicopedagogo, psicólogo ou educador especializado) que adere a estes Termos, cria uma conta e utiliza as funcionalidades do sistema na prestação de seus serviços.
                </li>
                <li>
                  <strong>Paciente / Titular do Dado:</strong> A pessoa natural submetida a atendimento, avaliação ou acompanhamento psicopedagógico pelo Usuário, cujos dados pessoais e clínicos são inseridos na Plataforma.
                </li>
                <li>
                  <strong>Responsável Legal:</strong> Pai, mãe, tutor ou curador legal de paciente menor de 18 (dezoito) anos ou incapaz, legitimado a outorgar consentimentos e responder pelo titular.
                </li>
                <li>
                  <strong>Controlador de Dados:</strong> O Profissional Usuário, a quem competem as decisões referentes ao tratamento de dados pessoais de seus pacientes, incluindo a finalidade, a base legal e a pertinência clínica (Art. 5º, VI, LGPD).
                </li>
                <li>
                  <strong>Operador de Dados:</strong> O NPPAvalia, que realiza o tratamento automatizado e seguro de dados pessoais sob as ordens, parâmetros e exclusiva conveniência do Controlador (Art. 5º, VII, LGPD).
                </li>
                <li>
                  <strong>Dados Pessoais Sensíveis:</strong> Dados de saúde, histórico médico-pedagógico, avaliações neuropsicopedagógicas, queixas familiares e resultados de instrumentos clínicos (Art. 5º, II, LGPD).
                </li>
              </Box>
            </Paper>

            {/* Seção 3 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ color: 'primary.main', display: 'flex' }}><UserCheck size={24} /></Box>
                <Typography variant="h5" fontWeight={700} color="#0F172A">
                  3. Elegibilidade, Habilitação Técnica e Cadastro
                </Typography>
              </Stack>
              <Typography variant="body1" paragraph>
                Para contratar e utilizar o NPPAvalia, o Usuário declara e garante sob as penas da lei:
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, '& li': { mb: 1.5 } }}>
                <li>Ser plenamente capaz civilmente (maior de 18 anos);</li>
                <li>
                  Possuir formação, registro profissional ou capacitação legal necessária para o exercício de suas atividades (por exemplo, filiação à Associação Brasileira de Psicopedagogia - ABPp, Sociedade Brasileira de Neuropsicopedagogia - SBNPp, Conselho Regional de Psicologia - CRP, ou conselho de classe equivalente quando aplicável);
                </li>
                <li>Fornecer dados cadastrais verdadeiros, exatos, atuais e completos, mantendo-os devidamente atualizados;</li>
                <li>
                  Guardar com estrito sigilo suas credenciais de acesso (e-mail e senha). <strong>A conta é individual, personalíssima e intransferível.</strong> É terminantemente vedado o compartilhamento de logins entre múltiplos profissionais sem autorização prévia por escrito.
                </li>
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }}>
                O Usuário é o único responsável por qualquer ação realizada a partir de sua conta de acesso. Havendo suspeita ou comprovação de invasão, perda de senha ou uso não autorizado, o Usuário deverá notificar o suporte do NPPAvalia imediatamente por meio do e-mail <strong>suporte@nppavalia.com.br</strong>.
              </Typography>
            </Paper>

            {/* Seção 4 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ color: 'amber.600', display: 'flex' }}><AlertTriangle size={24} /></Box>
                <Typography variant="h5" fontWeight={700} color="#0F172A">
                  4. Escopo do Serviço e Autonomia Clínica do Profissional
                </Typography>
              </Stack>
              <Typography variant="body1" paragraph>
                O NPPAvalia oferece uma suíte de produtividade para atendimento clínico e escolar, compreendendo:
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, mb: 2, '& li': { mb: 1 } }}>
                <li>Gestão de cadastro e prontuários digitais de pacientes;</li>
                <li>Envio de links protegidos para preenchimento de anamnese online por pais e responsáveis;</li>
                <li>Questionários e formulários para coleta de dados pedagógicos junto a professores;</li>
                <li>Protocolos automatizados para cálculo de pontuações, escores e tabelas normativas de triagens e testes;</li>
                <li>Módulo para edição, estruturação, exportação e impressão de laudos, pareceres e relatórios clínicos.</li>
              </Box>
              <Typography variant="body1" paragraph>
                <strong>Isenção e Delimitação Técnica:</strong>
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, '& li': { mb: 1.5 } }}>
                <li>
                  A Plataforma opera exclusivamente como <em>instrumento de cálculo e formatação</em>. Quaisquer sugestões de texto, enquadramentos de percentis ou classificações são meros subsídios matemáticos e estatísticos baseados na literatura científica inserida.
                </li>
                <li>
                  Cabe estrita e exclusivamente ao Profissional a interpretação contextual, a validação de respostas, a entrevista clínica, o diagnóstico diferencial e a tomada de decisão terapêutica ou pedagógica.
                </li>
                <li>
                  O NPPAvalia não se responsabiliza por conclusões errôneas, diagnósticos equivocados, tratamentos prescritos de forma inadequada ou prejuízos decorrentes de atos clínicos praticados pelo Usuário.
                </li>
              </Box>
            </Paper>

            {/* Seção 5 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ color: 'primary.main', display: 'flex' }}><Lock size={24} /></Box>
                <Typography variant="h5" fontWeight={700} color="#0F172A">
                  5. Privacidade, Proteção de Dados e Tratamento sob a LGPD
                </Typography>
              </Stack>
              <Typography variant="body1" paragraph>
                A segurança e a confidencialidade dos dados tratados constituem o pilar central do NPPAvalia. Em observância à <strong>Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018)</strong>, estabelecem-se as seguintes cláusulas contratuais de tratamento de dados:
              </Typography>

              <Typography variant="subtitle1" fontWeight={700} color="#0F172A" sx={{ mt: 2, mb: 1 }}>
                5.1. Repartição de Papéis e Responsabilidades
              </Typography>
              <Typography variant="body1" paragraph>
                O <strong>Profissional Usuário atua como CONTROLADOR</strong> dos dados pessoais e sensíveis inseridos a respeito de seus pacientes e familiares. O <strong>NPPAvalia atua como OPERADOR</strong>, realizando o armazenamento, indexação e processamento computacional estritamente conforme as instruções do Controlador e os limites operacionais da Plataforma.
              </Typography>

              <Typography variant="subtitle1" fontWeight={700} color="#0F172A" sx={{ mt: 2, mb: 1 }}>
                5.2. Dados Pessoais Sensíveis e Menores de Idade (Art. 11 e 14 da LGPD)
              </Typography>
              <Typography variant="body1" paragraph>
                É dever exclusivo e inafastável do Profissional Usuário:
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, mb: 2, '& li': { mb: 1.5 } }}>
                <li>
                  Fundamentar juridicamente o tratamento dos dados de seus pacientes nas bases legais cabíveis da LGPD (especialmente o Art. 11, II, alínea &apos;f&apos; - tutela da saúde por profissionais de saúde, ou Art. 11, I - consentimento expresso e destacado);
                </li>
                <li>
                  No caso de crianças e adolescentes, colher previamente a anuência específica e em destaque de ao menos um dos pais ou responsáveis legais (Art. 14, § 1º da LGPD), disponibilizando-lhes as informações sobre o prontuário eletrônico utilizado;
                </li>
                <li>
                  Zelar pelo dever ético de sigilo profissional estabelecido pelo seu conselho regulamentador ou código de deontologia.
                </li>
              </Box>

              <Typography variant="subtitle1" fontWeight={700} color="#0F172A" sx={{ mt: 2, mb: 1 }}>
                5.3. Medidas Técnicas de Segurança Adotadas pelo NPPAvalia
              </Typography>
              <Typography variant="body1" paragraph>
                Na qualidade de Operador diligente, o NPPAvalia adota medidas robustas de proteção cibernética (Art. 46 da LGPD):
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, mb: 2, '& li': { mb: 1 } }}>
                <li>Criptografia de tráfego de ponta a ponta (HTTPS / TLS);</li>
                <li>Criptografia de dados sensíveis e credenciais em banco de dados;</li>
                <li>Isolamento lógico rigoroso de banco de dados entre contas de profissionais distintos;</li>
                <li>Rotinas periódicas e automatizadas de cópias de segurança (backups);</li>
                <li>Registros de conexão e logs de acesso mantidos sob sigilo, conforme preceitua o Artigo 15 da Lei nº 12.965/2014 (Marco Civil da Internet).</li>
              </Box>

              <Typography variant="subtitle1" fontWeight={700} color="#0F172A" sx={{ mt: 2, mb: 1 }}>
                5.4. Não Comercialização e Não Acesso Indevido aos Prontuários
              </Typography>
              <Typography variant="body1">
                O NPPAvalia <strong>jamais comercializa, repassa, monetiza ou compartilha</strong> dados clínicos de pacientes para terceiros, indústrias, anunciantes ou seguradoras. Nossos colaboradores técnicos somente acessarão conteúdos de prontuários com autorização prévia e expressa do Profissional para fins exclusivos de suporte técnico ou em virtude de ordem judicial fundamentada.
              </Typography>
            </Paper>

            {/* Seção 6 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ color: 'primary.main', display: 'flex' }}><CreditCard size={24} /></Box>
                <Typography variant="h5" fontWeight={700} color="#0F172A">
                  6. Planos de Assinatura, Cobrança e Direito de Arrependimento
                </Typography>
              </Stack>
              <Typography variant="body1" paragraph>
                O acesso contínuo aos recursos da Plataforma é concedido mediante assinatura periódica (modalidade SaaS):
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, mb: 2, '& li': { mb: 1.5 } }}>
                <li>
                  <strong>Planos e Valores:</strong> Os preços, funcionalidades e características de cada modalidade de plano estão informados na página de contratação e no painel do usuário, expressos em Reais (BRL).
                </li>
                <li>
                  <strong>Formas de Pagamento e Processamento:</strong> As cobranças são processadas por instituições parceiras de pagamentos eletrônicos (como Mercado Pago). O NPPAvalia não armazena números de cartões de crédito em seus servidores próprios.
                </li>
                <li>
                  <strong>Renovação Automática:</strong> As assinaturas no modelo recorrente são renovadas automaticamente a cada ciclo faturado (mensal ou anual), a menos que o Usuário efetue o cancelamento antes do encerramento do período vigente.
                </li>
                <li>
                  <strong>Cancelamento Sem Fidelidade:</strong> O Usuário poderá cancelar sua assinatura a qualquer momento através do seu painel. O cancelamento interromperá cobranças subsequentes, permanecendo o acesso liberado até o término do ciclo já quitado.
                </li>
                <li>
                  <strong>Direito de Arrependimento (Art. 49 do CDC):</strong> Na primeira contratação do serviço, o Usuário poderá desistir do contrato no prazo de até 7 (sete) dias corridos a contar da data de contratação, com restituição total e integral dos valores pagos, mediante solicitação formal pelo e-mail <strong>suporte@nppavalia.com.br</strong>.
                </li>
              </Box>
            </Paper>

            {/* Seção 7 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Typography variant="h5" fontWeight={700} color="#0F172A" sx={{ mb: 2 }}>
                7. Regras de Conduta e Uso Aceitável
              </Typography>
              <Typography variant="body1" paragraph>
                Ao utilizar o NPPAvalia, é estritamente proibido ao Usuário:
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, '& li': { mb: 1.5 } }}>
                <li>Realizar engenharia reversa, descompilação, desmontagem ou tentar derivar o código-fonte da Plataforma;</li>
                <li>Utilizar robôs, aranhas (scrapers), scripts automatizados ou mecanismos similares para coletar dados ou sobrecarregar a infraestrutura;</li>
                <li>Introduzir softwares maliciosos, vírus, cavalos de troia ou qualquer código nocivo;</li>
                <li>Inserir dados falsos, caluniosos, ilícitos ou que violem a intimidade de terceiros sem a respectiva autorização legal;</li>
                <li>Sublocar, revender, licenciar ou disponibilizar o sistema a terceiros não autorizados;</li>
                <li>Tentativa de burlar firewalls, autenticação de sessão ou limites de segurança do software.</li>
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }}>
                O descumprimento de qualquer uma dessas obrigações autoriza o NPPAvalia a suspender ou rescindir a conta infratora de imediato, sem direito a qualquer indenização, sem prejuízo das reparações cíveis e criminais aplicáveis.
              </Typography>
            </Paper>

            {/* Seção 8 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Typography variant="h5" fontWeight={700} color="#0F172A" sx={{ mb: 2 }}>
                8. Propriedade Intelectual e Licença de Uso
              </Typography>
              <Typography variant="body1" paragraph>
                Todo o conteúdo da Plataforma — incluindo marca NPPAvalia, logotipos, interface visual, códigos-fonte, algoritmos de cálculo, arquitetura de banco de dados, textos informativos e design — é de titularidade exclusiva do NPPAvalia ou de seus licenciantes, estando protegido pela Lei de Direitos Autorais (Lei nº 9.610/1998) e Lei de Software (Lei nº 9.609/1998).
              </Typography>
              <Typography variant="body1" paragraph>
                A contratação da assinatura outorga ao Usuário uma <strong>licença de uso temporária, revogável, não exclusiva, onerosa e intransferível</strong> para operar o software em sua atividade profissional lícita.
              </Typography>
              <Typography variant="body1">
                <strong>Propriedade dos Dados Clínicos:</strong> O prontuário, as notas clínicas e os relatórios confeccionados pelo Profissional são de propriedade do Profissional e de seus respectivos pacientes, não possuindo o NPPAvalia qualquer direito de propriedade intelectual sobre esses conteúdos particulares.
              </Typography>
            </Paper>

            {/* Seção 9 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Typography variant="h5" fontWeight={700} color="#0F172A" sx={{ mb: 2 }}>
                9. Nível de Serviço (SLA), Disponibilidade e Dever de Backup
              </Typography>
              <Typography variant="body1" paragraph>
                O NPPAvalia emprega os melhores esforços técnicos e adota provedores de nuvem de padrão internacional para manter o sistema operacional com disponibilidade contínua (24 horas por dia, 7 dias por semana).
              </Typography>
              <Typography variant="body1" paragraph>
                Entretanto, o Usuário reconhece que nenhum sistema digital é totalmente isento de instabilidades eventuais. A Plataforma poderá sofrer interrupções temporárias decorrentes de:
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, mb: 2, '& li': { mb: 1 } }}>
                <li>Manutenções preventivas ou corretivas comunicadas preferencialmente com antecedência;</li>
                <li>Falhas em redes de telecomunicações, provedores de acesso ou serviços de nuvem de terceiros;</li>
                <li>Casos fortuitos ou de força maior (Art. 393 do Código Civil Brasileiro).</li>
              </Box>
              <Typography variant="body1">
                <strong>Dever Ético de Cópia de Segurança pelo Profissional:</strong> Em conformidade com os regulamentos dos conselhos profissionais que exigem a guarda e conservação segura de prontuários, é expressamente recomendado que o Profissional realize o download e a exportação regular de seus relatórios e laudos finalizados em formato digital seguro (PDF) para seus arquivos locais.
              </Typography>
            </Paper>

            {/* Seção 10 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Typography variant="h5" fontWeight={700} color="#0F172A" sx={{ mb: 2 }}>
                10. Rescisão, Encerramento de Conta e Guarda de Dados
              </Typography>
              <Typography variant="body1" paragraph>
                O Usuário poderá solicitar o encerramento definitivo de sua conta a qualquer instante.
              </Typography>
              <Typography variant="body1" paragraph>
                Em caso de cancelamento da assinatura ou rescisão:
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, '& li': { mb: 1.5 } }}>
                <li>
                  O Usuário terá a prerrogativa de exportar os prontuários e relatórios cadastrados antes da data final de encerramento de seu plano;
                </li>
                <li>
                  Após o encerramento definitivo da conta e transcorrido o prazo de carência técnica (ou após solicitação expressa de eliminação nos termos do Art. 18, VI da LGPD), os dados clínicos vinculados serão eliminados ou anonimizados de nossos servidores ativos;
                </li>
                <li>
                  Poderão ser retidos unicamente os dados estritamente necessários para cumprimento de obrigação legal ou regulatória (como guarda de registros fiscais e de faturamento pelo prazo legal de prescrição tributária, e guarda de logs de conexão conforme o Art. 15 do Marco Civil da Internet).
                </li>
              </Box>
            </Paper>

            {/* Seção 11 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Typography variant="h5" fontWeight={700} color="#0F172A" sx={{ mb: 2 }}>
                11. Limitação de Responsabilidade
              </Typography>
              <Typography variant="body1" paragraph>
                Nos limites autorizados pela legislação aplicável, o NPPAvalia não responderá por:
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, '& li': { mb: 1.5 } }}>
                <li>Lucros cessantes, perdas de oportunidade negocial ou danos indiretos alegados pelo Usuário;</li>
                <li>Decisões clínicas, laudos, pareceres ou encaminhamentos emitidos pelo Profissional;</li>
                <li>Incorreto manuseio do sistema, negligência na guarda de senhas ou imperícia no uso das ferramentas de avaliação;</li>
                <li>Inconsistência ou veracidade das informações fornecidas por pacientes ou responsáveis nos formulários de anamnese online.</li>
              </Box>
            </Paper>

            {/* Seção 12 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Typography variant="h5" fontWeight={700} color="#0F172A" sx={{ mb: 2 }}>
                12. Alterações e Atualizações Destes Termos
              </Typography>
              <Typography variant="body1" paragraph>
                Buscando o aprimoramento constante de nossos serviços e a conformidade contínua com as normas legais, o NPPAvalia poderá alterar estes Termos a qualquer momento.
              </Typography>
              <Typography variant="body1">
                As alterações entrarão em vigor a partir da data de publicação na Plataforma, identificada pela &quot;Última atualização&quot; no topo da página. Em caso de alterações substanciais ou que impliquem novas obrigações ao Usuário, emitiremos aviso de destaque na interface do sistema ou encaminharemos notificação por e-mail. O uso continuado da Plataforma após as modificações implicará a aceitação tácita dos novos Termos.
              </Typography>
            </Paper>

            {/* Seção 13 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ color: 'primary.main', display: 'flex' }}><Mail size={24} /></Box>
                <Typography variant="h5" fontWeight={700} color="#0F172A">
                  13. Atendimento, Suporte e Encarregado de Proteção de Dados (DPO)
                </Typography>
              </Stack>
              <Typography variant="body1" paragraph>
                Para sanar dúvidas sobre estes Termos, exercer direitos previstos na LGPD ou solicitar esclarecimentos operacionais, o Usuário poderá contatar diretamente nosso canal de atendimento e encarregado de privacidade:
              </Typography>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  display: 'inline-block',
                }}
              >
                <Typography variant="body2" fontWeight={600} color="#0F172A">
                  Canal de Suporte e Encarregado de Dados (DPO):
                </Typography>
                <Typography variant="body1" color="primary.main" fontWeight={700} sx={{ mt: 0.5 }}>
                  suporte@nppavalia.com.br
                </Typography>
                <Typography variant="caption" color="#64748B" sx={{ display: 'block', mt: 0.5 }}>
                  Atendimento de segunda a sexta-feira, em dias úteis, das 09h às 18h (Horário de Brasília).
                </Typography>
              </Box>
            </Paper>

            {/* Seção 14 */}
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: 'white' }}>
              <Typography variant="h5" fontWeight={700} color="#0F172A" sx={{ mb: 2 }}>
                14. Legislação Aplicável e Foro de Eleição
              </Typography>
              <Typography variant="body1" paragraph>
                Estes Termos são integralmente regidos e interpretados em consonância com o ordenamento jurídico da República Federativa do Brasil, em especial a Constituição Federal, o Código Civil, o Marco Civil da Internet (Lei nº 12.965/2014) e a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).
              </Typography>
              <Typography variant="body1">
                Fica eleito o foro da comarca da sede dos responsáveis legais da Plataforma NPPAvalia no Brasil para dirimir eventuais litígios ou controvérsias oriundas destes Termos, renunciando as partes expressamente a qualquer outro foro, por mais privilegiado que seja ou venha a ser.
              </Typography>
            </Paper>

            {/* Conclusão de Conformidade */}
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: '#F0FDF4',
                border: '1px solid #BBF7D0',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <CheckCircle2 size={32} color="#16A34A" />
              <Typography variant="body2" color="#166534" fontWeight={500}>
                Ao utilizar o NPPAvalia, você concorda em fazer uso ético, seguro e diligente dos recursos disponibilizados, preservando a intimidade e a integridade de seus pacientes com amparo na legislação brasileira.
              </Typography>
            </Box>

          </Stack>
        </AnimatedSection>
      </Container>

      <PublicFooter />
    </Box>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Alert,
  Card,
  CardContent,
  Chip,
  Divider,
} from '@mui/material';
import { CheckCircle2, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';
import { translateTestKey, translateTestValue } from '@/utils/test-translations';

export interface TestResultDisplayProps {
  testName: string;
  resultData: Record<string, any>;
  isSaved: boolean;
  isSaving: boolean;
  hasPatient: boolean;
  onNewTest: () => void;
}

export default function TestResultDisplay({
  testName,
  resultData,
  isSaved,
  isSaving,
  hasPatient,
  onNewTest,
}: TestResultDisplayProps) {
  if (!resultData) return null;

  const getLabel = (key: string) => translateTestKey(key);
  const formatValue = (value: any) => translateTestValue(value);

  const isSnap = testName.toUpperCase().includes('SNAP') || (resultData.inattention !== undefined && resultData.hyperactivity !== undefined);
  const isSuggestiveAny = isSnap && (
    !!resultData.inattention?.isSuggestive ||
    !!resultData.hyperactivity?.isSuggestive ||
    !!resultData.oppositionalDefiant?.isSuggestive
  );

  const isAta = testName.toUpperCase() === 'ATA' || resultData.protocol === 'ATA';
  const isAtaAboveCutoff = isAta && resultData.result === 'ABOVE_CUTOFF';

  const isAq10Child = testName.toUpperCase().includes('AQ10-CHILD') || testName.toUpperCase().includes('AQ-10-CHILD') || resultData.protocol === 'AQ-10-Child' || resultData.protocol === 'AQ10-Child';
  const isAq10ChildAboveCutoff = isAq10Child && resultData.result === 'ABOVE_CUTOFF';

  const isAq10Adult = testName.toUpperCase().includes('AQ10-ADULT') || testName.toUpperCase().includes('AQ-10-ADULT') || resultData.protocol === 'AQ-10-Adult' || resultData.protocol === 'AQ10-Adult';
  const isAq10AdultAboveCutoff = isAq10Adult && resultData.result === 'ABOVE_CUTOFF';

  const isCars = testName.toUpperCase() === 'CARS';
  const isCarsSevere = isCars && resultData.interpretation === 'Autismo severo';
  const isCarsLeveModerado = isCars && resultData.interpretation === 'Autismo leve a moderado';

  const bannerBackground = isSnap
    ? (isSuggestiveAny
      ? 'linear-gradient(135deg, #f59e0b 0%, #e11d48 100%)'
      : 'linear-gradient(135deg, #10b981 0%, #059669 100%)')
    : isAta
      ? (isAtaAboveCutoff
        ? 'linear-gradient(135deg, #f59e0b 0%, #e11d48 100%)'
        : 'linear-gradient(135deg, #10b981 0%, #059669 100%)')
      : isAq10Child
        ? (isAq10ChildAboveCutoff
          ? 'linear-gradient(135deg, #f59e0b 0%, #e11d48 100%)'
          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)')
      : isAq10Adult
        ? (isAq10AdultAboveCutoff
          ? 'linear-gradient(135deg, #f59e0b 0%, #e11d48 100%)'
          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)')
      : isCars
        ? (isCarsSevere
          ? 'linear-gradient(135deg, #e11d48 0%, #991b1b 100%)'
          : isCarsLeveModerado
            ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
            : 'linear-gradient(135deg, #10b981 0%, #059669 100%)')
        : 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

  const cardBorderColor = isSnap
    ? (isSuggestiveAny ? 'warning.light' : 'success.light')
    : isAta
      ? (isAtaAboveCutoff ? 'warning.light' : 'success.light')
      : isAq10Child
        ? (isAq10ChildAboveCutoff ? 'warning.light' : 'success.light')
      : isAq10Adult
        ? (isAq10AdultAboveCutoff ? 'warning.light' : 'success.light')
      : isCars
        ? (isCarsSevere ? 'error.light' : isCarsLeveModerado ? 'warning.light' : 'success.light')
        : 'success.light';

  const cardBoxShadow = isSnap
    ? (isSuggestiveAny
      ? '0 10px 40px -10px rgba(245, 158, 11, 0.2)'
      : '0 10px 40px -10px rgba(16, 185, 129, 0.15)')
    : isAta
      ? (isAtaAboveCutoff
        ? '0 10px 40px -10px rgba(245, 158, 11, 0.2)'
        : '0 10px 40px -10px rgba(16, 185, 129, 0.15)')
      : isAq10Child
        ? (isAq10ChildAboveCutoff
          ? '0 10px 40px -10px rgba(245, 158, 11, 0.2)'
          : '0 10px 40px -10px rgba(16, 185, 129, 0.15)')
      : isAq10Adult
        ? (isAq10AdultAboveCutoff
          ? '0 10px 40px -10px rgba(245, 158, 11, 0.2)'
          : '0 10px 40px -10px rgba(16, 185, 129, 0.15)')
      : isCars
        ? (isCarsSevere
          ? '0 10px 40px -10px rgba(239, 68, 68, 0.2)'
          : isCarsLeveModerado
            ? '0 10px 40px -10px rgba(245, 158, 11, 0.2)'
            : '0 10px 40px -10px rgba(16, 185, 129, 0.15)')
        : '0 10px 40px -10px rgba(16, 185, 129, 0.15)';

  const chipLabel = isSnap
    ? (isSuggestiveAny ? 'Investigação Clínica Sugerida' : 'Não Sugestivo')
    : isAta
      ? (isAtaAboveCutoff ? 'Acima do Ponto de Corte' : 'Abaixo do Ponto de Corte')
    : isAq10Child
      ? (isAq10ChildAboveCutoff ? 'Acima do Ponto de Corte' : 'Abaixo do Ponto de Corte')
    : isAq10Adult
      ? (isAq10AdultAboveCutoff ? 'Acima do Ponto de Corte' : 'Abaixo do Ponto de Corte')
    : isCars
      ? resultData.interpretation
      : 'Processado com Sucesso';

  const renderMetrics = (data: Record<string, any>) => (
    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
      {Object.entries(data).map(([key, value], index) => {
        if (typeof value === 'object') return null;

        const animationDelay = `${index * 0.1}s`;

        return (
          <Paper
            key={key}
            elevation={0}
            sx={{
              p: 3,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #fcfcfc 100%)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: 'slideUpFade 0.5s ease-out forwards',
              animationDelay,
              opacity: 0,
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)',
              '&:hover': {
                borderColor: 'primary.light',
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px -8px rgba(0,0,0,0.08)',
                '& .metric-decoration': {
                  transform: 'scale(1.2) rotate(10deg)',
                  opacity: 0.1,
                }
              },
              '@keyframes slideUpFade': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              }
            }}
          >
            {/* Subtle background decoration */}
            <Box
              className="metric-decoration"
              sx={{
                position: 'absolute',
                right: -20,
                bottom: -20,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(var(--mui-palette-primary-mainChannel) / 0.1) 0%, rgba(var(--mui-palette-primary-mainChannel) / 0) 100%)',
                transition: 'all 0.5s ease',
                pointerEvents: 'none',
              }}
            />

            <Typography
              variant="overline"
              color="text.secondary"
              sx={{
                display: 'block',
                fontWeight: 700,
                letterSpacing: 1.2,
                mb: 1,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {getLabel(key)}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="800"
              color="text.primary"
              sx={{
                position: 'relative',
                zIndex: 1,
                background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {formatValue(value)}
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );

  const renderSnapResults = (data: any) => {
    const hasOppositional = !!data.oppositionalDefiant;

    const subscaleConfigs = [
      {
        key: 'inattention',
        title: 'Subescala de Desatenção',
        maxSymptoms: 9,
        color: '#3b82f6',
        suggestiveText: 'Sugestivo para Investigação Clínica de TDAH (Desatenção)',
        description: 'Reflete dificuldades em manter a atenção, seguir instruções detalhadas e organizar atividades.'
      },
      {
        key: 'hyperactivity',
        title: 'Subescala de Hiperatividade / Impulsividade',
        maxSymptoms: 9,
        color: '#f59e0b',
        suggestiveText: 'Sugestivo para Investigação Clínica de TDAH (Hiperatividade/Impulsividade)',
        description: 'Reflete comportamentos de inquietação motora, impulsividade verbal e dificuldade em aguardar a vez.'
      },
      {
        key: 'oppositionalDefiant',
        title: 'Transtorno Opositivo-Desafiador (TOD)',
        maxSymptoms: 8,
        color: '#ef4444',
        suggestiveText: 'Sugestivo para Investigação Clínica de TOD',
        description: 'Reflete comportamentos de desafio a regras de adultos, discussões frequentes e irritabilidade.'
      }
    ];

    return (
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: hasOppositional ? '1fr 1fr 1fr' : '1fr 1fr' }} gap={3}>
        {subscaleConfigs.map((config) => {
          const subData = data[config.key];
          if (!subData) return null;

          const isSuggestive = subData.isSuggestive;

          return (
            <Paper
              key={config.key}
              elevation={0}
              sx={{
                p: 3.5,
                borderRadius: 4,
                border: '1px solid',
                borderColor: isSuggestive ? 'error.light' : 'success.light',
                background: isSuggestive
                  ? 'linear-gradient(145deg, #fffafb 0%, #fff1f2 100%)'
                  : 'linear-gradient(145deg, #fcfdfa 0%, #f7fee7 100%)',
                boxShadow: isSuggestive
                  ? '0 10px 30px -10px rgba(239, 68, 68, 0.08)'
                  : '0 10px 30px -10px rgba(132, 204, 22, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: isSuggestive ? 'error.main' : 'success.main',
                  boxShadow: isSuggestive
                    ? '0 20px 40px -15px rgba(239, 68, 68, 0.15)'
                    : '0 20px 40px -15px rgba(132, 204, 22, 0.15)',
                }
              }}
            >
              {/* Header */}
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <Box sx={{ width: 4, height: 24, bgcolor: config.color, borderRadius: 2 }} />
                <Typography variant="subtitle1" fontWeight={800} color="text.primary">
                  {config.title}
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: '40px', lineHeight: 1.5 }}>
                {config.description}
              </Typography>

              {/* Status Section */}
              <Box sx={{ mb: 3 }}>
                <Chip
                  icon={isSuggestive ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
                  label={isSuggestive ? 'Sugestivo' : 'Não Sugestivo'}
                  color={isSuggestive ? 'error' : 'success'}
                  size="small"
                  sx={{ fontWeight: 700, mb: 1, '& .MuiChip-icon': { color: 'inherit' } }}
                />
                <Typography
                  variant="body1"
                  fontWeight={800}
                  color={isSuggestive ? 'error.main' : 'success.main'}
                  sx={{ lineHeight: 1.3 }}
                >
                  {isSuggestive ? config.suggestiveText : 'Dentro do esperado (Não Sugestivo)'}
                </Typography>
              </Box>

              <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

              {/* Details Metrics */}
              <Stack spacing={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="text.secondary">
                    Sintomas Ativados
                  </Typography>
                  <Typography variant="body1" fontWeight={800} color="text.primary">
                    {subData.symptomsCount} de {config.maxSymptoms}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="text.secondary">
                    Média de Pontuação
                  </Typography>
                  <Typography variant="body1" fontWeight={800} color="text.primary">
                    {subData.meanScore?.toFixed(2) ?? '0.00'}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="text.secondary">
                    Pontuação Total
                  </Typography>
                  <Typography variant="body1" fontWeight={800} color="text.primary">
                    {subData.totalScore}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          );
        })}
      </Box>
    );
  };

  const renderAtaResults = (data: any) => {
    const isAboveCutoff = data.result === 'ABOVE_CUTOFF';

    return (
      <Stack spacing={4}>
        {/* Aviso Informativo */}
        <Alert severity="info" sx={{ borderRadius: 3, border: '1px solid #bfdbfe', bgcolor: '#eff6ff', '& .MuiAlert-icon': { color: '#3b82f6' } }}>
          <Typography variant="body2" sx={{ color: '#1e3a8a', fontWeight: 500, lineHeight: 1.6 }}>
            A plataforma realiza apenas o registro e cálculo da pontuação da ATA. A aplicação, interpretação clínica e conclusão diagnóstica devem ser feitas por profissional habilitado, com base no material original, anamnese, observação clínica e demais instrumentos utilizados.
          </Typography>
        </Alert>

        {/* Resumo da Escala */}
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gap={3}>
          {/* Pontuação Total */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #fcfcfc 100%)',
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', fontWeight: 700, letterSpacing: 1.2, mb: 1 }}>
              Pontuação Total
            </Typography>
            <Typography variant="h4" fontWeight="800" sx={{ background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {data.totalScore} / {data.maxScore}
            </Typography>
          </Paper>

          {/* Ponto de Corte */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #fcfcfc 100%)',
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', fontWeight: 700, letterSpacing: 1.2, mb: 1 }}>
              Ponto de Corte
            </Typography>
            <Typography variant="h4" fontWeight="800" sx={{ background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {data.cutoff}
            </Typography>
          </Paper>

          {/* Resultado */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid',
              borderColor: isAboveCutoff ? 'error.light' : 'success.light',
              background: isAboveCutoff ? 'linear-gradient(145deg, #fffafb 0%, #fff1f2 100%)' : 'linear-gradient(145deg, #fcfdfa 0%, #f7fee7 100%)',
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="overline" color={isAboveCutoff ? 'error.main' : 'success.main'} sx={{ display: 'block', fontWeight: 700, letterSpacing: 1.2, mb: 1 }}>
              Resultado
            </Typography>
            <Typography variant="h5" fontWeight="800" color={isAboveCutoff ? 'error.main' : 'success.main'}>
              {isAboveCutoff ? 'Acima do ponto de corte' : 'Abaixo do ponto de corte'}
            </Typography>
          </Paper>
        </Box>

        {/* Metadados adicionais */}
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 3,
            borderColor: 'divider',
            bgcolor: 'action.hover'
          }}
        >
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr 1fr' }} gap={2}>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', display: 'block' }}>
                Informante
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {data.informant}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', display: 'block' }}>
                Idade de Aplicação
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {data.ageInYears} anos
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', display: 'block' }}>
                Data da Aplicação
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {data.applicationDate ? new Date(data.applicationDate + 'T00:00:00').toLocaleDateString('pt-BR') : '-'}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Observações Clínicas se existirem */}
        {data.clinicalObservations && (
          <Box>
            <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box component="span" sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: 2 }} />
              Observações Clínicas
            </Typography>
            <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fafafa' }}>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {data.clinicalObservations}
              </Typography>
            </Paper>
          </Box>
        )}

        {/* Interpretação */}
        <Box>
          <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="span" sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: 2 }} />
            Interpretação
          </Typography>
          <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fafafa' }}>
            <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ lineHeight: 1.6 }}>
              {data.interpretation}
            </Typography>
          </Paper>
        </Box>

        {/* Texto para Relatório */}
        {data.reportText && (
          <Box>
            <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box component="span" sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: 2 }} />
              Texto para Relatório
            </Typography>
            <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#f8fafc', borderStyle: 'dashed' }}>
              <Typography variant="body2" color="text.primary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontStyle: 'italic' }}>
                {data.reportText}
              </Typography>
            </Paper>
          </Box>
        )}
      </Stack>
    );
  };

  const renderAq10ChildResults = (data: any) => {
    const isAboveCutoff = data.result === 'ABOVE_CUTOFF';

    return (
      <Stack spacing={4}>
        {/* Aviso Informativo */}
        <Alert severity="info" sx={{ borderRadius: 3, border: '1px solid #bfdbfe', bgcolor: '#eff6ff', '& .MuiAlert-icon': { color: '#3b82f6' } }}>
          <Typography variant="body2" sx={{ color: '#1e3a8a', fontWeight: 500, lineHeight: 1.6 }}>
            A plataforma realiza apenas o registro e cálculo da pontuação do AQ-10. A aplicação, interpretação clínica e conclusão diagnóstica devem ser feitas por profissional habilitado, com base no material original, anamnese, observação clínica e demais instrumentos utilizados.
          </Typography>
        </Alert>

        {/* Resumo do Rastreamento */}
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gap={3}>
          {/* Pontuação Total */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #fcfcfc 100%)',
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', fontWeight: 700, letterSpacing: 1.2, mb: 1 }}>
              Pontuação Total
            </Typography>
            <Typography variant="h4" fontWeight="800" sx={{ background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {data.totalScore} / {data.maxScore}
            </Typography>
          </Paper>

          {/* Ponto de Corte */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #fcfcfc 100%)',
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', fontWeight: 700, letterSpacing: 1.2, mb: 1 }}>
              Ponto de Corte
            </Typography>
            <Typography variant="h4" fontWeight="800" sx={{ background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {data.cutoff}
            </Typography>
          </Paper>

          {/* Resultado */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid',
              borderColor: isAboveCutoff ? 'error.light' : 'success.light',
              background: isAboveCutoff ? 'linear-gradient(145deg, #fffafb 0%, #fff1f2 100%)' : 'linear-gradient(145deg, #fcfdfa 0%, #f7fee7 100%)',
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="overline" color={isAboveCutoff ? 'error.main' : 'success.main'} sx={{ display: 'block', fontWeight: 700, letterSpacing: 1.2, mb: 1 }}>
              Resultado
            </Typography>
            <Typography variant="h5" fontWeight="800" color={isAboveCutoff ? 'error.main' : 'success.main'}>
              {isAboveCutoff ? 'Acima do ponto de corte' : 'Abaixo do ponto de corte'}
            </Typography>
          </Paper>
        </Box>

        {/* Metadados adicionais */}
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 3,
            borderColor: 'divider',
            bgcolor: 'action.hover'
          }}
        >
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr 1fr' }} gap={2}>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', display: 'block' }}>
                Informante
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {data.informant}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', display: 'block' }}>
                Idade de Aplicação
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {data.ageInYears} anos
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', display: 'block' }}>
                Data da Aplicação
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {data.applicationDate ? new Date(data.applicationDate + 'T00:00:00').toLocaleDateString('pt-BR') : '-'}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Observações Clínicas se existirem */}
        {data.clinicalObservations && (
          <Box>
            <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box component="span" sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: 2 }} />
              Observações Clínicas
            </Typography>
            <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fafafa' }}>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {data.clinicalObservations}
              </Typography>
            </Paper>
          </Box>
        )}

        {/* Interpretação */}
        <Box>
          <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="span" sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: 2 }} />
            Interpretação
          </Typography>
          <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fafafa' }}>
            <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ lineHeight: 1.6 }}>
              {data.interpretation}
            </Typography>
          </Paper>
        </Box>

        {/* Texto para Relatório */}
        {data.reportText && (
          <Box>
            <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box component="span" sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: 2 }} />
              Texto para Relatório
            </Typography>
            <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#f8fafc', borderStyle: 'dashed' }}>
              <Typography variant="body2" color="text.primary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontStyle: 'italic' }}>
                {data.reportText}
              </Typography>
            </Paper>
          </Box>
        )}
      </Stack>
    );
  };

  const renderAq10AdultResults = (data: any) => {
    const isAboveCutoff = data.result === 'ABOVE_CUTOFF';

    return (
      <Stack spacing={4}>
        {/* Aviso Informativo */}
        <Alert severity="info" sx={{ borderRadius: 3, border: '1px solid #bfdbfe', bgcolor: '#eff6ff', '& .MuiAlert-icon': { color: '#3b82f6' } }}>
          <Typography variant="body2" sx={{ color: '#1e3a8a', fontWeight: 500, lineHeight: 1.6 }}>
            A plataforma realiza apenas o registro e cálculo da pontuação do AQ-10. A aplicação, interpretação clínica e conclusão diagnóstica devem ser feitas por profissional habilitado, com base no material original, anamnese, observação clínica e demais instrumentos utilizados.
          </Typography>
        </Alert>

        {/* Resumo do Rastreamento */}
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gap={3}>
          {/* Pontuação Total */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #fcfcfc 100%)',
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', fontWeight: 700, letterSpacing: 1.2, mb: 1 }}>
              Pontuação Total
            </Typography>
            <Typography variant="h4" fontWeight="800" sx={{ background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {data.totalScore} / {data.maxScore}
            </Typography>
          </Paper>

          {/* Ponto de Corte */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #fcfcfc 100%)',
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', fontWeight: 700, letterSpacing: 1.2, mb: 1 }}>
              Ponto de Corte
            </Typography>
            <Typography variant="h4" fontWeight="800" sx={{ background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {data.cutoff}
            </Typography>
          </Paper>

          {/* Resultado */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid',
              borderColor: isAboveCutoff ? 'error.light' : 'success.light',
              background: isAboveCutoff ? 'linear-gradient(145deg, #fffafb 0%, #fff1f2 100%)' : 'linear-gradient(145deg, #fcfdfa 0%, #f7fee7 100%)',
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="overline" color={isAboveCutoff ? 'error.main' : 'success.main'} sx={{ display: 'block', fontWeight: 700, letterSpacing: 1.2, mb: 1 }}>
              Resultado
            </Typography>
            <Typography variant="h5" fontWeight="800" color={isAboveCutoff ? 'error.main' : 'success.main'}>
              {isAboveCutoff ? 'Acima do ponto de corte' : 'Abaixo do ponto de corte'}
            </Typography>
          </Paper>
        </Box>

        {/* Metadados adicionais */}
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 3,
            borderColor: 'divider',
            bgcolor: 'action.hover'
          }}
        >
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr 1fr' }} gap={2}>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', display: 'block' }}>
                Informante
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {data.informant}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', display: 'block' }}>
                Idade de Aplicação
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {data.ageInYears} anos
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', display: 'block' }}>
                Data da Aplicação
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {data.applicationDate ? new Date(data.applicationDate + 'T00:00:00').toLocaleDateString('pt-BR') : '-'}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Observações Clínicas se existirem */}
        {data.clinicalObservations && (
          <Box>
            <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box component="span" sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: 2 }} />
              Observações Clínicas
            </Typography>
            <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fafafa' }}>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {data.clinicalObservations}
              </Typography>
            </Paper>
          </Box>
        )}

        {/* Interpretação */}
        <Box>
          <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="span" sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: 2 }} />
            Interpretação
          </Typography>
          <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fafafa' }}>
            <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ lineHeight: 1.6 }}>
              {data.interpretation}
            </Typography>
          </Paper>
        </Box>

        {/* Texto para Relatório */}
        {data.reportText && (
          <Box>
            <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box component="span" sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: 2 }} />
              Texto para Relatório
            </Typography>
            <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#f8fafc', borderStyle: 'dashed' }}>
              <Typography variant="body2" color="text.primary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontStyle: 'italic' }}>
                {data.reportText}
              </Typography>
            </Paper>
          </Box>
        )}
      </Stack>
    );
  };

  const renderCarsResults = (data: any) => {
    const isSevere = data.interpretation === 'Autismo severo';
    const isLeveModerado = data.interpretation === 'Autismo leve a moderado';

    return (
      <Stack spacing={4}>
        <Alert severity="info" sx={{ borderRadius: 3, border: '1px solid #bfdbfe', bgcolor: '#eff6ff', '& .MuiAlert-icon': { color: '#3b82f6' } }}>
          <Typography variant="body2" sx={{ color: '#1e3a8a', fontWeight: 500, lineHeight: 1.6 }}>
            A plataforma realiza apenas o registro e cálculo da pontuação do CARS. A aplicação, interpretação clínica e conclusão diagnóstica devem ser feitas por profissional habilitado, com base no material original, anamnese, observação clínica e demais instrumentos utilizados.
          </Typography>
        </Alert>

        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #fcfcfc 100%)',
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', fontWeight: 700, letterSpacing: 1.2, mb: 1 }}>
              Pontuação Total
            </Typography>
            <Typography variant="h4" fontWeight="800" sx={{ background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {data.totalScore?.toFixed(1)} / 60.0
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid',
              borderColor: isSevere ? 'error.light' : isLeveModerado ? 'warning.light' : 'success.light',
              background: isSevere
                ? 'linear-gradient(145deg, #fffafb 0%, #fff1f2 100%)'
                : isLeveModerado
                  ? 'linear-gradient(145deg, #fffbeb 0%, #fef3c7 100%)'
                  : 'linear-gradient(145deg, #fcfdfa 0%, #f7fee7 100%)',
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="overline" color={isSevere ? 'error.main' : isLeveModerado ? 'warning.main' : 'success.main'} sx={{ display: 'block', fontWeight: 700, letterSpacing: 1.2, mb: 1 }}>
              Classificação
            </Typography>
            <Typography variant="h5" fontWeight="800" color={isSevere ? 'error.main' : isLeveModerado ? 'warning.main' : 'success.main'}>
              {data.interpretation}
            </Typography>
          </Paper>
        </Box>

        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 3,
            borderColor: 'divider',
            bgcolor: 'action.hover'
          }}
        >
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', display: 'block' }}>
                Paciente
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {data.patient}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', display: 'block' }}>
                Idade de Aplicação
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {data.age} anos
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="span" sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: 2 }} />
            Tabela de Referência da Escala CARS
          </Typography>
          <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fafafa' }}>
            <Stack spacing={1.5}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600} color="success.main">
                  De 15.0 a 29.5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dentro da faixa normal (Sem autismo)
                </Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600} color="warning.main">
                  De 30.0 a 36.5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Autismo leve a moderado
                </Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600} color="error.main">
                  De 37.0 a 60.0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Autismo severo
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    );
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: '1px solid',
        borderColor: cardBorderColor,
        overflow: 'hidden',
        boxShadow: cardBoxShadow,
        position: 'relative',
        transition: 'all 0.3s ease',
      }}
    >
      <Box
        sx={{
          background: bannerBackground,
          px: { xs: 3, md: 5 },
          py: 4,
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 0.3s ease',
        }}
      >
        <Box sx={{ position: 'absolute', top: '-20%', right: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: '-40%', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" gap={3} sx={{ position: 'relative', zIndex: 1 }}>
          <Stack direction="row" spacing={2.5} alignItems="center">
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '16px',
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              {(isSnap && isSuggestiveAny) || (isAta && isAtaAboveCutoff) || (isCars && (isCarsSevere || isCarsLeveModerado)) ? <AlertCircle size={32} /> : <CheckCircle2 size={32} />}
            </Box>
            <Box>
              <Typography variant="overline" fontWeight={700} sx={{ color: 'rgba(255, 255, 255, 0.8)', letterSpacing: 1.5 }}>
                Avaliação Concluída
              </Typography>
              <Typography variant="h5" fontWeight="800" sx={{ color: 'white' }}>
                Resultado: {testName}
              </Typography>
            </Box>
          </Stack>
          <Chip
            icon={(isSnap && isSuggestiveAny) || (isCars && (isCarsSevere || isCarsLeveModerado)) ? <AlertCircle size={16} /> : <Sparkles size={16} />}
            label={chipLabel}
            sx={{
              px: 1,
              fontWeight: 700,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              '& .MuiChip-icon': { color: 'white' }
            }}
          />
        </Stack>
      </Box>

      <CardContent sx={{ p: { xs: 3, md: 5 }, bgcolor: 'background.paper' }}>
        <Stack spacing={4}>
          {hasPatient && (
            <Alert
              icon={isSaving ? undefined : <CheckCircle2 size={20} />}
              severity={isSaved ? "success" : isSaving ? "info" : "warning"}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 2,
                alignItems: 'center',
                border: '1px solid',
                borderColor: isSaved ? 'success.light' : isSaving ? 'info.light' : 'warning.light'
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                {isSaving ? "Sincronizando resultado no prontuário do paciente..." :
                  isSaved ? "Resultado arquivado e salvo com sucesso no perfil do paciente." :
                    "Atenção: Resultado gerado sem salvamento automático (Teste Anônimo)."}
              </Typography>
            </Alert>
          )}

          {isSnap ? (
            renderSnapResults(resultData)
          ) : isAta ? (
            renderAtaResults(resultData)
          ) : isAq10Child ? (
            renderAq10ChildResults(resultData)
          ) : isAq10Adult ? (
            renderAq10AdultResults(resultData)
          ) : isCars ? (
            renderCarsResults(resultData)
          ) : (
            <>
              <Box>{renderMetrics(resultData)}</Box>

              {Object.entries(resultData).map(([key, value]) => {
                if (Array.isArray(value)) return null;
                if (typeof value === 'object' && value !== null) {
                  return (
                    <Box key={key} sx={{ mt: 2 }}>
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        gutterBottom
                        sx={{
                          color: 'text.primary',
                          mb: 3,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          '&::before': {
                            content: '""',
                            display: 'block',
                            width: 4,
                            height: 24,
                            bgcolor: 'primary.main',
                            borderRadius: 2
                          }
                        }}
                      >
                        {getLabel(key)}
                      </Typography>
                      {renderMetrics(value)}
                    </Box>
                  );
                }
                return null;
              })}
            </>
          )}

          <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="contained"
              startIcon={<RotateCcw size={18} />}
              onClick={onNewTest}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                bgcolor: 'grey.900',
                color: 'white',
                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                '&:hover': {
                  bgcolor: 'grey.800',
                  boxShadow: '0 6px 20px 0 rgba(0,0,0,0.3)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Realizar Novo Teste
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

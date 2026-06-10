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

  const bannerBackground = isSnap
    ? (isSuggestiveAny 
        ? 'linear-gradient(135deg, #f59e0b 0%, #e11d48 100%)' 
        : 'linear-gradient(135deg, #10b981 0%, #059669 100%)')
    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
  const cardBorderColor = isSnap
    ? (isSuggestiveAny ? 'warning.light' : 'success.light')
    : 'success.light';
    
  const cardBoxShadow = isSnap
    ? (isSuggestiveAny 
        ? '0 10px 40px -10px rgba(245, 158, 11, 0.2)' 
        : '0 10px 40px -10px rgba(16, 185, 129, 0.15)')
    : '0 10px 40px -10px rgba(16, 185, 129, 0.15)';

  const chipLabel = isSnap
    ? (isSuggestiveAny ? 'Investigação Clínica Sugerida' : 'Não Sugestivo')
    : 'Processado com Sucesso';

  const renderMetrics = (data: Record<string, any>) => (
    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
      {Object.entries(data).map(([key, value], index) => {
        if (typeof value === 'object') return null;
        
        // Simple animation delay based on index
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
      {/* Premium Header Banner */}
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
        {/* Abstract shapes for premium feel */}
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
              {isSnap && isSuggestiveAny ? <AlertCircle size={32} /> : <CheckCircle2 size={32} />}
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
            icon={isSnap && isSuggestiveAny ? <AlertCircle size={16} /> : <Sparkles size={16} />}
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
          ) : (
            <>
              <Box>{renderMetrics(resultData)}</Box>

              {/* Render nested objects recursively if present */}
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

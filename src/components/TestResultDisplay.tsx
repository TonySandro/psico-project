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
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
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

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'success.light',
        overflow: 'hidden',
        boxShadow: '0 10px 40px -10px rgba(16, 185, 129, 0.15)',
        position: 'relative',
      }}
    >
      {/* Premium Header Banner */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          px: { xs: 3, md: 5 },
          py: 4,
          position: 'relative',
          overflow: 'hidden',
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
              <CheckCircle2 size={32} />
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
            icon={<Sparkles size={16} />}
            label="Processado com Sucesso"
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

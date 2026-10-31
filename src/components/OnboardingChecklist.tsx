import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Button,
  LinearProgress,
  IconButton,
  Chip,
  Collapse,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  UserCheck,
  UserPlus,
  ClipboardList,
  FileText,
  Trophy,
  X,
  RotateCcw,
  HelpCircle,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import type { Statistics } from '@/types/schema';
import { usePlatformTour } from '@/hooks/usePlatformTour';

interface OnboardingChecklistProps {
  stats?: Statistics;
}

interface StepItem {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  actionLabel: string;
  actionPath: string;
  icon: React.ElementType;
  isAutoCompleted: boolean;
}

const STORAGE_KEY_MANUAL = 'npp_onboarding_manual_completed';
const STORAGE_KEY_DISMISSED = 'npp_onboarding_dismissed';
const STORAGE_KEY_COLLAPSED = 'npp_onboarding_collapsed';

export default function OnboardingChecklist({ stats }: OnboardingChecklistProps) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { startTour } = usePlatformTour();

  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_DISMISSED) === 'true';
  });

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_COLLAPSED) === 'true';
  });

  const [manualCompleted, setManualCompleted] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MANUAL);
      return saved ? JSON.parse(saved) : ['step-welcome'];
    } catch {
      return ['step-welcome'];
    }
  });

  // Salva alterações manuais no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MANUAL, JSON.stringify(manualCompleted));
  }, [manualCompleted]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COLLAPSED, String(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DISMISSED, String(isDismissed));
  }, [isDismissed]);

  // Definição dos passos do onboarding
  const steps: StepItem[] = useMemo(() => {
    const hasPatients = (stats?.totalActivePatients ?? 0) > 0 || (stats?.totalInactivePatients ?? 0) > 0;
    const hasProtocols = (stats?.totalProtocols ?? 0) > 0;
    const hasReports = (stats?.totalReports ?? 0) > 0;
    const hasProfileFilled = Boolean(user?.name && user?.phone);

    return [
      {
        id: 'step-welcome',
        title: 'Boas-vindas ao NPPAvalia!',
        description: 'Sua conta profissional foi criada com sucesso e seu ambiente clínico está pronto.',
        estimatedTime: 'Concluído',
        actionLabel: 'Concluído',
        actionPath: '',
        icon: Sparkles,
        isAutoCompleted: true, // Efeito Endowed Progress: primeiro passo já entregue concluído!
      },
      {
        id: 'step-profile',
        title: 'Complete seu Perfil Profissional',
        description: 'Preencha seus dados de contato e registro profissional para personalizar cabeçalhos e relatórios.',
        estimatedTime: '1 min',
        actionLabel: 'Configurar Perfil',
        actionPath: '/app/profile',
        icon: UserCheck,
        isAutoCompleted: hasProfileFilled,
      },
      {
        id: 'step-patient',
        title: 'Cadastre seu Primeiro Paciente',
        description: 'Adicione as informações cadastrais e dados escolares de uma criança ou adolescente.',
        estimatedTime: '2 min',
        actionLabel: 'Cadastrar Paciente',
        actionPath: '/app/patients',
        icon: UserPlus,
        isAutoCompleted: hasPatients,
      },
      {
        id: 'step-test',
        title: 'Conheça os Testes e Instrumentos',
        description: 'Explore instrumentos como o TDE-II e veja a correção automatizada com gráficos de percentis.',
        estimatedTime: '2 min',
        actionLabel: 'Explorar Testes',
        actionPath: '/app/tests',
        icon: ClipboardList,
        isAutoCompleted: hasProtocols,
      },
      {
        id: 'step-report',
        title: 'Envie uma Anamnese ou Emita um Relatório',
        description: 'Compartilhe formulários online com responsáveis/escolas ou gere o prontuário em PDF com um clique.',
        estimatedTime: '2 min',
        actionLabel: 'Ver Anamneses',
        actionPath: '/app/anamnesis/templates',
        icon: FileText,
        isAutoCompleted: hasReports,
      },
    ];
  }, [stats, user]);

  // Checa se o passo está concluído (automaticamente ou manualmente)
  const isStepCompleted = (step: StepItem) => {
    return step.isAutoCompleted || manualCompleted.includes(step.id);
  };

  const completedCount = steps.filter(isStepCompleted).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);
  const isAllCompleted = completedCount === steps.length;

  const toggleManualStep = (stepId: string) => {
    if (stepId === 'step-welcome') return; // Primeiro passo é sempre concluído

    setManualCompleted((prev) => {
      if (prev.includes(stepId)) {
        return prev.filter((id) => id !== stepId);
      } else {
        return [...prev, stepId];
      }
    });
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  const handleReopen = () => {
    setIsDismissed(false);
    setIsCollapsed(false);
  };

  // Se o widget foi dispensado pelo usuário, exibe apenas uma pílula sutil no topo do Dashboard
  if (isDismissed) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Chip
          icon={<RotateCcw size={14} />}
          label={`Primeiros Passos (${progressPercent}%)`}
          onClick={handleReopen}
          variant="outlined"
          size="small"
          color="primary"
          sx={{
            cursor: 'pointer',
            fontWeight: 500,
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'primary.50' },
          }}
        />
      </Box>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: isAllCompleted ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.25)',
        background: isAllCompleted
          ? 'linear-gradient(135deg, #ECFDF5 0%, #FFFFFF 65%)'
          : 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 60%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        mb: 2,
      }}
    >
      {/* Barra de destaque superior com gradiente */}
      <Box
        sx={{
          height: 4,
          width: '100%',
          background: isAllCompleted
            ? 'linear-gradient(90deg, #10B981, #059669)'
            : 'linear-gradient(90deg, #3B82F6, #14B8A6)',
        }}
      />

      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Cabeçalho do Widget */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          gap={2}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: isAllCompleted ? 'rgba(16, 185, 129, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                color: isAllCompleted ? '#10B981' : '#2563EB',
                flexShrink: 0,
              }}
            >
              {isAllCompleted ? <Trophy size={24} /> : <Sparkles size={24} />}
            </Box>

            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6" fontWeight={700} sx={{ color: 'text.primary', fontSize: '1.05rem' }}>
                  {isAllCompleted ? 'Parabéns! Primeiros Passos Concluídos' : 'Seus Primeiros Passos no NPPAvalia'}
                </Typography>
                <Chip
                  label={`${progressPercent}% Concluído`}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    bgcolor: isAllCompleted ? '#D1FAE5' : '#DBEAFE',
                    color: isAllCompleted ? '#065F46' : '#1E40AF',
                    border: 'none',
                  }}
                />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                {isAllCompleted
                  ? 'Você já dominou as funções essenciais para transformar sua prática clínica.'
                  : `${completedCount} de ${steps.length} etapas concluídas. Complete o checklist para zerar seu início.`}
              </Typography>
            </Box>
          </Stack>

          {/* Controles: Minimizar e Fechar */}
          <Stack direction="row" spacing={0.5} alignSelf={{ xs: 'flex-end', sm: 'center' }}>
            <Tooltip title={isCollapsed ? 'Expandir checklist' : 'Minimizar checklist'}>
              <IconButton size="small" onClick={() => setIsCollapsed((prev) => !prev)}>
                {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Ocultar do painel">
              <IconButton size="small" onClick={handleDismiss}>
                <X size={18} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Barra de Progresso Interativa */}
        <Box sx={{ mt: 2.5, mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(0, 0, 0, 0.06)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: isAllCompleted
                  ? 'linear-gradient(90deg, #10B981, #059669)'
                  : 'linear-gradient(90deg, #3B82F6 0%, #14B8A6 100%)',
              },
            }}
          />
        </Box>

        {/* Lista de Passos Retrátil */}
        <Collapse in={!isCollapsed}>
          <Stack spacing={1.5} sx={{ mt: 2.5 }}>
            {steps.map((step) => {
              const completed = isStepCompleted(step);
              const StepIcon = step.icon;

              return (
                <Box
                  key={step.id}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'flex-start', md: 'center' },
                    justifyContent: 'space-between',
                    p: 1.5,
                    px: 2,
                    borderRadius: 2,
                    bgcolor: completed ? 'rgba(255, 255, 255, 0.65)' : 'white',
                    border: '1px solid',
                    borderColor: completed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(226, 232, 240, 0.8)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                      borderColor: completed ? '#10B981' : '#3B82F6',
                    },
                  }}
                >
                  {/* Ícone de status + Conteúdo */}
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1 }}>
                    <Tooltip title={completed ? 'Clique para desmarcar' : 'Clique para marcar como concluído'}>
                      <IconButton
                        size="small"
                        onClick={() => toggleManualStep(step.id)}
                        disabled={step.id === 'step-welcome'}
                        sx={{
                          color: completed ? '#10B981' : '#94A3B8',
                          p: 0.5,
                          '&:hover': { color: completed ? '#059669' : '#3B82F6' },
                        }}
                      >
                        {completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                      </IconButton>
                    </Tooltip>

                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1.5,
                        display: { xs: 'none', sm: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: completed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(59, 130, 246, 0.08)',
                        color: completed ? '#10B981' : '#2563EB',
                        flexShrink: 0,
                      }}
                    >
                      <StepIcon size={16} />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          sx={{
                            color: completed ? 'text.secondary' : 'text.primary',
                            textDecoration: completed ? 'line-through' : 'none',
                            fontSize: '0.95rem',
                          }}
                        >
                          {step.title}
                        </Typography>
                        <Chip
                          label={step.estimatedTime}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.7rem',
                            bgcolor: completed ? 'rgba(16, 185, 129, 0.1)' : 'grey.100',
                            color: completed ? '#065F46' : 'text.secondary',
                            border: 'none',
                          }}
                        />
                      </Stack>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: '0.825rem',
                          mt: 0.3,
                          opacity: completed ? 0.75 : 1,
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Botão de Ação Direta */}
                  {step.actionPath && (
                    <Box
                      sx={{
                        mt: { xs: 1.5, md: 0 },
                        ml: { xs: 4, md: 2 },
                        alignSelf: { xs: 'flex-start', md: 'center' },
                      }}
                    >
                      <Button
                        size="small"
                        variant={completed ? 'outlined' : 'contained'}
                        color={completed ? 'inherit' : 'primary'}
                        endIcon={<ArrowRight size={16} />}
                        onClick={() => navigate(step.actionPath)}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: '0.825rem',
                          borderRadius: 2,
                          py: 0.7,
                          px: 2,
                          ...(completed && {
                            color: 'text.secondary',
                            borderColor: 'grey.300',
                            '&:hover': { bgcolor: 'grey.100' },
                          }),
                        }}
                      >
                        {step.actionLabel}
                      </Button>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Stack>

          {/* Rodapé com Atalho Amigável para o Tour de Menus */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            sx={{
              mt: 2.5,
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'rgba(226, 232, 240, 0.8)',
            }}
          >
            <Typography variant="caption" color="text.secondary">
              💡 <strong>Dica clínica:</strong> Você pode clicar nos círculos para marcar/desmarcar tarefas manualmente.
            </Typography>

            <Button
              size="small"
              startIcon={<HelpCircle size={14} />}
              onClick={startTour}
              sx={{
                textTransform: 'none',
                color: 'text.secondary',
                fontSize: '0.8rem',
                mt: { xs: 1, sm: 0 },
                '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
              }}
            >
              Prefere ver onde fica cada menu? Iniciar tour rápido
            </Button>
          </Stack>
        </Collapse>
      </CardContent>
    </Card>
  );
}

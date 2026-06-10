import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowLeft, CheckCircle, ClipboardCheck, Save } from 'lucide-react';
import TeacherReportRenderer from '@/components/teacher-report/TeacherReportRenderer';
import { useSaveTeacherReportResponse, useTeacherReportResponse } from '@/hooks/useTeacherReportV2';
import { getTeacherReportSchema } from '@/utils/teacherReportSchema';

const AUTOSAVE_INTERVAL_MS = 30_000;

export default function TeacherReportRespondPage() {
  const { responseId } = useParams<{ responseId: string }>();
  const navigate = useNavigate();

  const { data: response, isLoading, isError } = useTeacherReportResponse(responseId ?? '');
  const { mutateAsync: save, isPending: isSaving } = useSaveTeacherReportResponse();

  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [finaliseOpen, setFinaliseOpen] = useState(false);

  const latestValues = useRef<Record<string, unknown>>({});
  const pendingFinalValues = useRef<Record<string, unknown>>({});
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeSnackbar = () => setSnackbar((state) => ({ ...state, open: false }));

  useEffect(() => {
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, []);

  const scheduleAutosave = useCallback(
    (values: Record<string, unknown>) => {
      latestValues.current = values;
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
      autosaveTimer.current = setTimeout(async () => {
        if (!responseId) return;
        try {
          await save({ id: responseId, answers: latestValues.current, status: 'draft' });
          setLastSaved(new Date());
        } catch {
          // Manual save remains available if autosave fails.
        }
      }, AUTOSAVE_INTERVAL_MS);
    },
    [responseId, save],
  );

  const handleDraftSave = async (values: Record<string, unknown>) => {
    if (!responseId) return;
    try {
      await save({ id: responseId, answers: values, status: 'draft' });
      setLastSaved(new Date());
      setSnackbar({ open: true, message: 'Rascunho salvo com sucesso.', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Erro ao salvar. Tente novamente.', severity: 'error' });
    }
  };

  const requestFinalSubmit = (values: Record<string, unknown>) => {
    pendingFinalValues.current = values;
    setFinaliseOpen(true);
  };

  const handleFinalSubmit = async () => {
    if (!responseId) return;
    setFinaliseOpen(false);
    try {
      await save({ id: responseId, answers: pendingFinalValues.current, status: 'completed' });
      setSnackbar({ open: true, message: 'Relatório finalizado com sucesso.', severity: 'success' });
      setTimeout(() => navigate('/app/teacher-report/templates'), 1500);
    } catch {
      setSnackbar({ open: true, message: 'Erro ao finalizar. Tente novamente.', severity: 'error' });
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography color="text.secondary">Carregando relatório do professor...</Typography>
        </Stack>
      </Box>
    );
  }

  if (isError || !response) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Relatório do professor não encontrado ou ocorreu um erro ao carregá-lo.
      </Alert>
    );
  }

  const schema = getTeacherReportSchema(response);
  const isCompleted = response.status === 'completed';

  return (
    <Stack spacing={3} sx={{ maxWidth: 860, mx: 'auto' }}>
      <Box>
        <Button
          variant="text"
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate('/app/teacher-report/templates')}
          sx={{ mb: 1, pl: 0 }}
        >
          Voltar aos modelos
        </Button>

        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="overline" color="primary" fontWeight={700}>
              Relatório do professor
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              {response.templateName ?? 'Formulário'}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            {isCompleted && (
              <Chip icon={<CheckCircle size={14} />} label="Concluído" color="success" size="small" />
            )}
            {lastSaved && (
              <Typography variant="caption" color="text.secondary">
                Salvo às {lastSaved.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>

      {isCompleted && (
        <Alert severity="success" icon={<CheckCircle size={20} />}>
          Este relatório já foi finalizado e está em modo de visualização.
        </Alert>
      )}

      <Card variant="outlined">
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <TeacherReportRenderer
            schema={schema}
            defaultValues={response.answers as Record<string, unknown>}
            readOnly={isCompleted}
            onValuesChange={scheduleAutosave}
          >
            {({ handleSubmit, isDirty }) =>
              !isCompleted ? (
                <Box
                  sx={{
                    pt: 3,
                    mt: 2,
                    borderTop: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : <Save size={18} />}
                    onClick={handleSubmit(handleDraftSave)}
                    disabled={isSaving || !isDirty}
                  >
                    {isSaving ? 'Salvando...' : 'Salvar rascunho'}
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<ClipboardCheck size={18} />}
                    onClick={handleSubmit(requestFinalSubmit)}
                    disabled={isSaving}
                  >
                    Finalizar relatório
                  </Button>
                </Box>
              ) : null
            }
          </TeacherReportRenderer>
        </CardContent>
      </Card>

      <Dialog open={finaliseOpen} onClose={() => setFinaliseOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>Finalizar relatório?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Após finalizar, o relatório ficará marcado como <strong>concluído</strong>. Deseja continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setFinaliseOpen(false)} disabled={isSaving}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleFinalSubmit}
            disabled={isSaving}
            startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : <ClipboardCheck size={16} />}
          >
            {isSaving ? 'Finalizando...' : 'Sim, finalizar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={closeSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

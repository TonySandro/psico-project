import { useCallback, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stack,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Snackbar,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Save, CheckCircle, ArrowLeft, ClipboardCheck } from 'lucide-react';
import { useAnamnesisResponse, useSaveAnamnesisResponse } from '@/hooks/useAnamnesisV2';
import AnamneseRenderer from '@/components/anamnese/AnamneseRenderer';

const AUTOSAVE_INTERVAL_MS = 30_000; // 30 s

export default function RespondPage() {
  const { responseId } = useParams<{ responseId: string }>();
  const navigate = useNavigate();

  const { data: response, isLoading, isError } = useAnamnesisResponse(responseId ?? '');
  const { mutateAsync: save, isPending: isSaving } = useSaveAnamnesisResponse();

  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // ── Finalise confirmation dialog ─────────────────────────────────────────
  const [finaliseOpen, setFinaliseOpen] = useState(false);
  const pendingFinalValues = useRef<Record<string, unknown>>({});

  const closeSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  // ── Autosave timer ───────────────────────────────────────────────────────
  const latestValues = useRef<Record<string, unknown>>({});
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          // Silent — user can manually save
        }
      }, AUTOSAVE_INTERVAL_MS);
    },
    [responseId, save],
  );

  // ── Manual save (draft) ──────────────────────────────────────────────────
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

  // ── Final submit — opens confirmation dialog first ─────────────────────
  const requestFinalSubmit = (values: Record<string, unknown>) => {
    pendingFinalValues.current = values;
    setFinaliseOpen(true);
  };

  const handleFinalSubmit = async () => {
    if (!responseId) return;
    setFinaliseOpen(false);
    try {
      await save({ id: responseId, answers: pendingFinalValues.current, status: 'completed' });
      setSnackbar({ open: true, message: 'Anamnese finalizada com sucesso!', severity: 'success' });
      setTimeout(() => navigate('/app/anamneses/templates'), 1500);
    } catch {
      setSnackbar({ open: true, message: 'Erro ao finalizar. Tente novamente.', severity: 'error' });
    }
  };

  // ── Loading / Error states ────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography color="text.secondary">Carregando anamnese...</Typography>
        </Stack>
      </Box>
    );
  }

  if (isError || !response) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Anamnese não encontrada ou ocorreu um erro ao carregá-la.
      </Alert>
    );
  }

  const schema = response.schema;
  const isCompleted = response.status === 'completed';

  return (
    <Stack spacing={3} sx={{ maxWidth: 860, mx: 'auto' }}>
      {/* ── Back + Header ─────────────────────────────────────────────────── */}
      <Box>
        <Button
          variant="text"
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate('/app/anamneses/templates')}
          sx={{ mb: 1, pl: 0 }}
        >
          Voltar aos modelos
        </Button>

        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="overline" color="primary" fontWeight={700}>
              Anamnese
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              {response.templateName ?? 'Formulário'}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            {isCompleted && (
              <Chip
                icon={<CheckCircle size={14} />}
                label="Concluída"
                color="success"
                size="small"
              />
            )}
            {lastSaved && (
              <Typography variant="caption" color="text.secondary">
                Salvo às {lastSaved.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* ── Completed Banner ──────────────────────────────────────────────── */}
      {isCompleted && (
        <Alert severity="success" icon={<CheckCircle size={20} />}>
          Esta anamnese já foi finalizada e está em modo de visualização.
        </Alert>
      )}

      {/* ── Form Card ─────────────────────────────────────────────────────── */}
      <Card variant="outlined">
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <AnamneseRenderer
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
                  {/* Save draft */}
                  <Button
                    variant="outlined"
                    startIcon={
                      isSaving ? <CircularProgress size={16} color="inherit" /> : <Save size={18} />
                    }
                    onClick={handleSubmit(handleDraftSave)}
                    disabled={isSaving || !isDirty}
                  >
                    {isSaving ? 'Salvando...' : 'Salvar rascunho'}
                  </Button>

                  {/* Finalise */}
                  <Button
                    variant="contained"
                    startIcon={<ClipboardCheck size={18} />}
                    onClick={handleSubmit(requestFinalSubmit)}
                    disabled={isSaving}
                  >
                    Finalizar anamnese
                  </Button>
                </Box>
              ) : null
            }
          </AnamneseRenderer>
        </CardContent>
      </Card>

      {/* ── Finalise confirmation Dialog ──────────────────────────────────── */}
      <Dialog open={finaliseOpen} onClose={() => setFinaliseOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>Finalizar anamnese?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Após finalizar, a anamnese ficará marcada como <strong>concluída</strong> e não poderá
            ser editada. Deseja continuar?
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

      {/* ── Snackbar feedback ────────────────────────────────────────────── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

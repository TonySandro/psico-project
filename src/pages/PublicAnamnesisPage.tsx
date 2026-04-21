import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { CheckCircle2, ClipboardList } from 'lucide-react';
import { useGetPublicAnamnesis, useSubmitPublicAnamnesis } from '@/hooks/useAnamnesis';
import AnamnesisRenderer from '@/components/anamnesis/AnamnesisRenderer';
import { DEFAULT_ANAMNESIS } from '@/constants/defaultAnamnesis';

export default function PublicAnamnesisPage() {
  const { token } = useParams<{ token: string }>();
  
  const { data, isLoading, isError, error } = useGetPublicAnamnesis(token || '');
  const { mutateAsync: submitAnswers, isPending: isSubmitting } = useSubmitPublicAnamnesis();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<Record<string, unknown>>({});

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography color="text.secondary">Carregando formulário...</Typography>
        </Stack>
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="error" variant="filled">
           {/* @ts-ignore */}
          {error?.response?.data?.message || "Link inválido ou expirado. Por favor, solicite um novo link ao profissional."}
        </Alert>
      </Container>
    );
  }

  if (isSuccess) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card sx={{ textAlign: 'center', py: 6, px: 3 }}>
          <Stack alignItems="center" spacing={2}>
            <CheckCircle2 size={64} color="#2e7d32" />
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Anamnese enviada com sucesso!
            </Typography>
            <Typography color="text.secondary">
              Agradecemos pelo preenchimento. As informações já foram enviadas para o profissional responsável.
            </Typography>
          </Stack>
        </Card>
      </Container>
    );
  }

  const handleRequestSubmit = (values: Record<string, unknown>) => {
    setPendingValues(values);
    setConfirmOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!token) return;
    setConfirmOpen(false);
    
    try {
      await submitAnswers({ token, answers: pendingValues });
      setIsSuccess(true);
    } catch (err) {
      alert('Erro ao enviar as respostas. Tente novamente mais tarde.');
    }
  };

  // Resolve o schema do modelo padrão dinâmico se a API antiga retornar vazio
  const schema = (data as any).schema || DEFAULT_ANAMNESIS.schema;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <Typography variant="overline" color="primary" fontWeight={700}>
          FORMULÁRIO DE AVALIAÇÃO
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
          {data.title || "Anamnese"}
        </Typography>
        {data.patientName && (
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Paciente: <strong>{data.patientName}</strong>
          </Typography>
        )}

        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <AnamnesisRenderer 
              schema={schema} 
              readOnly={isSuccess}
              lockPreFilledFields={true}
              defaultValues={{
                ident_nome: data.patient?.name || '',
                ident_idade: data.patient?.age?.toString() || '',
                ident_sexo: data.patient?.gender || '',
                ident_data_nascimento: data.patient?.dateOfBirth ? String(data.patient.dateOfBirth).split('T')[0] : '',
                ident_nome_mae: data.patient?.motherName || '',
                ident_nome_pai: data.patient?.fatherName || '',
                ident_serie: data.patient?.schoolYear || ''
              }}
            >
              {({ handleSubmit }) => (
                <Box sx={{ pt: 2, borderTop: 1, borderColor: 'divider', mt: { xs: 4, md: 6 } }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    onClick={handleSubmit(handleRequestSubmit)}
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <ClipboardList size={20} />}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar respostas'}
                  </Button>
                </Box>
              )}
            </AnamnesisRenderer>
          </CardContent>
        </Card>
      </Container>

      {/* ── Confirm Submit Dialog ─────────────────────────────────────────── */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>Deseja enviar as respostas?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Após o envio, não será possível alterar ou revisar o formulário. Tem certeza de que revisou tudo?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmOpen(false)} disabled={isSubmitting}>
            Revisar
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirmSubmit}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <CheckCircle2 size={16} />}
          >
            Sim, enviar anamnese
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

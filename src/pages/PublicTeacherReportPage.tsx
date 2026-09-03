import { useRef, useState } from 'react';
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
import { CheckCircle2, ClipboardList, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { useGetPublicTeacherReport, useSubmitPublicTeacherReport } from '@/hooks/useTeacherReport';
import TeacherReportRenderer from '@/components/teacher-report/TeacherReportRenderer';
import { DEFAULT_TEACHER_REPORT } from '@/constants/defaultTeacherReport';
import FormPrintView from '@/components/print/FormPrintView';

export default function PublicTeacherReportPage() {
  const { token } = useParams<{ token: string }>();
  
  const { data, isLoading, isError, error } = useGetPublicTeacherReport(token || '');
  const { mutateAsync: submitAnswers, isPending: isSubmitting } = useSubmitPublicTeacherReport();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<Record<string, unknown>>({});

  // Tracks the live form values so we can print them at any point
  const liveAnswersRef = useRef<Record<string, unknown>>({});
  const [printAnswers, setPrintAnswers] = useState<Record<string, unknown>>({});

  const printRef = useRef<HTMLDivElement>(null);
  const reactToPrint = useReactToPrint({ contentRef: printRef, documentTitle: 'Relatório do Professor' });
  const handlePrint = () => {
    setPrintAnswers({ ...liveAnswersRef.current });
    setTimeout(() => reactToPrint(), 0);
  };

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
              Relatório enviado com sucesso!
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
  const schema = (data as any).schema || DEFAULT_TEACHER_REPORT.schema;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <Typography variant="overline" color="primary" fontWeight={700}>
          FORMULÁRIO DE AVALIAÇÃO
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
          <Typography variant="h4" fontWeight={800}>
            {data.title || "Relatório do Professor"}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Printer size={16} />}
            onClick={() => handlePrint()}
            sx={{ '@media print': { display: 'none' } }}
          >
            Imprimir
          </Button>
        </Stack>
        {data.patientName && (
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Paciente: <strong>{data.patientName}</strong>
          </Typography>
        )}

        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <TeacherReportRenderer 
              schema={schema} 
              readOnly={isSuccess}
              lockPreFilledFields={true}
              onValuesChange={(values) => { liveAnswersRef.current = values; }}
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
              {({ handleSubmit, errors }) => {
                const getFieldLabel = (fieldId: string) => {
                  for (const section of schema.sections) {
                    const field = section.fields.find((f: any) => f.id === fieldId);
                    if (field) return field.label;
                  }
                  return fieldId;
                };

                const hasErrors = Object.keys(errors || {}).length > 0;

                return (
                  <Box sx={{ pt: 2, borderTop: 1, borderColor: 'divider', mt: { xs: 4, md: 6 } }}>
                    {hasErrors && (
                      <Alert severity="warning" sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                          Atenção: Os seguintes campos precisam ser preenchidos:
                        </Typography>
                        <Box component="ul" sx={{ m: 0, pl: 2, typography: 'body2' }}>
                          {Object.keys(errors).map(fieldId => (
                            <li key={fieldId}>{getFieldLabel(fieldId)}</li>
                          ))}
                        </Box>
                      </Alert>
                    )}
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={isSubmitting}
                      onClick={(e) => {
                        handleSubmit(handleRequestSubmit, () => {
                          // Scroll to the warning alert naturally after trying to submit
                        })(e);
                      }}
                      startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <ClipboardList size={20} />}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar respostas'}
                    </Button>
                  </Box>
                );
              }}
            </TeacherReportRenderer>
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
            Sim, enviar relatório
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Hidden print view ─────────────────────────────────────────── */}
      <Box sx={{ display: 'none' }}>
        <FormPrintView
          ref={printRef}
          title={data.title || 'Relatório do Professor'}
          subtitle="Relatório do Professor"
          patientName={data.patientName}
          schema={schema}
          answers={printAnswers}
        />
      </Box>
    </Box>
  );
}

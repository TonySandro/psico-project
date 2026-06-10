import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, FileEdit, FileText, Link as LinkIcon, Plus, Trash2 } from 'lucide-react';
import {
  useDeleteTeacherReportResponse,
  usePatientTeacherReportResponses,
} from '@/hooks/useTeacherReport';
import { formatDate } from '@/utils/formatters';
import TeacherReportLinkModal from './TeacherReportLinkModal';

interface TeacherReportCardProps {
  patientId: string;
}

export default function TeacherReportCard({ patientId }: TeacherReportCardProps) {
  const navigate = useNavigate();
  const { data: responses, isLoading } = usePatientTeacherReportResponses(patientId);
  const { mutate: deleteResponse, isPending: isDeleting } = useDeleteTeacherReportResponse(patientId);

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const hasResponses = responses && responses.length > 0;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ p: 1, bgcolor: 'secondary.50', borderRadius: 1, color: 'secondary.main' }}>
              <FileText size={24} />
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Relatório do Professor
            </Typography>
          </Stack>

          <Button
            color="secondary"
            size="small"
            startIcon={<Plus size={16} />}
            onClick={() => navigate(`/app/teacher-report/templates?patientId=${patientId}`)}
          >
            Novo relatório
          </Button>
        </Stack>

        <Stack spacing={2}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : hasResponses ? (
            responses.map((response) => (
              <Box
                key={response.id}
                sx={{
                  bgcolor: response.status === 'completed' ? 'success.50' : 'grey.50',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: response.status === 'completed' ? 'success.100' : 'grey.200',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {response.templateName || 'Relatório do Professor'}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      {response.status === 'completed' ? (
                        <CheckCircle2 size={14} color="#2e7d32" />
                      ) : (
                        <FileEdit size={14} color="#ed6c02" />
                      )}
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        color={response.status === 'completed' ? 'success.main' : 'warning.main'}
                      >
                        {response.status === 'completed' ? 'CONCLUÍDO' : 'EM RASCUNHO'}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {response.updatedAt ? formatDate(response.updatedAt) : '-'}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Button size="small" variant="outlined" onClick={() => navigate(`/app/teacher-report/respond/${response.id}`)}>
                    {response.status === 'completed' ? 'Visualizar' : 'Continuar'}
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => setDeleteTarget(response.id)}
                    sx={{ minWidth: 0, px: 1 }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </Stack>
              </Box>
            ))
          ) : (
            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, textAlign: 'center', border: '1px dashed', borderColor: 'grey.300' }}>
              <Typography variant="body2" color="text.secondary">
                Nenhum relatório do professor registrado para este paciente.
              </Typography>
            </Box>
          )}
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button color="primary" size="small" startIcon={<LinkIcon size={16} />} onClick={() => setIsLinkModalOpen(true)} fullWidth>
            Enviar link ao professor
          </Button>
        </Stack>

        <TeacherReportLinkModal open={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)} patientId={patientId} />

        <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs" fullWidth>
          <DialogTitle>Deletar relatório</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja deletar este relatório do professor? Esta ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteTarget(null)} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button
              color="error"
              variant="contained"
              disabled={isDeleting}
              onClick={() => {
                if (deleteTarget) {
                  deleteResponse(deleteTarget, {
                    onSuccess: () => setDeleteTarget(null),
                  });
                }
              }}
            >
              {isDeleting ? <CircularProgress size={18} color="inherit" /> : 'Deletar'}
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}

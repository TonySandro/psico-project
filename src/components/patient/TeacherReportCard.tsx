import { useState } from 'react';
import { Card, CardContent, Typography, Button, Stack, Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FileText, Link as LinkIcon, Plus, FileEdit, CheckCircle2, Trash2 } from 'lucide-react';
import TeacherReportLinkModal from './TeacherReportLinkModal';
import { useGenerateTeacherReportLink } from '@/hooks/useTeacherReport';
import { usePatientTeacherReportResponses, useDeleteTeacherReportResponse } from '@/hooks/useTeacherReportV2';
import { formatDate } from '@/utils/formatters';

interface TeacherReportCardProps {
    patientId: string;
}

export default function TeacherReportCard({ patientId }: TeacherReportCardProps) {
    const navigate = useNavigate();
    const { data: responses, isLoading: responsesLoading } = usePatientTeacherReportResponses(patientId);

    // Hooks for auto-creation logic
    const { mutateAsync: generateLink, isPending: isGeneratingLink } = useGenerateTeacherReportLink();

    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    const { mutate: deleteResponse, isPending: isDeleting } = useDeleteTeacherReportResponse(patientId);

    const hasNewTeacherReport = responses && responses.length > 0;
    const isCreatingTeacherReport = isGeneratingLink;

    const handleStartTeacherReport = async () => {
        try {
            const data = await generateLink(patientId);
            const fullUrl = `${window.location.origin}/teacher-report/responder/${data.token}`;
            window.open(fullUrl, '_blank');
        } catch (error) {
            console.error("Error starting teacher-report:", error);
            alert("Erro ao iniciar relatório do professor.");
        }
    };

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
                        disabled={isCreatingTeacherReport}
                        startIcon={isCreatingTeacherReport ? <CircularProgress size={16} /> : <Plus size={16} />}
                        onClick={handleStartTeacherReport}
                    >
                        Novo Relatório
                    </Button>
                </Stack>

                <Stack spacing={2}>
                    {/* List of Dynamic Teacher Reports */}
                    {responsesLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : hasNewTeacherReport ? (
                        responses.map((resp) => (
                            <Box
                                key={resp.id}
                                sx={{
                                    bgcolor: resp.status === 'completed' ? 'success.50' : 'grey.50',
                                    p: 2,
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: resp.status === 'completed' ? 'success.100' : 'grey.200',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Stack spacing={0.5}>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        {resp.templateName || 'Formulário Respondido'}
                                    </Typography>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            {resp.status === 'completed' ? (
                                                <CheckCircle2 size={14} color="#2e7d32" />
                                            ) : (
                                                <FileEdit size={14} color="#ed6c02" />
                                            )}
                                            <Typography variant="caption" fontWeight={600} color={resp.status === 'completed' ? 'success.main' : 'warning.main'}>
                                                {resp.status === 'completed' ? 'CONCLUÍDA' : 'EM RASCUNHO'}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="caption" color="text.secondary">
                                            {resp.updatedAt ? formatDate(resp.updatedAt) : '-'}
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction="row" spacing={1}>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => navigate(`/app/teacher-report/respond/${resp.id}`)}
                                    >
                                        {resp.status === 'completed' ? 'Visualizar' : 'Continuar'}
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                        onClick={() => setDeleteTarget(resp.id)}
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
                                Nenhum relatório de professor registrado para este paciente.
                            </Typography>
                        </Box>
                    )}
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Button
                        // variant="soft"
                        color="primary"
                        size="small"
                        startIcon={<LinkIcon size={16} />}
                        onClick={() => setIsLinkModalOpen(true)}
                        fullWidth
                    >
                        Enviar link externo
                    </Button>
                </Stack>

                <TeacherReportLinkModal
                    open={isLinkModalOpen}
                    onClose={() => setIsLinkModalOpen(false)}
                    patientId={patientId}
                />

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={!!deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                    maxWidth="xs"
                    fullWidth
                >
                    <DialogTitle>Deletar Relatório do Professor</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Tem certeza que deseja deletar este relatório? Esta ação não pode ser desfeita.
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

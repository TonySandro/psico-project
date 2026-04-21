import { useState } from 'react';
import { Card, CardContent, Typography, Button, Stack, Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FileText, Link as LinkIcon, Plus, FileEdit, CheckCircle2, Trash2 } from 'lucide-react';
import AnamnesisLinkModal from './AnamnesisLinkModal';
import { useGetAnamnesis, useGenerateAnamnesisLink } from '@/hooks/useAnamnesis';
import { usePatientAnamnesisResponses, useDeleteAnamnesisResponse } from '@/hooks/useAnamnesisV2';
import { formatDate } from '@/utils/formatters';

interface AnamnesisCardProps {
    patientId: string;
}

export default function AnamnesisCard({ patientId }: AnamnesisCardProps) {
    const navigate = useNavigate();
    const { data: legacyAnamnesis } = useGetAnamnesis(patientId);
    const { data: responses, isLoading: responsesLoading } = usePatientAnamnesisResponses(patientId);
    
    // Hooks for auto-creation logic
    const { mutateAsync: generateLink, isPending: isGeneratingLink } = useGenerateAnamnesisLink();
    
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    const { mutate: deleteResponse, isPending: isDeleting } = useDeleteAnamnesisResponse(patientId);

    const hasNewAnamnesis = responses && responses.length > 0;
    const isCreatingAnamnesis = isGeneratingLink;

    const handleStartAnamnesis = async () => {
        try {
            const data = await generateLink(patientId);
            const fullUrl = `${window.location.origin}/anamnesis/responder/${data.token}`;
            window.open(fullUrl, '_blank');
        } catch (error) {
            console.error("Error starting anamnesis:", error);
            alert("Erro ao iniciar anamnese.");
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
                            Anamnese
                        </Typography>
                    </Stack>

                    <Button
                        color="secondary"
                        size="small"
                        disabled={isCreatingAnamnesis}
                        startIcon={isCreatingAnamnesis ? <CircularProgress size={16} /> : <Plus size={16} />}
                        onClick={handleStartAnamnesis}
                    >
                        Nova Anamnese
                    </Button>
                </Stack>

                <Stack spacing={2}>
                    {/* List of Dynamic Anamnesis */}
                    {responsesLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : hasNewAnamnesis ? (
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
                                        {resp.templateName || 'Formulário Sem Nome'}
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
                                        onClick={() => navigate(`/app/anamnesis/respond/${resp.id}`)}
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
                    ) : !legacyAnamnesis && (
                        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, textAlign: 'center', border: '1px dashed', borderColor: 'grey.300' }}>
                            <Typography variant="body2" color="text.secondary">
                                Nenhuma anamnese registrada para este paciente.
                            </Typography>
                        </Box>
                    )}

                    {/* Legacy Anamnesis (if exists) */}
                    {legacyAnamnesis && (
                        <Box sx={{ border: '1px solid', borderColor: 'divider', p: 2, borderRadius: 2 }}>
                            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ display: 'block', mb: 1 }}>
                                ANAMNESE ANTIGA (SISTEMA ANTERIOR)
                            </Typography>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Stack spacing={0.5}>
                                    <Typography variant="body2" fontWeight={600}>
                                        Ficha Original
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Data: {legacyAnamnesis.createdAt ? formatDate(legacyAnamnesis.createdAt) : '-'}
                                    </Typography>
                                </Stack>
                                <Button size="small" variant="text" onClick={() => navigate(`/app/patients/${patientId}/anamnesis/new`)}>
                                    Visualizar
                                </Button>
                            </Stack>
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

                <AnamnesisLinkModal
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
                    <DialogTitle>Deletar Anamnese</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Tem certeza que deseja deletar esta anamnese? Esta ação não pode ser desfeita.
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

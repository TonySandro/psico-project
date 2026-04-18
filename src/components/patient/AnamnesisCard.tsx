import { useState } from 'react';
import { Card, CardContent, Typography, Button, Stack, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FileText, Link as LinkIcon, Plus, FileEdit, CheckCircle2 } from 'lucide-react';
import AnamnesisLinkModal from './AnamnesisLinkModal';
import { useGetAnamnesis } from '@/hooks/useAnamnesis';
import { usePatientAnamnesisResponses, useAnamnesisTemplates, useCreateAnamnesisTemplate, useCreateAnamnesisResponse } from '@/hooks/useAnamnesisV2';
import { DEFAULT_ANAMNESIS } from '@/constants/defaultAnamnesis';
import { formatDate } from '@/utils/formatters';

interface AnamnesisCardProps {
    patientId: string;
}

export default function AnamnesisCard({ patientId }: AnamnesisCardProps) {
    const navigate = useNavigate();
    const { data: legacyAnamnesis } = useGetAnamnesis(patientId);
    const { data: responses, isLoading: responsesLoading } = usePatientAnamnesisResponses(patientId);
    
    // Hooks for auto-creation logic
    const { data: templates } = useAnamnesisTemplates();
    const { mutateAsync: createTemplate, isPending: isCreatingTemplate } = useCreateAnamnesisTemplate();
    const { mutateAsync: createResponse, isPending: isCreatingResponse } = useCreateAnamnesisResponse();
    
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

    const hasNewAnamnesis = responses && responses.length > 0;
    const isCreatingAnamnesis = isCreatingTemplate || isCreatingResponse;

    const handleStartAnamnesis = async () => {
        try {
            if (!templates) return;

            let targetTemplateId = '';
            
            if (templates.length === 0) {
                // Creates default if none
                const newTemplate = await createTemplate(DEFAULT_ANAMNESIS);
                targetTemplateId = newTemplate.id;
            } else if (templates.length === 1) {
                // Use the only template they have
                targetTemplateId = templates[0].id;
            } else {
                // Multiple templates exist, go to selector page
                navigate(`/app/anamnesis/templates?patientId=${patientId}`);
                return;
            }

            const response = await createResponse({ templateId: targetTemplateId, patientId });
            navigate(`/app/anamnesis/respond/${response.id}`);
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

                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => navigate(`/app/anamnesis/respond/${resp.id}`)}
                                >
                                    {resp.status === 'completed' ? 'Visualizar' : 'Continuar'}
                                </Button>
                            </Box>
                        ))
                    ) : !legacyAnamnesis && (
                        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, textAlign: 'center', border: '1px dashed', borderColor: 'grey.300' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Nenhuma anamnese registrada para este paciente.
                            </Typography>
                            <Button
                                variant="contained"
                                disabled={isCreatingAnamnesis}
                                startIcon={isCreatingAnamnesis ? <CircularProgress size={16} color="inherit" /> : <Plus size={18} />}
                                onClick={handleStartAnamnesis}
                            >
                                Iniciar do Zero
                            </Button>
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
            </CardContent>
        </Card>
    );
}

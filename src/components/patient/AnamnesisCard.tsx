import { Card, CardContent, Typography, Button, Stack, Box, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronRight } from 'lucide-react';
import { useGetAnamnesis } from '@/hooks/useAnamnesis';
import { formatDate } from '@/utils/formatters';

interface AnamnesisCardProps {
    patientId: string;
}

export default function AnamnesisCard({ patientId }: AnamnesisCardProps) {
    const navigate = useNavigate();
    const { data: anamnesis } = useGetAnamnesis(patientId);

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
                    {anamnesis && (
                        <Button
                            color="secondary"
                            size="small"
                            endIcon={<ChevronRight size={16} />}
                            sx={{ textTransform: 'none' }}
                        >
                            Ver Histórico Completo
                        </Button>
                    )}
                </Stack>

                <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack spacing={0.5}>
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                STATUS
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: anamnesis ? 'success.main' : 'warning.main' }} />
                                <Typography variant="body2" fontWeight={600}>
                                    {anamnesis ? 'Concluída' : 'Pendente'}
                                </Typography>
                            </Stack>
                        </Stack>

                        {anamnesis && (
                            <Stack spacing={0.5}>
                                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                    DATA
                                </Typography>
                                <Typography variant="body2" fontWeight={600}>
                                    {anamnesis.createdAt ? formatDate(anamnesis.createdAt) : '-'}
                                </Typography>
                            </Stack>
                        )}

                        <Tooltip title={!anamnesis ? "Funcionalidade indisponível no momento" : ""}>
                            <span>
                                <Button
                                    variant="contained"
                                    color={anamnesis ? 'inherit' : 'primary'}
                                    size="small"
                                    disabled={!anamnesis}
                                    sx={{
                                        ...(anamnesis && {
                                            bgcolor: 'white',
                                            color: 'text.primary',
                                            boxShadow: 1
                                        }),
                                        ...(!anamnesis && {
                                            boxShadow: 2
                                        })
                                    }}
                                    onClick={() => navigate(`/patients/${patientId}/anamnesis/new`)}
                                >
                                    {anamnesis ? 'Visualizar' : 'Criar'}
                                </Button>
                            </span>
                        </Tooltip>
                    </Stack>
                </Box>

                {anamnesis && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {anamnesis.reasonForReferral || "Sem resumo disponível."}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}


import { Card, CardContent, Typography, Button, Stack, Box, Grid, Chip, Alert, CircularProgress } from '@mui/material';
import { FileText, Plus, FileType } from 'lucide-react';
import type { Report } from '@/types/schema';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useCreateReport } from '@/hooks/useReports';

interface ReportListCardProps {
    report?: Report | null;
    patientId: string;
}

export default function ReportListCard({ report, patientId }: ReportListCardProps) {
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);
    const createReportMutation = useCreateReport();

    const handleCreateReport = async () => {
        if (!user) return;

        try {
            const newReport = await createReportMutation.mutateAsync({
                patientId,
                accountId: user.id,
                title: "Avaliação Neuropsicopedagógica - Inicial",
                content: {
                    type: "doc",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "Início da avaliação..."
                                }
                            ]
                        }
                    ]
                }
            });
            navigate(`/app/reports/${newReport.id}/edit`);
        } catch (error) {
            console.error('Error creating report:', error);
        }
    };

    const handleViewReport = (reportId: string) => {
        navigate(`/app/reports/${reportId}/edit`);
    };

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Box sx={{ p: 1, bgcolor: 'warning.50', borderRadius: 1, color: 'warning.main' }}>
                            <FileText size={24} />
                        </Box>
                        <Typography variant="h6" fontWeight={700}>
                            Relatório
                        </Typography>
                    </Stack>
                    {!report && (
                        <Button
                            variant="text"
                            startIcon={createReportMutation.isPending ? <CircularProgress size={18} color="inherit" /> : <Plus size={18} />}
                            disabled={createReportMutation.isPending}
                            sx={{ bgcolor: 'secondary.50', color: 'secondary.main', fontWeight: 600, '&:hover': { bgcolor: 'secondary.100' } }}
                            onClick={handleCreateReport}
                        >
                            {createReportMutation.isPending ? 'Criando...' : 'Novo Relatório'}
                        </Button>
                    )}
                </Stack>

                {!report ? (
                    <Alert severity="info" variant="outlined">
                        Nenhum relatório encontrado para este paciente.
                    </Alert>
                ) : (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{
                                p: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <Box>
                                    <Stack direction="row" justifyContent="space-between" alignItems="start" mb={1}>
                                        <Box sx={{ p: 1, bgcolor: 'error.50', borderRadius: 1, color: 'error.main' }}>
                                            <FileType size={20} />
                                        </Box>
                                        <Chip
                                            label="RELATÓRIO"
                                            size="small"
                                            sx={{
                                                bgcolor: 'info.50',
                                                color: 'info.main',
                                                fontWeight: 700,
                                                fontSize: '0.7rem'
                                            }}
                                        />
                                    </Stack>
                                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                                        {report.title || 'Sem título'}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                                        {report.createdAt ? `Criado em ${new Date(report.createdAt).toLocaleDateString()}` : 'Data desconhecida'}
                                    </Typography>
                                </Box>

                                <Stack direction="row" spacing={1} mt={2}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleViewReport(report.id)}
                                    >
                                        Visualizar / Editar
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
}

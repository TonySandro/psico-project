import { Card, CardContent, Typography, Button, Stack, Box, Grid, Chip } from '@mui/material';
import { FileText, Plus, Download, FileType } from 'lucide-react';
// import { formatDate } from '@/utils/formatters';

interface ReportListCardProps {
    patientId: string;
}

// Mock data for reports since we don't have an endpoint yet
const MOCK_REPORTS = [
    {
        id: '1',
        title: 'Relatório de Avaliação Neuropsicopedagógica',
        date: '2023-10-05',
        status: 'ASSINADO',
        type: 'final'
    },
    {
        id: '2',
        title: 'Plano de Intervenção Individualizado',
        date: '2023-10-06',
        status: 'RASCUNHO',
        type: 'pei'
    }
];

export default function ReportListCard({ patientId: _patientId }: ReportListCardProps) {

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Box sx={{ p: 1, bgcolor: 'warning.50', borderRadius: 1, color: 'warning.main' }}>
                            <FileText size={24} />
                        </Box>
                        <Typography variant="h6" fontWeight={700}>
                            Relatórios
                        </Typography>
                    </Stack>
                    <Button
                        variant="text"
                        startIcon={<Plus size={18} />}
                        sx={{ bgcolor: 'secondary.50', color: 'secondary.main', fontWeight: 600, '&:hover': { bgcolor: 'secondary.100' } }}
                    >
                        Novo Relatório
                    </Button>
                </Stack>

                <Grid container spacing={2}>
                    {MOCK_REPORTS.map((report) => (
                        <Grid size={{ xs: 12, md: 6 }} key={report.id}>
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
                                            label={report.status}
                                            size="small"
                                            sx={{
                                                bgcolor: report.status === 'ASSINADO' ? 'success.50' : 'warning.50',
                                                color: report.status === 'ASSINADO' ? 'success.main' : 'warning.main',
                                                fontWeight: 700,
                                                fontSize: '0.7rem'
                                            }}
                                        />
                                    </Stack>
                                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                                        {report.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                                        Gerado em {report.date}
                                    </Typography>
                                </Box>

                                <Stack direction="row" spacing={1} mt={2}>
                                    <Button
                                        fullWidth
                                        variant={report.status === 'RASCUNHO' ? "contained" : "outlined"}
                                        color="primary"
                                        size="small"
                                    >
                                        {report.status === 'RASCUNHO' ? 'Continuar Edição' : 'Visualizar'}
                                    </Button>
                                    {report.status === 'ASSINADO' && (
                                        <Box sx={{
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 1,
                                            p: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            '&:hover': { bgcolor: 'grey.50' }
                                        }}>
                                            <Download size={16} />
                                        </Box>
                                    )}
                                </Stack>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}

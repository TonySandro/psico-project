import { Dialog, DialogContent, Button, Typography, Box, Grid, Chip, Stack } from '@mui/material';
import { ClipboardCheck } from 'lucide-react';
import type { Protocol } from '@/types/schema';
import { formatDate } from '@/utils/formatters';
import { translateTestKey, translateTestValue } from '@/utils/test-translations';

interface TestResultDialogProps {
    open: boolean;
    onClose: () => void;
    protocol: Protocol | null;
}

const LabelValue = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Box
        sx={{
            p: 2.5,
            bgcolor: 'rgba(248, 250, 252, 0.4)',
            borderRadius: 3,
            border: '1px solid #f1f5f9',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            '&:hover': {
                bgcolor: '#ffffff',
                borderColor: '#e2e8f0',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
                transform: 'translateY(-3px)'
            }
        }}
    >
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', mb: 0.5, display: 'block' }}>
            {label}
        </Typography>
        <Typography variant="body1" sx={{ color: '#0f172a', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.3 }}>
            {value || '-'}
        </Typography>
    </Box>
);

const StroopResultView = ({ data }: { data: any }) => (
    <Grid container spacing={2.5}>
        <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle1" sx={{ color: '#334155', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component="span" sx={{ width: 4, height: 16, bgcolor: '#3b82f6', borderRadius: 1 }} />
                Tempos (segundos)
            </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}><LabelValue label="Tarefa 1" value={data.task1Time} /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><LabelValue label="Tarefa 2" value={data.task2Time} /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><LabelValue label="Tarefa 3" value={data.task3Time} /></Grid>

        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#334155', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component="span" sx={{ width: 4, height: 16, bgcolor: '#ef4444', borderRadius: 1 }} />
                Erros
            </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}><LabelValue label="Tarefa 1" value={data.task1Errors} /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><LabelValue label="Tarefa 2" value={data.task2Errors} /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><LabelValue label="Tarefa 3" value={data.task3Errors} /></Grid>
    </Grid>
);

const ATAResultView = ({ data }: { data: any }) => {
    const scores = data.scores || {};
    return (
        <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ color: '#334155', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box component="span" sx={{ width: 4, height: 16, bgcolor: '#8b5cf6', borderRadius: 1 }} />
                    Pontuações de Atenção
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}><LabelValue label="Focada" value={scores.focusedAttention} /></Grid>
            <Grid size={{ xs: 12, sm: 4 }}><LabelValue label="Sustentada" value={scores.sustainedAttention} /></Grid>
            <Grid size={{ xs: 12, sm: 4 }}><LabelValue label="Alternada" value={scores.alternatingAttention} /></Grid>
        </Grid>
    );
};

const SnapResultView = ({ data }: { data: any }) => {
    return (
        <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ color: '#334155', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box component="span" sx={{ width: 4, height: 16, bgcolor: '#f59e0b', borderRadius: 1 }} />
                    Resumo do Questionário
                </Typography>
            </Grid>
            {Object.entries(data).map(([key, value]) => {
                if (typeof value === 'object') return null;
                return (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
                        <LabelValue
                            label={translateTestKey(key)}
                            value={translateTestValue(value)}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

const GenericResultView = ({ data }: { data: any }) => {
    return (
        <Grid container spacing={2.5}>
            {Object.entries(data).map(([key, value]) => {
                if (typeof value === 'object' && value !== null) return null;
                return (
                    <Grid size={{ xs: 12, sm: 6 }} key={key}>
                        <LabelValue
                            label={translateTestKey(key)}
                            value={translateTestValue(value)}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default function TestResultDialog({ open, onClose, protocol }: TestResultDialogProps) {
    if (!protocol) return null;

    const renderContent = () => {
        switch (protocol.name) {
            case 'Stroop':
                return <StroopResultView data={protocol.data} />;
            case 'ATA':
                return <ATAResultView data={protocol.data} />;
            case 'SNAP':
                return <SnapResultView data={protocol.data} />;
            default:
                return <GenericResultView data={protocol.data} />;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
                    backgroundImage: 'none',
                    bgcolor: '#ffffff',
                    overflow: 'hidden'
                }
            }}
        >
            <Box
                sx={{
                    px: 4,
                    pt: 4,
                    pb: 3,
                    background: 'linear-gradient(180deg, #f8fafc 0%, rgba(248, 250, 252, 0) 100%)',
                    borderBottom: '1px solid #f1f5f9'
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Stack direction="row" spacing={2.5} alignItems="center">
                        <Box
                            sx={{
                                p: 1.5,
                                bgcolor: 'rgba(59, 130, 246, 0.1)',
                                color: '#3b82f6',
                                borderRadius: 3,
                                display: 'flex',
                                boxShadow: 'inset 0 0 0 1px rgba(59, 130, 246, 0.2)'
                            }}
                        >
                            <ClipboardCheck size={28} strokeWidth={2.5} />
                        </Box>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5, letterSpacing: '-0.5px' }}>
                                Resultado do Teste
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                                Realizado em <Box component="span" sx={{ color: '#475569', fontWeight: 600 }}>{protocol.createdAt ? formatDate(protocol.createdAt) : '-'}</Box>
                            </Typography>
                        </Box>
                    </Stack>
                    <Chip
                        label={protocol.name}
                        sx={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            letterSpacing: '0.5px',
                            borderRadius: '12px',
                            height: '32px',
                            boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
                            '& .MuiChip-label': {
                                px: 2.5
                            }
                        }}
                    />
                </Stack>
            </Box>

            <DialogContent sx={{ p: 4, '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { bgcolor: '#cbd5e1', borderRadius: '4px' } }}>
                {renderContent()}
            </DialogContent>

            <Box sx={{ px: 4, py: 3, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    disableElevation
                    sx={{
                        bgcolor: '#ffffff',
                        color: '#334155',
                        fontWeight: 700,
                        px: 4,
                        py: 1,
                        borderRadius: 2.5,
                        border: '1px solid #cbd5e1',
                        transition: 'all 0.2s',
                        '&:hover': {
                            bgcolor: '#f1f5f9',
                            borderColor: '#94a3b8',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }
                    }}
                >
                    FECHAR
                </Button>
            </Box>
        </Dialog>
    );
}

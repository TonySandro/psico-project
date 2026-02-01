import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid, Divider, Chip } from '@mui/material';
import type { Protocol } from '@/types/schema';
import { formatDate } from '@/utils/formatters';

interface TestResultDialogProps {
    open: boolean;
    onClose: () => void;
    protocol: Protocol | null;
}

const LabelValue = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Box>
        <Typography variant="caption" color="text.secondary" display="block">
            {label}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
            {value || '-'}
        </Typography>
    </Box>
);

const StroopResultView = ({ data }: { data: any }) => (
    <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" gutterBottom>Tempos (segundos)</Typography>
        </Grid>
        <Grid size={{ xs: 4 }}><LabelValue label="Tarefa 1" value={data.task1Time} /></Grid>
        <Grid size={{ xs: 4 }}><LabelValue label="Tarefa 2" value={data.task2Time} /></Grid>
        <Grid size={{ xs: 4 }}><LabelValue label="Tarefa 3" value={data.task3Time} /></Grid>

        <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" gutterBottom>Erros</Typography>
        </Grid>
        <Grid size={{ xs: 4 }}><LabelValue label="Tarefa 1" value={data.task1Errors} /></Grid>
        <Grid size={{ xs: 4 }}><LabelValue label="Tarefa 2" value={data.task2Errors} /></Grid>
        <Grid size={{ xs: 4 }}><LabelValue label="Tarefa 3" value={data.task3Errors} /></Grid>
    </Grid>
);

const ATAResultView = ({ data }: { data: any }) => {
    const scores = data.scores || {};
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" gutterBottom>Pontuações de Atenção</Typography>
            </Grid>
            <Grid size={{ xs: 4 }}><LabelValue label="Focada" value={scores.focusedAttention} /></Grid>
            <Grid size={{ xs: 4 }}><LabelValue label="Sustentada" value={scores.sustainedAttention} /></Grid>
            <Grid size={{ xs: 4 }}><LabelValue label="Alternada" value={scores.alternatingAttention} /></Grid>
        </Grid>
    );
};

const GenericResultView = ({ data }: { data: any }) => {
    return (
        <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, overflow: 'auto', maxHeight: 300 }}>
            <pre style={{ margin: 0, fontSize: '0.875rem', fontFamily: 'monospace' }}>
                {JSON.stringify(data, null, 2)}
            </pre>
        </Box>
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
            default:
                return <GenericResultView data={protocol.data} />;
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight={700}>
                        Resultado do Teste
                    </Typography>
                    <Chip label={protocol.name} color="primary" size="small" />
                </Box>
                <Typography variant="caption" color="text.secondary">
                    Realizado em {protocol.createdAt ? formatDate(protocol.createdAt) : '-'}
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                {renderContent()}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

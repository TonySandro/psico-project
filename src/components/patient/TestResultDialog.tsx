/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const isAboveCutoff = data.result === 'ABOVE_CUTOFF';
    const resultText = isAboveCutoff ? 'Acima do ponto de corte' : 'Abaixo do ponto de corte';
    
    return (
        <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ color: '#334155', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box component="span" sx={{ width: 4, height: 16, bgcolor: '#EF4444', borderRadius: 1 }} />
                    Resultado da Avaliação ATA
                </Typography>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 4 }}>
                <LabelValue label="Pontuação Total" value={`${data.totalScore ?? 0} / ${data.maxScore ?? 46}`} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
                <LabelValue label="Ponto de Corte" value={data.cutoff ?? 15} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
                <LabelValue 
                    label="Resultado" 
                    value={
                        <Box component="span" sx={{ color: isAboveCutoff ? '#ef4444' : '#10b981', fontWeight: 700 }}>
                            {resultText}
                        </Box>
                    } 
                />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
                <LabelValue label="Informante" value={data.informant || '-'} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <LabelValue label="Idade de Aplicação" value={data.ageInYears !== undefined ? `${data.ageInYears} anos` : '-'} />
            </Grid>
            
            {data.clinicalObservations && (
                <Grid size={{ xs: 12 }}>
                    <LabelValue label="Observações Clínicas" value={data.clinicalObservations} />
                </Grid>
            )}
            
            {data.interpretation && (
                <Grid size={{ xs: 12 }}>
                    <LabelValue label="Interpretação" value={data.interpretation} />
                </Grid>
            )}

            {data.reportText && (
                <Grid size={{ xs: 12 }}>
                    <LabelValue 
                        label="Texto para Relatório" 
                        value={
                            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#475569', whiteSpace: 'pre-wrap', fontWeight: 500, lineHeight: 1.6 }}>
                                {data.reportText}
                            </Typography>
                        } 
                    />
                </Grid>
            )}
        </Grid>
    );
};
const AQ10ChildResultView = ({ data }: { data: any }) => {
    const isAboveCutoff = data.result === 'ABOVE_CUTOFF';
    const resultText = isAboveCutoff ? 'Acima do ponto de corte' : 'Abaixo do ponto de corte';
    
    return (
        <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ color: '#334155', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box component="span" sx={{ width: 4, height: 16, bgcolor: '#8B5CF6', borderRadius: 1 }} />
                    Resultado da Avaliação AQ-10 Infantil
                </Typography>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 4 }}>
                <LabelValue label="Pontuação Total" value={`${data.totalScore ?? 0} / ${data.maxScore ?? 10}`} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
                <LabelValue label="Ponto de Corte" value={data.cutoff ?? 6} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
                <LabelValue 
                    label="Resultado" 
                    value={
                        <Box component="span" sx={{ color: isAboveCutoff ? '#ef4444' : '#10b981', fontWeight: 700 }}>
                            {resultText}
                        </Box>
                    } 
                />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
                <LabelValue label="Informante" value={data.informant || '-'} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <LabelValue label="Idade de Aplicação" value={data.ageInYears !== undefined ? `${data.ageInYears} anos` : '-'} />
            </Grid>
            
            {data.clinicalObservations && (
                <Grid size={{ xs: 12 }}>
                    <LabelValue label="Observações Clínicas" value={data.clinicalObservations} />
                </Grid>
            )}
            
            {data.interpretation && (
                <Grid size={{ xs: 12 }}>
                    <LabelValue label="Interpretação" value={data.interpretation} />
                </Grid>
            )}

            {data.reportText && (
                <Grid size={{ xs: 12 }}>
                    <LabelValue 
                        label="Texto para Relatório" 
                        value={
                            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#475569', whiteSpace: 'pre-wrap', fontWeight: 500, lineHeight: 1.6 }}>
                                {data.reportText}
                            </Typography>
                        } 
                    />
                </Grid>
            )}
        </Grid>
    );
};

const AQ10AdultResultView = ({ data }: { data: any }) => {
    const isAboveCutoff = data.result === 'ABOVE_CUTOFF';
    const resultText = isAboveCutoff ? 'Acima do ponto de corte' : 'Abaixo do ponto de corte';
    
    return (
        <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ color: '#334155', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box component="span" sx={{ width: 4, height: 16, bgcolor: '#6366F1', borderRadius: 1 }} />
                    Resultado da Avaliação AQ-10 Adulto
                </Typography>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 4 }}>
                <LabelValue label="Pontuação Total" value={`${data.totalScore ?? 0} / ${data.maxScore ?? 10}`} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
                <LabelValue label="Ponto de Corte" value={data.cutoff ?? 6} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
                <LabelValue 
                    label="Resultado" 
                    value={
                        <Box component="span" sx={{ color: isAboveCutoff ? '#ef4444' : '#10b981', fontWeight: 700 }}>
                            {resultText}
                        </Box>
                    } 
                />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
                <LabelValue label="Informante" value={data.informant || '-'} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <LabelValue label="Idade de Aplicação" value={data.ageInYears !== undefined ? `${data.ageInYears} anos` : '-'} />
            </Grid>
            
            {data.clinicalObservations && (
                <Grid size={{ xs: 12 }}>
                    <LabelValue label="Observações Clínicas" value={data.clinicalObservations} />
                </Grid>
            )}
            
            {data.interpretation && (
                <Grid size={{ xs: 12 }}>
                    <LabelValue label="Interpretação" value={data.interpretation} />
                </Grid>
            )}

            {data.reportText && (
                <Grid size={{ xs: 12 }}>
                    <LabelValue 
                        label="Texto para Relatório" 
                        value={
                            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#475569', whiteSpace: 'pre-wrap', fontWeight: 500, lineHeight: 1.6 }}>
                                {data.reportText}
                            </Typography>
                        } 
                    />
                </Grid>
            )}
        </Grid>
    );
};

const MChatResultView = ({ data }: { data: any }) => {
    const isHigh = data.result === 'HIGH_RISK';
    const isMedium = data.result === 'MEDIUM_RISK';
    const resultColor = isHigh ? '#ef4444' : isMedium ? '#f59e0b' : '#10b981';
    const resultText = translateTestValue(data.result);
    
    return (
        <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ color: '#334155', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box component="span" sx={{ width: 4, height: 16, bgcolor: '#EC4899', borderRadius: 1 }} />
                    Resultado da Avaliação M-CHAT-R
                </Typography>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 4 }}>
                <LabelValue label="Pontuação Total" value={`${data.totalScore ?? 0} / ${data.maxScore ?? 20}`} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
                <LabelValue label="Idade de Aplicação" value={data.ageInMonths !== undefined ? `${data.ageInMonths} meses` : '-'} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
                <LabelValue 
                    label="Classificação de Risco" 
                    value={
                        <Box component="span" sx={{ color: resultColor, fontWeight: 700 }}>
                            {resultText}
                        </Box>
                    } 
                />
            </Grid>
            
            <Grid size={{ xs: 12 }}>
                <LabelValue label="Informante" value={data.informant || '-'} />
            </Grid>
            
            {data.clinicalObservations && (
                <Grid size={{ xs: 12 }}>
                    <LabelValue label="Observações Clínicas" value={data.clinicalObservations} />
                </Grid>
            )}
            
            {data.interpretation && (
                <Grid size={{ xs: 12 }}>
                    <LabelValue label="Interpretação" value={data.interpretation} />
                </Grid>
            )}

            {data.reportText && (
                <Grid size={{ xs: 12 }}>
                    <LabelValue 
                        label="Texto para Relatório" 
                        value={
                            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#475569', whiteSpace: 'pre-wrap', fontWeight: 500, lineHeight: 1.6 }}>
                                {data.reportText}
                            </Typography>
                        } 
                    />
                </Grid>
            )}
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

const CarsResultView = ({ data }: { data: any }) => {
    const isSevere = data.interpretation === 'Autismo severo';
    const isLeveModerado = data.interpretation === 'Autismo leve a moderado';
    
    return (
        <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ color: '#334155', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box component="span" sx={{ width: 4, height: 16, bgcolor: '#3b82f6', borderRadius: 1 }} />
                    Resultado da Avaliação CARS
                </Typography>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
                <LabelValue label="Pontuação Total" value={`${data.totalScore?.toFixed(1) ?? '0.0'} / 60.0`} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <LabelValue 
                    label="Classificação" 
                    value={
                        <Box component="span" sx={{ color: isSevere ? '#ef4444' : isLeveModerado ? '#f59e0b' : '#10b981', fontWeight: 700 }}>
                            {data.interpretation}
                        </Box>
                    } 
                />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
                <LabelValue label="Paciente" value={data.patient || '-'} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <LabelValue label="Idade de Aplicação" value={data.age !== undefined ? `${data.age} anos` : '-'} />
            </Grid>
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
        switch (protocol.name as string) {
            case 'Stroop':
                return <StroopResultView data={protocol.data} />;
            case 'ATA':
                return <ATAResultView data={protocol.data} />;
            case 'AQ-10-Child':
            case 'AQ10-Child':
            case 'AQ10_Child':
                return <AQ10ChildResultView data={protocol.data} />;
            case 'AQ-10-Adult':
            case 'AQ10-Adult':
            case 'AQ10_Adult':
                return <AQ10AdultResultView data={protocol.data} />;
            case 'M-CHAT-R':
            case 'M-CHAT':
            case 'm-chat':
                return <MChatResultView data={protocol.data} />;
            case 'SNAP':
                return <SnapResultView data={protocol.data} />;
            case 'CARS':
            case 'Cars':
                return <CarsResultView data={protocol.data} />;
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

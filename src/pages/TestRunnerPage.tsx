/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Paper,
    Stack,
    TextField,
    Alert,
    Card,
    CardContent,
    Autocomplete,
    Checkbox,
    FormControlLabel,
    CircularProgress,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container
} from '@mui/material';
import { PlayCircle, Clock, Users, TicketCheck } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { useTestResult, useAddProtocol } from '@/hooks/useTests';
import { usePatients } from '@/hooks/usePatients';
import { useAuthStore } from '@/stores/authStore';
import type { Patient } from '@/types/schema';
import { TEST_DEFINITIONS } from '@/constants/test-definitions';

export default function TestRunnerPage() {
    const { type } = useParams<{ type: string }>();
    const user = useAuthStore((state) => state.user);
    const { mutate: processTest, isPending, data: result, error } = useTestResult();
    const { mutate: addProtocol, isPending: isSaving, isSuccess: isSaved } = useAddProtocol();

    // Verify if test exists
    const testDef = type ? TEST_DEFINITIONS[type] : undefined;

    // Fetch patients
    const { data: patients, isLoading: isLoadingPatients } = usePatients(user?.id || '');

    const [patientName, setPatientName] = useState('');
    const [age, setAge] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});

    // Effect to handle Anonymous toggle
    useEffect(() => {
        if (isAnonymous) {
            setPatientName('Não informado');
            setSelectedPatient(null);
            setAge('');
        } else {
            setPatientName('');
            setAge('');
        }
    }, [isAnonymous]);

    if (!testDef) {
        return <Navigate to="/app/tests" />;
    }

    const TestIcon = testDef.icon;

    const handlePatientChange = (_: any, newValue: Patient | null) => {
        setSelectedPatient(newValue);
        if (newValue) {
            setPatientName(newValue.name);
            setAge(newValue.age.toString());
        } else {
            setPatientName('');
            setAge('');
        }
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (type) {
            let data: Record<string, any> = {
                patientName,
                age: Number(age),
                ...formData
            };

            if (type === 'cars') {
                const scores = Array.from({ length: 15 }, (_, i) => Number(formData[`score_${i}`] || 0));
                data = {
                    patientName,
                    age: Number(age),
                    scores
                };
            } else if (type === 'ata') {
                data = {
                    patientName,
                    age: Number(age),
                    scores: {
                        focusedAttention: Number(formData.focusedAttention || 0),
                        sustainedAttention: Number(formData.sustainedAttention || 0),
                        alternatingAttention: Number(formData.alternatingAttention || 0)
                    }
                };
            }

            processTest({ testType: type, data }, {
                onSuccess: (testResult) => {
                    if (selectedPatient && user?.id) {
                        addProtocol({
                            patientId: selectedPatient.id,
                            accountId: user.id,
                            data: {
                                name: testDef.name,
                                type: type,
                                data: testResult
                            }
                        });
                    }
                }
            });
        }
    };

    const renderSpecificFields = () => {
        const renderInput = (label: string, field: string, type: 'text' | 'number' = 'number') => (
            <TextField
                label={label}
                type={type}
                fullWidth
                required
                value={formData[field] || ''}
                onChange={(e) => handleInputChange(field, type === 'number' ? Number(e.target.value) : e.target.value)}
            />
        );

        switch (type) {
            case 'stroop':
                return (
                    <Stack spacing={2}>
                        <Typography variant="subtitle1" fontWeight={600}>Resultados das Tarefas</Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            {renderInput("Tempo Tarefa 1 (s)", "task1Time")}
                            {renderInput("Erros Tarefa 1", "task1Errors")}
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            {renderInput("Tempo Tarefa 2 (s)", "task2Time")}
                            {renderInput("Erros Tarefa 2", "task2Errors")}
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            {renderInput("Tempo Tarefa 3 (s)", "task3Time")}
                            {renderInput("Erros Tarefa 3", "task3Errors")}
                        </Stack>
                    </Stack>
                );
            case 'ata':
                return (
                    <Stack spacing={2}>
                        <Typography variant="subtitle1" fontWeight={600}>Pontuações Obtidas</Typography>
                        {renderInput("Atenção Focada", "focusedAttention")}
                        {renderInput("Atenção Sustentada", "sustainedAttention")}
                        {renderInput("Atenção Alternada", "alternatingAttention")}
                    </Stack>
                );
            case 'cars':
                return (
                    <Stack spacing={2}>
                        <Typography variant="subtitle1" fontWeight={600}>Pontuações por Item (1-4)</Typography>
                        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(80px, 1fr))" gap={2}>
                            {Array.from({ length: 15 }, (_, i) => (
                                <TextField
                                    key={i}
                                    label={`Item ${i + 1}`}
                                    type="number"
                                    size="small"
                                    required
                                    inputProps={{ min: 1, max: 4, step: 0.5 }}
                                    value={formData[`score_${i}`] || ''}
                                    onChange={(e) => handleInputChange(`score_${i}`, Number(e.target.value))}
                                />
                            ))}
                        </Box>
                    </Stack>
                );
            case 'snap':
                return (
                    <Stack spacing={2}>
                        <Typography variant="subtitle1" fontWeight={600}>Respostas do Questionário (0-3)</Typography>
                        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(70px, 1fr))" gap={2}>
                            {Array.from({ length: 26 }, (_, i) => (
                                <TextField
                                    key={i}
                                    label={`Q${i + 1}`}
                                    type="number"
                                    size="small"
                                    inputProps={{ min: 0, max: 3 }}
                                    value={formData[`answer_${i}`] || ''}
                                    onChange={(e) => handleInputChange(`answer_${i}`, Number(e.target.value))}
                                />
                            ))}
                        </Box>
                    </Stack>
                );
            case 'token':
                return (
                    <Stack spacing={2}>
                        <Typography variant="subtitle1" fontWeight={600}>Resultado Final</Typography>
                        {renderInput("Total de Respostas Corretas", "correctAnswers")}
                    </Stack>
                );

            default:
                return (
                    <Alert severity="warning">Campos específicos não definidos para este teste.</Alert>
                );
        }
    };

    const renderResult = () => {
        if (!result) return null;

        const getLabel = (key: string) => {
            const translations: Record<string, string> = {
                patientName: 'Nome do Paciente',
                name: 'Nome',
                age: 'Idade',
                task1Time: 'Tempo Tarefa 1 (s)',
                task2Time: 'Tempo Tarefa 2 (s)',
                task3Time: 'Tempo Tarefa 3 (s)',
                task1Errors: 'Erros Tarefa 1',
                task2Errors: 'Erros Tarefa 2',
                task3Errors: 'Erros Tarefa 3',
                scores: 'Pontuações',
                focusedAttention: 'Atenção Focada',
                sustainedAttention: 'Atenção Sustentada',
                alternatingAttention: 'Atenção Alternada',
                answers: 'Respostas',
                correctAnswers: 'Respostas Corretas',
                schoolGrade: 'Série Escolar',
                writingScore: 'Escore Escrita',
                readingScore: 'Escore Leitura',
                arithmeticScore: 'Escore Aritmética',
                interpretation: 'Interpretação',
                percentile: 'Percentil',
                result: 'Resultado',
                score: 'Pontuação',
                classification: 'Classificação',
                obs: 'Observações',
                writing: 'Escrita',
                reading: 'Leitura',
                arithmetic: 'Aritmética',
                overall: 'Geral',
                status: 'Status',
                level: 'Nível'
            };
            return translations[key] || key.replace(/([A-Z])/g, ' $1').trim();
        };

        const formatValue = (value: any) => {
            if (typeof value !== 'string') return value;
            const valueTranslations: Record<string, string> = {
                'Superior': 'Superior',
                'Above Average': 'Acima da Média',
                'Average': 'Média',
                'Below Average': 'Abaixo da Média',
                'Low': 'Baixa',
                'Very Low': 'Muito Baixa',
                'High': 'Alta',
                'Very High': 'Muito Alta',
                'Deficit': 'Déficit',
                'Normal': 'Normal',
                'Borderline': 'Limítrofe'
            };
            return valueTranslations[value] || value;
        };

        const renderMetrics = (data: Record<string, any>) => (
            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(140px, 1fr))" gap={2}>
                {Object.entries(data).map(([key, value]) => {
                    if (typeof value === 'object') return null;
                    return (
                        <Paper key={key} elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                {getLabel(key)}
                            </Typography>
                            <Typography variant="h6" fontWeight="bold" color="primary.main">
                                {formatValue(value)}
                            </Typography>
                        </Paper>
                    )
                })}
            </Box>
        );

        return (
            <Card sx={{ borderTop: 4, borderColor: 'success.main', height: '100%' }} elevation={3}>
                <CardContent>
                    <Stack spacing={3}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
                            <Typography variant="h5" fontWeight="bold" color="success.main">
                                Resultado da Avaliação
                            </Typography>
                            <Chip label="Processado com Sucesso" color="success" variant="filled" />
                        </Box>

                        {selectedPatient && (
                            <Alert severity={isSaved ? "success" : isSaving ? "info" : "warning"}>
                                {isSaving ? "Salvando no cadastro do paciente..." :
                                    isSaved ? "Resultado salvo no cadastro do paciente!" :
                                        "Resultado gerado (Não salvo automaticamente)"}
                            </Alert>
                        )}

                        <Box>{renderMetrics(result)}</Box>

                        {Object.entries(result).map(([key, value]) => {
                            if (Array.isArray(value)) return null; // Simplified: skipping arrays for cleanup, handle if needed
                            if (typeof value === 'object' && value !== null) {
                                return (
                                    <Box key={key}>
                                        <Typography variant="subtitle2" gutterBottom sx={{ textTransform: 'uppercase', color: 'text.secondary', mt: 2 }}>
                                            {getLabel(key)}
                                        </Typography>
                                        {renderMetrics(value)}
                                    </Box>
                                )
                            }
                            return null;
                        })}
                    </Stack>
                </CardContent>
            </Card>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ pb: 4 }}>
            {/* Header Section */}
            <Stack spacing={3} sx={{ mb: 4 }}>
                <BackButton to="/app/tests" />

                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        bgcolor: `${testDef.color}08`,
                        border: '1px solid',
                        borderColor: `${testDef.color}30`,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                bgcolor: testDef.color,
                                color: 'white',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        >
                            <TestIcon size={40} />
                        </Box>

                        <Stack spacing={1} flex={1}>
                            <Box>
                                <Typography variant="overline" fontWeight={700} sx={{ color: testDef.color, letterSpacing: 1 }}>
                                    {testDef.name}
                                </Typography>
                                <Typography variant="h3" fontWeight={800} sx={{ color: 'text.primary', mb: 1 }}>
                                    {testDef.fullName}
                                </Typography>
                            </Box>
                            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '800px' }}>
                                {testDef.description}
                            </Typography>

                            <Stack direction="row" spacing={3} sx={{ mt: 2 }} flexWrap="wrap">
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Clock size={16} className="text-gray-500" />
                                    <Typography variant="body2" fontWeight={500} color="text.secondary">
                                        Tempo: {testDef.timeEstimate}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Users size={16} className="text-gray-500" />
                                    <Typography variant="body2" fontWeight={500} color="text.secondary">
                                        Público: {testDef.targetAge}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: result ? '1fr 1fr' : '350px 1fr' }} gap={4}>
                {/* Left Column: Instructions or Result if visible? keeping Instructions always visible is good for context unless result needs space */}
                <Stack spacing={4}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <TicketCheck className="text-primary" />
                                    <Typography variant="h6" fontWeight={700}>
                                        Guia de Aplicação
                                    </Typography>
                                </Stack>
                                <Divider />
                                <List dense disablePadding>
                                    {testDef.instructions.map((step, index) => (
                                        <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                                            <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                                                <Box sx={{
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: '50%',
                                                    bgcolor: 'primary.main',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {index + 1}
                                                </Box>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={step}
                                                primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>

                {/* Right Column (or Center): Form */}
                <Stack spacing={4}>
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={4}>
                                <Box>
                                    <Typography variant="h6" gutterBottom fontWeight={600}>
                                        1. Identificação do Paciente
                                    </Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isAnonymous}
                                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                                />
                                            }
                                            label="Paciente não cadastrado / Teste Anônimo"
                                        />
                                    </Box>

                                    <Stack spacing={2}>
                                        {!isAnonymous ? (
                                            <Autocomplete
                                                options={patients || []}
                                                getOptionLabel={(option) => option.name}
                                                value={selectedPatient}
                                                onChange={handlePatientChange}
                                                loading={isLoadingPatients}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Selecione o Paciente"
                                                        placeholder="Busque pelo nome..."
                                                        fullWidth
                                                        required={!isAnonymous}
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <>
                                                                    {isLoadingPatients ? <CircularProgress color="inherit" size={20} /> : null}
                                                                    {params.InputProps.endAdornment}
                                                                </>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        ) : (
                                            <TextField
                                                label="Nome do Paciente"
                                                value={patientName}
                                                disabled
                                                fullWidth
                                                sx={{ bgcolor: 'action.hover' }}
                                            />
                                        )}

                                        <TextField
                                            label="Idade do Paciente"
                                            type="number"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            fullWidth
                                            required
                                            helperText={selectedPatient ? "Calculado automaticamente do cadastro" : "Necessário para normas de correção"}
                                            InputProps={{
                                                readOnly: !!selectedPatient,
                                            }}
                                            sx={selectedPatient ? { bgcolor: 'action.hover' } : {}}
                                        />
                                    </Stack>
                                </Box>

                                <Divider />

                                <Box>
                                    <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
                                        2. Dados do Teste
                                    </Typography>
                                    {renderSpecificFields()}
                                </Box>

                                {error && (
                                    <Alert severity="error">
                                        Erro ao processar teste: {(error as Error).message}
                                    </Alert>
                                )}

                                <Box className="flex justify-end pt-4">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={isPending || isSaving}
                                        startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : <PlayCircle />}
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        {isPending ? 'Processando...' : 'Gerar Resultado'}
                                    </Button>
                                </Box>
                            </Stack>
                        </form>
                    </Paper>

                    {result && (
                        <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                            {renderResult()}
                        </Box>
                    )}
                </Stack>
            </Box>
        </Container>
    );
}



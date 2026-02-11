/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
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
    Container,
    Collapse
} from '@mui/material';
import { PlayCircle, Clock, Users, TicketCheck, RotateCcw, CheckCircle2 } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { useTestResult, useAddProtocol } from '@/hooks/useTests';
import { usePatients } from '@/hooks/usePatients';
import { useAuthStore } from '@/stores/authStore';
import type { Patient } from '@/types/schema';
import { TEST_DEFINITIONS } from '@/constants/test-definitions';

export default function TestRunnerPage() {
    const { type } = useParams<{ type: string }>();
    const user = useAuthStore((state) => state.user);
    const { mutate: processTest, isPending, data: result, error, reset: resetResult } = useTestResult();
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
    const [showForm, setShowForm] = useState(true);
    
    // Ref for scrolling to results
    const resultsSectionRef = useRef<HTMLDivElement>(null);

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

    // Scroll to results when they appear
    useEffect(() => {
        if (result && resultsSectionRef.current) {
            setTimeout(() => {
                resultsSectionRef.current?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    }, [result]);

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
                    setShowForm(false);
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

    const handleNewTest = () => {
        resetResult();
        setPatientName('');
        setAge('');
        setSelectedPatient(null);
        setIsAnonymous(false);
        setFormData({});
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(160px, 1fr))" gap={2.5}>
                {Object.entries(data).map(([key, value]) => {
                    if (typeof value === 'object') return null;
                    return (
                        <Paper 
                            key={key} 
                            elevation={0} 
                            sx={{ 
                                p: 2.5, 
                                bgcolor: 'white',
                                borderRadius: 2, 
                                border: '2px solid', 
                                borderColor: 'grey.200',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <Typography 
                                variant="caption" 
                                color="text.secondary" 
                                sx={{ 
                                    textTransform: 'uppercase', 
                                    letterSpacing: 0.5,
                                    fontWeight: 600,
                                    display: 'block',
                                    mb: 0.5
                                }}
                            >
                                {getLabel(key)}
                            </Typography>
                            <Typography variant="h5" fontWeight="bold" color="primary.main">
                                {formatValue(value)}
                            </Typography>
                        </Paper>
                    )
                })}
            </Box>
        );

        return (
            <Card 
                sx={{ 
                    borderTop: 4, 
                    borderColor: 'success.main',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)'
                }} 
                elevation={4}
            >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Stack spacing={4}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" gap={2}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: '12px',
                                        bgcolor: 'success.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                                    }}
                                >
                                    <CheckCircle2 size={28} />
                                </Box>
                                <Box>
                                    <Typography variant="overline" fontWeight={600} color="success.dark" sx={{ letterSpacing: 1 }}>
                                        Avaliação Concluída
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                                        Resultado da {testDef.name}
                                    </Typography>
                                </Box>
                            </Stack>
                            <Chip 
                                icon={<CheckCircle2 size={18} />}
                                label="Processado" 
                                color="success" 
                                variant="filled"
                                sx={{ px: 1, fontWeight: 600 }}
                            />
                        </Stack>

                        {selectedPatient && (
                            <Alert 
                                severity={isSaved ? "success" : isSaving ? "info" : "warning"}
                                sx={{ borderRadius: 2 }}
                            >
                                {isSaving ? "Salvando no cadastro do paciente..." :
                                    isSaved ? "✓ Resultado salvo no cadastro do paciente!" :
                                        "⚠️ Resultado gerado (Não salvo automaticamente)"}
                            </Alert>
                        )}

                        <Divider />

                        <Box>{renderMetrics(result)}</Box>

                        {Object.entries(result).map(([key, value]) => {
                            if (Array.isArray(value)) return null;
                            if (typeof value === 'object' && value !== null) {
                                return (
                                    <Box key={key}>
                                        <Typography 
                                            variant="subtitle1" 
                                            fontWeight={700}
                                            gutterBottom 
                                            sx={{ 
                                                textTransform: 'uppercase', 
                                                color: 'text.primary', 
                                                mt: 2,
                                                mb: 2,
                                                letterSpacing: 0.5
                                            }}
                                        >
                                            {getLabel(key)}
                                        </Typography>
                                        {renderMetrics(value)}
                                    </Box>
                                )
                            }
                            return null;
                        })}

                        <Divider sx={{ my: 2 }} />

                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Button
                                variant="outlined"
                                startIcon={<RotateCcw size={18} />}
                                onClick={handleNewTest}
                                sx={{
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    borderWidth: 2,
                                    '&:hover': {
                                        borderWidth: 2
                                    }
                                }}
                            >
                                Novo Teste
                            </Button>
                        </Box>
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

            {/* Form and Instructions Section */}
            <Collapse in={showForm}>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '350px 1fr' }} gap={4} sx={{ mb: 4 }}>
                    {/* Left Column: Instructions */}
                    <Stack spacing={4}>
                        <Card variant="outlined" sx={{ borderRadius: 2, position: { lg: 'sticky' }, top: { lg: 24 } }}>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                        <TicketCheck className="text-primary" size={24} />
                                        <Typography variant="h6" fontWeight={700}>
                                            Guia de Aplicação
                                        </Typography>
                                    </Stack>
                                    <Divider />
                                    <List dense disablePadding>
                                        {testDef.instructions.map((step, index) => (
                                            <ListItem key={index} alignItems="flex-start" sx={{ px: 0, py: 1 }}>
                                                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                                                    <Box sx={{
                                                        width: 24,
                                                        height: 24,
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
                                                    primaryTypographyProps={{ variant: 'body2', color: 'text.primary', lineHeight: 1.6 }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>

                    {/* Right Column: Form */}
                    <Stack spacing={4}>
                        <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
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
                                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                                            Erro ao processar teste: {(error as Error).message}
                                        </Alert>
                                    )}

                                    <Box display="flex" justifyContent="flex-end" pt={2}>
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
                                                boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
                                                '&:hover': {
                                                    boxShadow: '0 6px 20px 0 rgba(59, 130, 246, 0.5)'
                                                }
                                            }}
                                        >
                                            {isPending ? 'Processando...' : 'Gerar Resultado'}
                                        </Button>
                                    </Box>
                                </Stack>
                            </form>
                        </Paper>
                    </Stack>
                </Box>
            </Collapse>

            {/* Results Section - Full Width */}
            {result && (
                <Box 
                    ref={resultsSectionRef}
                    sx={{ 
                        animation: 'fadeIn 0.6s ease-in-out',
                        '@keyframes fadeIn': {
                            '0%': { opacity: 0, transform: 'translateY(20px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' }
                        }
                    }}
                >
                    {renderResult()}
                </Box>
            )}
        </Container>
    );
}



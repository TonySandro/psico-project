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
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    Collapse,
    MenuItem,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Radio,
    Chip
} from '@mui/material';
import { PlayCircle, Clock, Users, TicketCheck } from 'lucide-react';
import BackButton from '@/components/BackButton';
import TestResultDisplay from '@/components/TestResultDisplay';
import Tde2ResultDisplay from '@/components/Tde2ResultDisplay';
import { useTestResult, useAddProtocol } from '@/hooks/useTests';
import { useTde2Calculate, type Tde2ResultModel } from '@/hooks/useTde2';
import { usePatients } from '@/hooks/usePatients';
import { useAuthStore } from '@/stores/authStore';
import type { Patient } from '@/types/schema';
import { TEST_DEFINITIONS } from '@/constants/test-definitions';
import { SNAP_QUESTIONS } from '@/constants/snap-questions';

export default function TestRunnerPage() {
    const { type } = useParams<{ type: string }>();
    const user = useAuthStore((state) => state.user);
    const { mutate: processTest, isPending, data: result, error, reset: resetResult } = useTestResult();
    const { mutate: addProtocol, isPending: isSaving, isSuccess: isSaved } = useAddProtocol();

    const { mutate: calcularTde2, isPending: isPendingTde2, data: resultTde2, error: errorTde2, reset: resetTde2 } = useTde2Calculate();

    const testDef = type ? TEST_DEFINITIONS[type] : undefined;

    const { data: patients, isLoading: isLoadingPatients } = usePatients(user?.id || '');

    const [patientName, setPatientName] = useState('');
    const [age, setAge] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [showForm, setShowForm] = useState(true);
    const [validationError, setValidationError] = useState<string | null>(null);

    const resultsSectionRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        setValidationError(null);
    }, [type]);

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

    useEffect(() => {
        if (resultTde2 && resultsSectionRef.current) {
            setTimeout(() => {
                resultsSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }, [resultTde2]);

    if (!testDef) {
        return <Navigate to="/app/tests" />;
    }

    const TestIcon = testDef.icon;

    const handlePatientChange = (_: any, newValue: Patient | null) => {
        setValidationError(null);
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
        setValidationError(null);
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);
        if (type) {
            if (type === 'ata' || type === 'cars') {
                if (!isAnonymous && !selectedPatient) {
                    setValidationError('Por favor, selecione um paciente cadastrado ou ative a opção de Teste Anônimo.');
                    return;
                }
                if (!age) {
                    setValidationError('A idade do paciente é obrigatória.');
                    return;
                }
            }
            if (type === 'ata') {
                if (!formData.informant) {
                    setValidationError('Por favor, selecione o informante da aplicação.');
                    return;
                }
            }

            let data: Record<string, any> = {
                patientName,
                age: Number(age),
                ...formData
            };

            if (type === 'cars') {
                const scores = Array.from({ length: 15 }, (_, i) => Number(formData[`score_${i}`] ?? 1));
                data = {
                    patientId: isAnonymous ? 'anonymous' : (selectedPatient?.id || ''),
                    patientName: isAnonymous ? 'Não informado' : patientName,
                    age: Number(age),
                    scores
                };
            } else if (type === 'ata') {
                const subscales = Array.from({ length: 23 }, (_, i) => {
                    const code = `S${String(i + 1).padStart(2, '0')}`;
                    return {
                        code,
                        score: Number(formData[`subscale_${code}`] ?? 0)
                    };
                });
                data = {
                    patientId: isAnonymous ? 'anonymous' : (selectedPatient?.id || ''),
                    applicationDate: formData.applicationDate || new Date().toISOString().split('T')[0],
                    informant: formData.informant || '',
                    ageInYears: Number(age),
                    subscales,
                    clinicalObservations: formData.clinicalObservations || ''
                };
            } else if (type === 'snap') {
                const answers = Array.from({ length: 26 }, (_, i) => Number(formData[`answer_${i}`] ?? 0));
                data = {
                    patientName,
                    age: Number(age),
                    answers
                };
            } else if (type === 'token') {
                data = {
                    name: patientName,
                    age: Number(age),
                    correctAnswers: Number(formData.correctAnswers ?? 0)
                };
            } else if (type === 'tde2') {
                const payload = {
                    nomePaciente: patientName,
                    anoEscolar: String(formData.anoEscolar || '1º ano'),
                    subteste: (formData.subteste || 'ESCRITA') as 'ESCRITA' | 'LEITURA' | 'ARITMETICA',
                    pontuacaoTotal: Number(formData.pontuacaoTotal ?? 0),
                    tempoTotal: Number(formData.tempoTotal ?? 0),
                    unidadeTempo: (formData.unidadeTempo || 'minutos') as 'minutos' | 'segundos',
                    naoSabe: Number(formData.naoSabe ?? 0),
                    acertos: Number(formData.acertos ?? 0),
                    erros: Number(formData.erros ?? 0),
                };

                calcularTde2(payload, {
                    onSuccess: (tde2Result) => {
                        setShowForm(false);
                        if (selectedPatient && user?.id) {
                            addProtocol({
                                patientId: selectedPatient.id,
                                accountId: user.id,
                                data: {
                                    name: testDef!.name,
                                    type: type,
                                    data: tde2Result
                                }
                            });
                        }
                    }
                });
                return;
            }

            processTest({ testType: type, data }, {
                onSuccess: (testResult) => {
                    setShowForm(false);
                    if (type !== 'ata' && type !== 'cars' && selectedPatient && user?.id) {
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
        resetTde2();
        setPatientName('');
        setAge('');
        setSelectedPatient(null);
        setIsAnonymous(false);
        setFormData({});
        setValidationError(null);
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
                value={formData[field] ?? ''}
                onChange={(e) => handleInputChange(field, type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)}
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
            case 'ata': {
                const ataPreviewSum = Array.from({ length: 23 }, (_, i) => {
                    const code = `S${String(i + 1).padStart(2, '0')}`;
                    return Number(formData[`subscale_${code}`] ?? 0);
                }).reduce((sum, val) => sum + val, 0);

                return (
                    <Stack spacing={4}>
                        {/* Aviso Informativo */}
                        <Alert severity="info" sx={{ borderRadius: 2, border: '1px solid #bfdbfe', bgcolor: '#eff6ff', '& .MuiAlert-icon': { color: '#3b82f6' } }}>
                            <Typography variant="body2" sx={{ color: '#1e3a8a', fontWeight: 500, lineHeight: 1.6 }}>
                                A plataforma realiza apenas o registro e cálculo da pontuação da ATA. A aplicação, interpretação clínica e conclusão diagnóstica devem ser feitas por profissional habilitado, com base no material original, anamnese, observação clínica e demais instrumentos utilizados.
                            </Typography>
                        </Alert>

                        {/* Metadados da Aplicação */}
                        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
                            <TextField
                                label="Data da Aplicação"
                                type="date"
                                required
                                value={formData.applicationDate ?? new Date().toISOString().split('T')[0]}
                                onChange={(e) => handleInputChange('applicationDate', e.target.value)}
                                slotProps={{
                                    inputLabel: { shrink: true }
                                }}
                            />
                            <TextField
                                select
                                label="Informante"
                                required
                                value={formData.informant ?? ''}
                                onChange={(e) => handleInputChange('informant', e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Mãe">Mãe</MenuItem>
                                <MenuItem value="Pai">Pai</MenuItem>
                                <MenuItem value="Professor">Professor(a)</MenuItem>
                                <MenuItem value="Responsável">Responsável</MenuItem>
                                <MenuItem value="Profissional">Profissional</MenuItem>
                                <MenuItem value="Outro">Outro</MenuItem>
                            </TextField>
                        </Box>

                        <TextField
                            label="Observações Clínicas (Opcional)"
                            multiline
                            rows={3}
                            fullWidth
                            value={formData.clinicalObservations ?? ''}
                            onChange={(e) => handleInputChange('clinicalObservations', e.target.value)}
                            placeholder="Adicione observações clínicas sobre a aplicação ou comportamento do paciente..."
                        />

                        {/* Lista de Subescalas com Prévia */}
                        <Stack spacing={2}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                                <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                                    Subescalas (S01 a S23)
                                </Typography>
                                <Chip
                                    label={`Soma Prévia: ${ataPreviewSum} / 46`}
                                    color="primary"
                                    variant="outlined"
                                    sx={{ fontWeight: 700, borderRadius: 2 }}
                                />
                            </Box>

                            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
                                {Array.from({ length: 23 }, (_, i) => {
                                    const code = `S${String(i + 1).padStart(2, '0')}`;
                                    const fieldName = `subscale_${code}`;
                                    const currentValue = formData[fieldName] ?? 0;

                                    return (
                                        <Paper
                                            key={code}
                                            variant="outlined"
                                            sx={{
                                                p: 2,
                                                borderRadius: 3,
                                                bgcolor: currentValue > 0 ? 'rgba(59, 130, 246, 0.02)' : 'background.paper',
                                                borderColor: currentValue > 0 ? 'primary.light' : 'divider',
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                                                }
                                            }}
                                        >
                                            <Stack spacing={1.5}>
                                                <Typography variant="body2" fontWeight={700} color="text.secondary">
                                                    Subescala {code}
                                                </Typography>

                                                <Stack spacing={1}>
                                                    {[
                                                        { val: 0, label: 'Ausente' },
                                                        { val: 1, label: 'Presença de um indicador' },
                                                        { val: 2, label: 'Presença de dois ou mais indicadores' }
                                                    ].map((opt) => (
                                                        <Box
                                                            key={opt.val}
                                                            onClick={() => handleInputChange(fieldName, opt.val)}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                px: 2,
                                                                py: 0.75,
                                                                borderRadius: 2,
                                                                border: '1px solid',
                                                                borderColor: currentValue === opt.val ? 'primary.main' : 'rgba(0, 0, 0, 0.06)',
                                                                bgcolor: currentValue === opt.val ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.15s',
                                                                '&:hover': {
                                                                    bgcolor: currentValue === opt.val ? undefined : 'action.hover',
                                                                    borderColor: currentValue === opt.val ? 'primary.main' : 'grey.400'
                                                                }
                                                            }}
                                                        >
                                                            <Radio
                                                                checked={currentValue === opt.val}
                                                                size="small"
                                                                sx={{ p: 0.5, mr: 1 }}
                                                            />
                                                            <Typography variant="body2" fontWeight={currentValue === opt.val ? 600 : 400}>
                                                                [{opt.val}] {opt.label}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </Stack>
                                            </Stack>
                                        </Paper>
                                    );
                                })}
                            </Box>
                        </Stack>
                    </Stack>
                );
            }
            case 'cars': {
                const carsItems = [
                    'Relações Pessoais',
                    'Imitação',
                    'Resposta Emocional',
                    'Uso Corporal',
                    'Uso de Objetos',
                    'Resposta e Adaptação a Mudanças',
                    'Resposta Visual',
                    'Resposta Auditiva',
                    'Resposta e Uso do Paladar, Olfato e Tato',
                    'Medo ou Nervosismo',
                    'Comunicação Verbal',
                    'Comunicação Não-Verbal',
                    'Nível de Atividade',
                    'Nível e Consistência da Resposta Intelectual',
                    'Impressões Gerais'
                ];

                const getCarsScoreLabel = (score: number) => {
                    switch (score) {
                        case 1: return "Normal";
                        case 1.5: return "Normal a Leve (Intermediário)";
                        case 2: return "Levemente Anormal";
                        case 2.5: return "Leve a Moderado (Intermediário)";
                        case 3: return "Moderadamente Anormal";
                        case 3.5: return "Moderado a Grave (Intermediário)";
                        case 4: return "Gravemente Anormal";
                        default: return "";
                    }
                };

                const carsScores = [1, 1.5, 2, 2.5, 3, 3.5, 4];

                const carsPreviewSum = Array.from({ length: 15 }, (_, i) => {
                    return Number(formData[`score_${i}`] ?? 1);
                }).reduce((sum, val) => sum + val, 0);

                return (
                    <Stack spacing={4}>
                        {/* Aviso Informativo */}
                        <Alert severity="info" sx={{ borderRadius: 2, border: '1px solid #bfdbfe', bgcolor: '#eff6ff', '& .MuiAlert-icon': { color: '#3b82f6' } }}>
                            <Typography variant="body2" sx={{ color: '#1e3a8a', fontWeight: 500, lineHeight: 1.6 }}>
                                A plataforma realiza apenas o registro e cálculo da pontuação do CARS. A aplicação, interpretação clínica e conclusão diagnóstica devem ser feitas por profissional habilitado, com base no material original, anamnese, observação clínica e demais instrumentos utilizados.
                            </Typography>
                        </Alert>

                        {/* Título e Prévia */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                                Itens de Avaliação (1 a 15)
                            </Typography>
                            <Chip
                                label={`Soma Prévia: ${carsPreviewSum} / 60`}
                                color="primary"
                                variant="outlined"
                                sx={{ fontWeight: 700, borderRadius: 2 }}
                            />
                        </Box>

                        {/* Itens do CARS */}
                        <Stack spacing={2.5}>
                            {carsItems.map((itemTitle, index) => {
                                const fieldName = `score_${index}`;
                                const currentValue = formData[fieldName] ?? 1;

                                return (
                                    <Paper
                                        key={index}
                                        variant="outlined"
                                        sx={{
                                            p: 2.5,
                                            borderRadius: 3,
                                            bgcolor: currentValue > 1 ? 'rgba(59, 130, 246, 0.02)' : 'background.paper',
                                            borderColor: currentValue > 1 ? 'primary.light' : 'divider',
                                            transition: 'all 0.2s',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                                            }
                                        }}
                                    >
                                        <Stack spacing={2}>
                                            <Typography variant="body1" fontWeight={700} color="text.primary">
                                                Item {String(index + 1).padStart(2, '0')} - {itemTitle}
                                            </Typography>

                                            <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} gap={2}>
                                                {/* Seletores rápidos de pontuação */}
                                                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                                    {carsScores.map((scoreValue) => {
                                                        const isSelected = currentValue === scoreValue;
                                                        return (
                                                            <Button
                                                                key={scoreValue}
                                                                variant={isSelected ? "contained" : "outlined"}
                                                                size="small"
                                                                onClick={() => handleInputChange(fieldName, scoreValue)}
                                                                sx={{
                                                                    minWidth: '48px',
                                                                    borderRadius: 2,
                                                                    textTransform: 'none',
                                                                    fontWeight: isSelected ? 700 : 500,
                                                                    px: 1.5,
                                                                    py: 0.5
                                                                }}
                                                            >
                                                                {scoreValue.toFixed(1)}
                                                            </Button>
                                                        );
                                                    })}
                                                </Stack>
                                                <Chip
                                                    label={getCarsScoreLabel(currentValue)}
                                                    color={currentValue > 1 ? "primary" : "default"}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 600,
                                                        borderRadius: 1.5,
                                                        borderColor: currentValue > 1 ? 'primary.main' : 'divider',
                                                        bgcolor: currentValue > 1 ? 'rgba(59, 130, 246, 0.04)' : 'transparent'
                                                    }}
                                                />
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                );
                            })}
                        </Stack>
                    </Stack>
                );
            }
            case 'snap':
                return (
                    <Stack spacing={3}>
                        <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
                            Marque uma opção para cada comportamento abaixo:
                        </Typography>
                        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                            <Table size="small">
                                <TableHead sx={{ bgcolor: 'action.hover' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', width: '50%', py: 1.5 }}>Comportamento / Item</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', width: '12.5%' }}>Nem um pouco (0)</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', width: '12.5%' }}>Só um pouco (1)</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', width: '12.5%' }}>Bastante (2)</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', width: '12.5%' }}>Demais (3)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {SNAP_QUESTIONS.map((questionText, i) => (
                                        <TableRow key={i} hover sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                                            <TableCell sx={{ py: 1.5, fontSize: '0.95rem' }}>{questionText}</TableCell>
                                            {[0, 1, 2, 3].map((val) => (
                                                <TableCell key={val} align="center" sx={{ py: 1 }}>
                                                    <Radio
                                                        checked={formData[`answer_${i}`] === val}
                                                        onChange={() => handleInputChange(`answer_${i}`, val)}
                                                        name={`snap_question_${i}`}
                                                        value={val}
                                                        size="medium"
                                                        required
                                                        sx={{
                                                            color: 'divider',
                                                            '&.Mui-checked': {
                                                                color: 'primary.main',
                                                            }
                                                        }}
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                );
            case 'token':
                return (
                    <Stack spacing={2}>
                        <Typography variant="subtitle1" fontWeight={600}>Resultado Final</Typography>
                        {renderInput("Total de Respostas Corretas", "correctAnswers")}
                    </Stack>
                );
            case 'tde2':
                return (
                    <Stack spacing={3}>
                        {/* Configuração */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                Configuração do Teste
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    select
                                    label="Subteste"
                                    fullWidth
                                    required
                                    value={formData.subteste || ''}
                                    onChange={(e) => handleInputChange('subteste', e.target.value)}
                                >
                                    <MenuItem value="ESCRITA">Escrita</MenuItem>
                                    <MenuItem value="LEITURA">Leitura</MenuItem>
                                    <MenuItem value="ARITMETICA">Aritmética</MenuItem>
                                </TextField>
                                <TextField
                                    select
                                    label="Ano Escolar"
                                    fullWidth
                                    required
                                    value={formData.anoEscolar || ''}
                                    onChange={(e) => handleInputChange('anoEscolar', e.target.value)}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((g) => (
                                        <MenuItem key={g} value={`${g}º ano`}>{g}º Ano</MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                        </Box>

                        {/* Resultados brutos */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                Resultados Obtidos
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                {renderInput('Pontuação Total', 'pontuacaoTotal')}
                                {renderInput('Acertos', 'acertos')}
                                {renderInput('Erros', 'erros')}
                            </Stack>
                            <Box mt={2}>
                                {renderInput('Não Sabe (omissões)', 'naoSabe')}
                            </Box>
                        </Box>

                        {/* Tempo */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                Tempo de Execução
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                {renderInput('Tempo Total', 'tempoTotal')}
                                <TextField
                                    select
                                    label="Unidade"
                                    fullWidth
                                    required
                                    value={formData.unidadeTempo || 'minutos'}
                                    onChange={(e) => handleInputChange('unidadeTempo', e.target.value)}
                                >
                                    <MenuItem value="minutos">Minutos</MenuItem>
                                    <MenuItem value="segundos">Segundos</MenuItem>
                                </TextField>
                            </Stack>
                        </Box>
                    </Stack>
                );

            default:
                return (
                    <Alert severity="warning">Campos específicos não definidos para este teste.</Alert>
                );
        }
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
                            <form>
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

                                    {(error || errorTde2 || validationError) && (
                                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                                            {validationError ? validationError : `Erro ao processar teste: ${((error || errorTde2) as any)?.response?.data?.error || ((error || errorTde2) as Error).message}`}
                                        </Alert>
                                    )}

                                    <Box display="flex" justifyContent="flex-end" pt={2}>
                                        <Button
                                            type="button"
                                            onClick={handleSubmit}
                                            variant="contained"
                                            size="large"
                                            disabled={isPending || isPendingTde2 || isSaving}
                                            startIcon={(isPending || isPendingTde2) ? <CircularProgress size={20} color="inherit" /> : <PlayCircle />}
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
                                            {(isPending || isPendingTde2) ? 'Processando...' : 'Gerar Resultado'}
                                        </Button>
                                    </Box>
                                </Stack>
                            </form>
                        </Paper>
                    </Stack>
                </Box>
            </Collapse>

            {/* Results Section — TDE-II (fluxo próprio de dois estágios) */}
            {type === 'tde2' && resultTde2 && (
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
                    <Tde2ResultDisplay
                        resultData={resultTde2 as Tde2ResultModel}
                        isSaved={isSaved}
                        isSaving={isSaving}
                        hasPatient={!!selectedPatient}
                        onNewTest={handleNewTest}
                    />
                </Box>
            )}

            {/* Results Section — demais testes (genérico) */}
            {type !== 'tde2' && result && (
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
                    <TestResultDisplay
                        testName={testDef.name}
                        resultData={result}
                        isSaved={(type === 'ata' || type === 'cars') && !isAnonymous ? true : isSaved}
                        isSaving={(type === 'ata' || type === 'cars') && !isAnonymous ? false : isSaving}
                        hasPatient={!!selectedPatient}
                        onNewTest={handleNewTest}
                    />
                </Box>
            )}
        </Container>
    );
}



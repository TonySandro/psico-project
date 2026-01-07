/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Stack, TextField, Alert, Card, CardContent, Autocomplete, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { useTestResult, useAddProtocol } from '@/hooks/useTests';
import { usePatients } from '@/hooks/usePatients';
import { useAuthStore } from '@/stores/authStore';
import type { Patient } from '@/types/schema';

export default function TestRunnerPage() {
    const { type } = useParams<{ type: string }>();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const { mutate: processTest, isPending, data: result, error } = useTestResult();
    const { mutate: addProtocol, isPending: isSaving, isSuccess: isSaved } = useAddProtocol();

    // Fetch patients
    const { data: patients, isLoading: isLoadingPatients } = usePatients(user?.id || '');

    const [patientName, setPatientName] = useState('');
    const [age, setAge] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [isAnonymous, setIsAnonymous] = useState(false);

    const testName = type?.toUpperCase() || 'Teste';

    // State to hold all form values
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
            const data = {
                patientName,
                age: Number(age),
                ...formData
            };

            processTest({ testType: type, data }, {
                onSuccess: (testResult) => {
                    // Automatically save if patient is selected
                    if (selectedPatient && user?.id) {
                        addProtocol({
                            patientId: selectedPatient.id,
                            accountId: user.id,
                            data: {
                                name: testName,
                                type: type, // Store the test type key (e.g., 'stroop')
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
                value={formData[field] || ''}
                onChange={(e) => handleInputChange(field, type === 'number' ? Number(e.target.value) : e.target.value)}
            />
        );

        switch (type) {
            case 'stroop':
                return (
                    <Stack spacing={2}>
                        <Typography variant="h6">Resultados do Teste</Typography>
                        <Stack direction="row" spacing={2}>
                            {renderInput("Tempo Tarefa 1 (s)", "task1Time")}
                            {renderInput("Erros Tarefa 1", "task1Errors")}
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            {renderInput("Tempo Tarefa 2 (s)", "task2Time")}
                            {renderInput("Erros Tarefa 2", "task2Errors")}
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            {renderInput("Tempo Tarefa 3 (s)", "task3Time")}
                            {renderInput("Erros Tarefa 3", "task3Errors")}
                        </Stack>
                    </Stack>
                );
            case 'ata':
                return (
                    <Stack spacing={2}>
                        <Typography variant="h6">Pontuações</Typography>
                        {renderInput("Atenção Focada", "focusedAttention")}
                        {renderInput("Atenção Sustentada", "sustainedAttention")}
                        {renderInput("Atenção Alternada", "alternatingAttention")}
                    </Stack>
                );
            case 'cars':
                return (
                    <Stack spacing={2}>
                        <Typography variant="h6">Pontuações (1-4)</Typography>
                        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))" gap={2}>
                            {Array.from({ length: 15 }, (_, i) => (
                                <TextField
                                    key={i}
                                    label={`Item ${i + 1}`}
                                    type="number"
                                    size="small"
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
                        <Typography variant="h6">Respostas (0-3)</Typography>
                        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(80px, 1fr))" gap={2}>
                            {Array.from({ length: 26 }, (_, i) => (
                                <TextField
                                    key={i}
                                    label={`Q${i + 1}`}
                                    type="number"
                                    size="small"
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
                        <Typography variant="h6">Resultado</Typography>
                        {renderInput("Respostas Corretas (Total)", "correctAnswers")}
                    </Stack>
                );
            case 'tde':
                return (
                    <Stack spacing={2}>
                        <Typography variant="h6">Desempenho Escolar</Typography>
                        <TextField
                            select
                            label="Série Escolar"
                            value={formData["schoolGrade"] || ''}
                            onChange={(e) => handleInputChange("schoolGrade", e.target.value)}
                            fullWidth
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value=""></option>
                            <option value="1º ano">1º Ano</option>
                            <option value="2º ano">2º Ano</option>
                            <option value="3º ano">3º Ano</option>
                            <option value="4º ano">4º Ano</option>
                            <option value="5º ano">5º Ano</option>
                            <option value="6º ano">6º Ano</option>
                            <option value="7º ano">7º Ano</option>
                            <option value="8º ano">8º Ano</option>
                            <option value="9º ano">9º Ano</option>
                            <option value="Ensino Médio">Ensino Médio</option>
                        </TextField>
                        {renderInput("Escore Escrita", "writingScore")}
                        {renderInput("Escore Leitura", "readingScore")}
                        {renderInput("Escore Aritmética", "arithmeticScore")}
                    </Stack>
                );
            default:
                return (
                    <Box className="p-4 border border-dashed rounded-lg bg-gray-50 text-center text-gray-500">
                        Campos específicos do {testName} seriam preenchidos aqui.
                    </Box>
                );
        }
    };

    const renderFormFields = () => {
        return (
            <Stack spacing={3}>
                <Alert severity="info">
                    Preencha os dados abaixo para processar o resultado do teste.
                </Alert>

                <Box>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                            />
                        }
                        label="Paciente não cadastrado (avulso)"
                    />

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
                                    fullWidth
                                    required={!isAnonymous}
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {isLoadingPatients ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            ),
                                        },
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
                            helperText="Nome definido automaticamente como 'Não informado'"
                        />
                    )}
                </Box>

                <TextField
                    label="Idade"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    fullWidth
                    required
                    helperText={selectedPatient ? "Preenchido automaticamente pelo cadastro do paciente" : "Informe a idade"}
                />

                {renderSpecificFields()}
            </Stack>
        );
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
                // TDE Interpretation Keys
                writing: 'Escrita',
                reading: 'Leitura',
                arithmetic: 'Aritmética',
                overall: 'Geral',
                // Common Interpretation Keys
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

        // Helper to visualize simple key-value pairs
        const renderMetrics = (data: Record<string, any>) => (
            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(140px, 1fr))" gap={2}>
                {Object.entries(data).map(([key, value]) => {
                    // Skip objects or arrays in this simple view
                    if (typeof value === 'object') return null;
                    return (
                        <Paper key={key} elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
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
            <Card className="border-t-4 border-green-500 h-full" elevation={3}>
                <CardContent>
                    <Stack spacing={3}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h5" fontWeight="bold" color="success.main">
                                Resultado da Avaliação
                            </Typography>
                            {/* Example badge/status */}
                            <Box sx={{ bgcolor: 'success.light', color: 'success.dark', px: 2, py: 0.5, borderRadius: '16px', fontWeight: 'bold', fontSize: '0.875rem' }}>
                                Processado com Sucesso
                            </Box>
                        </Box>

                        {/* Status Message for Saving */}
                        {selectedPatient && (
                            <Alert severity={isSaved ? "success" : isSaving ? "info" : "warning"}>
                                {isSaving ? "Salvando no cadastro do paciente..." :
                                    isSaved ? "Resultado salvo no cadastro do paciente!" :
                                        "Resultado gerado (Não salvo automaticamente)"}
                            </Alert>
                        )}

                        {/* Dynamic Render based on result structure */}
                        <Box>
                            {renderMetrics(result)}
                        </Box>

                        {/* Special handling for nested objects/arrays (like scores or arrays) */}
                        {Object.entries(result).map(([key, value]) => {
                            if (Array.isArray(value)) {
                                return (
                                    <Box key={key}>
                                        <Typography variant="subtitle2" gutterBottom sx={{ textTransform: 'uppercase', color: 'text.secondary' }}>
                                            {getLabel(key)}
                                        </Typography>
                                        <Box display="flex" flexWrap="wrap" gap={1}>
                                            {value.map((v, i) => (
                                                <Box key={i} sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.light', color: 'white', borderRadius: '50%', fontSize: '0.875rem' }}>
                                                    {v}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                )
                            }
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
        <Box>
            <Stack direction="row" alignItems="center" spacing={2} className="mb-6">
                <Button
                    startIcon={<ArrowLeft size={20} />}
                    onClick={() => navigate('/tests')}
                    variant="outlined"
                >
                    Voltar
                </Button>
                <Typography variant="h4" fontWeight={700}>
                    Executar Teste: {testName}
                </Typography>
            </Stack>

            <Box className={`grid grid-cols-1 ${result ? 'lg:grid-cols-2' : ''} gap-6 items-start`}>
                <Paper className={`p-6 ${!result ? 'max-w-2xl mx-auto' : ''}`}>
                    <form onSubmit={handleSubmit}>
                        {renderFormFields()}

                        {error && (
                            <Alert severity="error" sx={{ mt: 3 }}>
                                Erro ao processar teste: {(error as Error).message}
                            </Alert>
                        )}

                        <Box className="flex justify-end mt-6">
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <PlayCircle size={20} />}
                                disabled={isPending || isSaving}
                            >
                                {isPending ? 'Processando...' : 'Processar Resultado'}
                            </Button>
                        </Box>
                    </form>
                </Paper>

                {result && (
                    <Box>
                        {renderResult()}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

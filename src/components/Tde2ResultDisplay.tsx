import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Stack,
    Alert,
    Card,
    CardContent,
    Chip,
    Divider,
    TextField,
    CircularProgress,
    Tooltip,
} from '@mui/material';
import {
    CheckCircle2,
    RotateCcw,
    BookOpen,
    AlertTriangle,
    Sparkles,
    Info,
    TrendingUp,
    Clock,
    FileText,
    Zap,
} from 'lucide-react';
import type {
    Tde2ResultModel,
    Tde2InterpretResult,
    Tde2IndicadorComPercentil,
} from '@/hooks/useTde2';
import { useTde2Interpret } from '@/hooks/useTde2';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Retorna cor e rótulo de chip baseado na interpretação */
function getInterpretacaoStyle(interpretacao: string): {
    color: 'error' | 'warning' | 'info' | 'success';
    bg: string;
} {
    const lower = interpretacao.toLowerCase();
    if (lower.includes('muito grave') || lower.includes('grave')) return { color: 'error', bg: '#FEF2F2' };
    if (lower.includes('leve') || lower.includes('alerta')) return { color: 'warning', bg: '#FFFBEB' };
    if (lower.includes('inferior')) return { color: 'info', bg: '#EFF6FF' };
    if (lower.includes('médio superior') || lower.includes('acima') || lower.includes('superior')) return { color: 'success', bg: '#F0FDF4' };
    return { color: 'info', bg: '#EFF6FF' };
}

/** Ícone por nome do indicador */
function getIndicadorIcon(nome: string) {
    if (nome.toLowerCase().includes('acurácia') || nome.toLowerCase().includes('acertos')) return <FileText size={18} />;
    if (nome.toLowerCase().includes('tempo') || nome.toLowerCase().includes('velocidade')) return <Clock size={18} />;
    if (nome.toLowerCase().includes('palavras')) return <TrendingUp size={18} />;
    if (nome.toLowerCase().includes('eficiência')) return <Zap size={18} />;
    return <Sparkles size={18} />;
}

// ---------------------------------------------------------------------------
// Sub-componentes
// ---------------------------------------------------------------------------

/** Card de um indicador do TDE-II (suporta estado de edição e estado interpretado) */
function IndicadorCard({
    indicador,
    percentilValue,
    onPercentilChange,
    interpretacao,
    isInterpreted,
    index,
}: {
    indicador: Tde2ResultModel['resultados'][0];
    percentilValue: string;
    onPercentilChange: (val: string) => void;
    interpretacao?: string;
    isInterpreted: boolean;
    index: number;
}) {
    const style = isInterpreted && interpretacao
        ? getInterpretacaoStyle(interpretacao)
        : { color: 'primary' as const, bg: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)' };

    const animDelay = `${index * 0.08}s`;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: isInterpreted ? `${style.color}.light` : 'grey.200',
                background: isInterpreted ? style.bg : 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
                animation: 'slideUpFade 0.45s ease-out forwards',
                animationDelay: animDelay,
                opacity: 0,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '@keyframes slideUpFade': {
                    '0%': { opacity: 0, transform: 'translateY(16px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                '&:hover': {
                    borderColor: isInterpreted ? `${style.color}.main` : 'primary.light',
                    boxShadow: isInterpreted
                        ? '0 8px 24px -6px rgba(0,0,0,0.06)'
                        : '0 8px 24px -6px rgba(59,130,246,0.12)',
                },
            }}
        >
            {/* Header do indicador */}
            <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                <Box
                    sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        bgcolor: isInterpreted ? 'white' : 'primary.50',
                        border: isInterpreted ? '1px solid' : 'none',
                        borderColor: isInterpreted ? `${style.color}.light` : 'transparent',
                        background: !isInterpreted ? 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' : undefined,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isInterpreted ? `${style.color}.main` : 'primary.main',
                        flexShrink: 0,
                        transition: 'all 0.3s ease',
                    }}
                >
                    {getIndicadorIcon(indicador.nome)}
                </Box>
                <Typography variant="body2" fontWeight={700} color="text.secondary" sx={{ letterSpacing: 0.3, textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    {indicador.nome}
                </Typography>
            </Stack>

            {/* Valor calculado */}
            <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                    background: isInterpreted
                        ? 'none'
                        : 'linear-gradient(90deg, #1e293b 0%, #3B82F6 100%)',
                    WebkitBackgroundClip: isInterpreted ? 'none' : 'text',
                    WebkitTextFillColor: isInterpreted ? 'inherit' : 'transparent',
                    color: 'text.primary',
                    mb: 0.5,
                    transition: 'all 0.3s ease',
                }}
            >
                {typeof indicador.valor === 'number' && !Number.isInteger(indicador.valor)
                    ? indicador.valor.toFixed(2)
                    : indicador.valor}
                {indicador.unidade && (
                    <Typography component="span" variant="body2" fontWeight={500} sx={{ color: 'text.secondary', ml: 0.5 }}>
                        {indicador.unidade}
                    </Typography>
                )}
            </Typography>

            <Divider sx={{ my: 2, borderColor: isInterpreted ? `${style.color}.light` : 'grey.200', transition: 'border-color 0.3s ease' }} />

            {/* Conteúdo inferior do card */}
            <Box sx={{ minHeight: 64, position: 'relative' }}>
                {!isInterpreted ? (
                    <Stack
                        spacing={0.5}
                        sx={{
                            animation: 'fadeInUp 0.3s ease-out',
                            '@keyframes fadeInUp': {
                                '0%': { opacity: 0, transform: 'translateY(8px)' },
                                '100%': { opacity: 1, transform: 'translateY(0)' },
                            },
                        }}
                    >
                        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            Percentil (manual)
                        </Typography>
                        <TextField
                            type="number"
                            size="small"
                            placeholder="0 – 100"
                            value={percentilValue}
                            onChange={(e) => onPercentilChange(e.target.value)}
                            inputProps={{ min: 0, max: 100, step: 1 }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    bgcolor: 'white',
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'primary.main',
                                    },
                                },
                            }}
                        />
                    </Stack>
                ) : (
                    <Stack
                        spacing={1}
                        sx={{
                            animation: 'fadeInUp 0.35s ease-out',
                            '@keyframes fadeInUp': {
                                '0%': { opacity: 0, transform: 'translateY(8px)' },
                                '100%': { opacity: 1, transform: 'translateY(0)' },
                            },
                        }}
                    >
                        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            Classificação
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={0.75}>
                            <Chip
                                size="small"
                                label={`Percentil ${percentilValue}`}
                                variant="outlined"
                                color={style.color}
                                sx={{ fontWeight: 700, fontSize: '0.72rem', bgcolor: 'white' }}
                            />
                            <Chip
                                size="small"
                                label={interpretacao}
                                color={style.color}
                                sx={{ fontWeight: 700, fontSize: '0.72rem' }}
                            />
                        </Stack>
                    </Stack>
                )}
            </Box>
        </Paper>
    );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface Tde2ResultDisplayProps {
    resultData: Tde2ResultModel;
    isSaved: boolean;
    isSaving: boolean;
    hasPatient: boolean;
    onNewTest: () => void;
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export default function Tde2ResultDisplay({
    resultData,
    isSaved,
    isSaving,
    hasPatient,
    onNewTest,
}: Tde2ResultDisplayProps) {
    const [percentis, setPercentis] = useState<Record<string, string>>({});
    const [interpretResult, setInterpretResult] = useState<Tde2InterpretResult | null>(null);

    const { mutate: interpret, isPending: isInterpreting, error: interpretError } = useTde2Interpret();

    const handlePercentilChange = (nome: string, val: string) => {
        setPercentis(prev => ({ ...prev, [nome]: val }));
        // Limpar resultado interpretado ao alterar qualquer percentil
        setInterpretResult(null);
    };

    const todosPreenchidos = resultData.resultados.every(
        (r) => percentis[r.nome] !== undefined && percentis[r.nome] !== ''
    );

    const algumPreenchido = resultData.resultados.some(
        (r) => percentis[r.nome] !== undefined && percentis[r.nome] !== ''
    );

    const handleInterpretar = () => {
        const resultados: Tde2IndicadorComPercentil[] = resultData.resultados.map((r) => ({
            nome: r.nome,
            valor: r.valor,
            ...(r.unidade ? { unidade: r.unidade } : {}),
            percentil: Number(percentis[r.nome] ?? 0),
        }));

        interpret(
            {
                nomePaciente: resultData.nomePaciente,
                anoEscolar: resultData.anoEscolar,
                subteste: resultData.subteste,
                tempoTotalEmSegundos: resultData.tempoTotalEmSegundos,
                resultados,
            },
            {
                onSuccess: (data) => setInterpretResult(data),
            }
        );
    };

    const subtesteLegivel =
        resultData.subteste === 'ESCRITA' ? 'Escrita' :
        resultData.subteste === 'LEITURA' ? 'Leitura' : 'Aritmética';

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                border: '1px solid',
                borderColor: interpretResult ? 'success.light' : 'primary.light',
                overflow: 'hidden',
                boxShadow: interpretResult
                    ? '0 10px 40px -10px rgba(16, 185, 129, 0.15)'
                    : '0 10px 40px -10px rgba(59, 130, 246, 0.15)',
                position: 'relative',
            }}
        >
            {/* Header Banner */}
            <Box
                sx={{
                    background: interpretResult
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                    px: { xs: 3, md: 5 },
                    py: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'background 0.5s ease',
                }}
            >
                <Box sx={{ position: 'absolute', top: '-20%', right: '-5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-40%', left: '10%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" gap={3} sx={{ position: 'relative', zIndex: 1 }}>
                    <Stack direction="row" spacing={2.5} alignItems="center">
                        <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                            <BookOpen size={32} />
                        </Box>
                        <Box>
                            <Typography variant="overline" fontWeight={700} sx={{ color: 'rgba(255,255,255,0.8)', letterSpacing: 1.5 }}>
                                {interpretResult ? 'Interpretação Concluída' : 'Indicadores Calculados'}
                            </Typography>
                            <Typography variant="h5" fontWeight={800} sx={{ color: 'white' }}>
                                TDE-II — {subtesteLegivel}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', mt: 0.5 }}>
                                {resultData.nomePaciente} · {resultData.anoEscolar} · {resultData.tempoTotalEmSegundos}s
                            </Typography>
                        </Box>
                    </Stack>
                    <Chip
                        icon={interpretResult ? <CheckCircle2 size={16} /> : <Sparkles size={16} />}
                        label={interpretResult ? 'Interpretado' : 'Aguardando percentil'}
                        sx={{ px: 1, fontWeight: 700, bgcolor: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)', '& .MuiChip-icon': { color: 'white' } }}
                    />
                </Stack>
            </Box>

            <CardContent sx={{ p: { xs: 3, md: 5 }, bgcolor: 'background.paper' }}>
                <Stack spacing={4}>
                    {/* Alerta de salvamento */}
                    {hasPatient && (
                        <Alert
                            icon={isSaving ? undefined : <CheckCircle2 size={20} />}
                            severity={isSaved ? 'success' : isSaving ? 'info' : 'warning'}
                            sx={{ borderRadius: 3, px: 3, py: 2, alignItems: 'center', border: '1px solid', borderColor: isSaved ? 'success.light' : isSaving ? 'info.light' : 'warning.light' }}
                        >
                            <Typography variant="body2" fontWeight={600}>
                                {isSaving ? 'Sincronizando resultado no prontuário do paciente...' :
                                    isSaved ? 'Resultado arquivado e salvo com sucesso no perfil do paciente.' :
                                    'Atenção: Resultado gerado sem salvamento automático (Teste Anônimo).'}
                            </Typography>
                        </Alert>
                    )}

                    {/* ================================================================
                        Indicadores Quantitativos e Classificação TDE-II
                    ================================================================ */}
                    <Box>
                        <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                            <Box sx={{ width: 4, height: 24, bgcolor: interpretResult ? 'success.main' : 'primary.main', borderRadius: 2, transition: 'background-color 0.3s ease' }} />
                            <Typography variant="h6" fontWeight={800} color="text.primary">
                                {interpretResult ? 'Resultados e Classificação TDE-II' : 'Indicadores Quantitativos'}
                            </Typography>
                        </Stack>

                        {!interpretResult ? (
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                Valores calculados a partir dos dados brutos informados. Consulte o material original do TDE-II para identificar o percentil correspondente a cada indicador.
                            </Typography>
                        ) : (
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                Classificação e interpretação qualitativa calculadas com base nos percentis informados manualmente.
                            </Typography>
                        )}

                        {/* Alerta obrigatório — Direitos Autorais (apenas visível em fase de edição) */}
                        {!interpretResult && (
                            <Alert
                                icon={<AlertTriangle size={20} />}
                                severity="warning"
                                sx={{
                                    mb: 3,
                                    borderRadius: 3,
                                    border: '1px solid',
                                    borderColor: 'warning.light',
                                    '& .MuiAlert-message': { width: '100%' },
                                }}
                            >
                                <Typography variant="body2" fontWeight={600} mb={0.5}>
                                    Atenção — Direitos Autorais
                                </Typography>
                                <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.65 }}>
                                    Por questões de direitos autorais, o sistema não realiza a validação automática dos percentis normativos do TDE-II. Consulte o material original do instrumento para identificar o percentil correspondente ao escore obtido e informe-o manualmente no campo indicado. A interpretação será exibida somente após o preenchimento do percentil.
                                </Typography>
                            </Alert>
                        )}

                        <Box
                            display="grid"
                            gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }}
                            gap={3}
                        >
                            {resultData.resultados.map((indicador, i) => {
                                const indicadorInterpretado = interpretResult?.resultados.find(
                                    (r) => r.nome === indicador.nome
                                );
                                return (
                                    <IndicadorCard
                                        key={indicador.nome}
                                        indicador={indicador}
                                        percentilValue={
                                            indicadorInterpretado
                                                ? String(indicadorInterpretado.percentil)
                                                : percentis[indicador.nome] ?? ''
                                        }
                                        onPercentilChange={(val) => handlePercentilChange(indicador.nome, val)}
                                        interpretacao={indicadorInterpretado?.interpretacao}
                                        isInterpreted={!!interpretResult}
                                        index={i}
                                    />
                                );
                            })}
                        </Box>
                    </Box>

                    {/* Erros de interpretação */}
                    {interpretError && (
                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                            Erro ao interpretar: {(interpretError as Error).message}
                        </Alert>
                    )}

                    {/* Botão de interpretar */}
                    {!interpretResult && (
                        <Box
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: algumPreenchido ? 'primary.50' : 'grey.50',
                                background: algumPreenchido
                                    ? 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)'
                                    : undefined,
                                border: '1px dashed',
                                borderColor: algumPreenchido ? 'primary.light' : 'grey.300',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                    <Info size={18} color={algumPreenchido ? '#3B82F6' : '#9CA3AF'} style={{ marginTop: 2, flexShrink: 0 }} />
                                    <Typography variant="body2" color={algumPreenchido ? 'primary.dark' : 'text.secondary'} fontWeight={500}>
                                        {todosPreenchidos
                                            ? 'Todos os percentis preenchidos. Clique em "Interpretar" para visualizar a classificação qualitativa.'
                                            : algumPreenchido
                                            ? 'Preencha o percentil de todos os indicadores para habilitar a interpretação.'
                                            : 'Insira os percentis obtidos no material original do TDE-II para cada indicador acima.'}
                                    </Typography>
                                </Stack>
                                <Tooltip
                                    title={!todosPreenchidos ? 'Preencha todos os percentis primeiro' : ''}
                                    placement="top"
                                >
                                    <span>
                                        <Button
                                            variant="contained"
                                            onClick={handleInterpretar}
                                            disabled={!todosPreenchidos || isInterpreting}
                                            startIcon={isInterpreting ? <CircularProgress size={18} color="inherit" /> : <BookOpen size={18} />}
                                            sx={{
                                                px: 4,
                                                py: 1.5,
                                                borderRadius: 2.5,
                                                textTransform: 'none',
                                                fontWeight: 700,
                                                fontSize: '0.95rem',
                                                whiteSpace: 'nowrap',
                                                background: todosPreenchidos
                                                    ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                                                    : undefined,
                                                boxShadow: todosPreenchidos
                                                    ? '0 4px 14px rgba(59,130,246,0.4)'
                                                    : 'none',
                                                '&:hover': {
                                                    boxShadow: '0 6px 20px rgba(59,130,246,0.5)',
                                                },
                                            }}
                                        >
                                            {isInterpreting ? 'Interpretando...' : 'Interpretar'}
                                        </Button>
                                    </span>
                                </Tooltip>
                            </Stack>
                        </Box>
                    )}

                    {/* Botão recalcular (após interpretação) */}
                    {interpretResult && (
                        <Alert
                            severity="info"
                            icon={<Info size={20} />}
                            sx={{ borderRadius: 3, border: '1px solid', borderColor: 'info.light' }}
                            action={
                                <Button
                                    size="small"
                                    color="info"
                                    onClick={() => setInterpretResult(null)}
                                    sx={{ fontWeight: 700, textTransform: 'none' }}
                                >
                                    Alterar percentis
                                </Button>
                            }
                        >
                            <Typography variant="body2" fontWeight={500}>
                                Interpretação gerada com os percentis informados. Altere os valores acima se necessário.
                            </Typography>
                        </Alert>
                    )}

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    {/* Ações finais */}
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            startIcon={<RotateCcw size={18} />}
                            onClick={onNewTest}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                textTransform: 'none',
                                fontWeight: 700,
                                fontSize: '1rem',
                                bgcolor: 'grey.900',
                                color: 'white',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                                '&:hover': {
                                    bgcolor: 'grey.800',
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            Realizar Novo Teste
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

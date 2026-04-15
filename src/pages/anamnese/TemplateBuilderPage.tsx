import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
    Stack,
    Typography,
    Box,
    Card,
    CardContent,
    Button,
    TextField,
    IconButton,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Alert,
    CircularProgress,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import {
    Plus,
    Trash2,
    ArrowLeft,
    Save,
    GripVertical,
    Settings2,
    Type,
    CheckSquare,
    CircleDot,
    List,
    Calendar,
    AlignLeft,
    FileJson
} from 'lucide-react';
import { useAnamnesisTemplate, useCreateAnamnesisTemplate, useUpdateAnamnesisTemplate } from '@/hooks/useAnamnesisV2';
import type { AnamnesisTemplate, FieldType } from '@/types/anamnesis';
import { DEFAULT_ANAMNESIS } from '@/constants/defaultAnamnesis';

const FIELD_TYPES: { type: FieldType; label: string; icon: any }[] = [
    { type: 'text', label: 'Texto Curto', icon: Type },
    { type: 'textarea', label: 'Texto Longo', icon: AlignLeft },
    { type: 'select', label: 'Seleção (Dropdown)', icon: List },
    { type: 'radio', label: 'Escolha Única', icon: CircleDot },
    { type: 'checkbox', label: 'Múltipla Escolha', icon: CheckSquare },
    { type: 'date', label: 'Data', icon: Calendar },
];

export default function TemplateBuilderPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEdit = !!id;

    const { data: template, isLoading: isLoadingTemplate } = useAnamnesisTemplate(id || '');
    const { mutateAsync: createTemplate, isPending: isCreating } = useCreateAnamnesisTemplate();
    const { mutateAsync: updateTemplate, isPending: isUpdating } = useUpdateAnamnesisTemplate();

    const [isDefaultConfirmOpen, setIsDefaultConfirmOpen] = useState(false);

    const { control, handleSubmit, reset, register, watch } = useForm<Omit<AnamnesisTemplate, 'id' | 'createdAt'>>({
        defaultValues: {
            name: '',
            description: '',
            schema: {
                sections: [
                    { title: 'Identificação', fields: [] }
                ]
            }
        }
    });

    const { fields: sections, append: appendSection, remove: removeSection } = useFieldArray({
        control,
        name: 'schema.sections'
    });

    useEffect(() => {
        if (template) {
            reset({
                name: template.name,
                description: template.description,
                schema: template.schema
            });
        }
    }, [template, reset]);

    const onSave = async (data: Omit<AnamnesisTemplate, 'id' | 'createdAt'>) => {
        try {
            if (isEdit && id) {
                await updateTemplate({ id, data });
            } else {
                await createTemplate(data);
            }
            navigate('/app/anamneses/templates');
        } catch (error) {
            console.error('Error saving template:', error);
        }
    };

    const applyDefaultTemplate = () => {
        reset(DEFAULT_ANAMNESIS);
        setIsDefaultConfirmOpen(false);
    };

    if (isEdit && isLoadingTemplate) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Stack spacing={3} sx={{ maxWidth: 1000, mx: 'auto', pb: 8 }}>
            {/* Header */}
            <Box>
                <Button
                    variant="text"
                    startIcon={<ArrowLeft size={18} />}
                    onClick={() => navigate('/app/anamneses/templates')}
                    sx={{ mb: 1, pl: 0 }}
                >
                    Voltar aos modelos
                </Button>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" fontWeight={700}>
                        {isEdit ? 'Editar Modelo' : 'Novo Modelo'}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<FileJson size={20} />}
                            onClick={() => setIsDefaultConfirmOpen(true)}
                        >
                            Usar modelo padrão
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Save size={20} />}
                            onClick={handleSubmit(onSave)}
                            disabled={isCreating || isUpdating}
                        >
                            {isCreating || isUpdating ? 'Salvando...' : 'Salvar Modelo'}
                        </Button>
                    </Stack>
                </Stack>
            </Box>

            {/* Default Template Confirmation */}
            <Dialog
                open={isDefaultConfirmOpen}
                onClose={() => setIsDefaultConfirmOpen(false)}
                maxWidth="xs"
            >
                <DialogTitle sx={{ fontWeight: 700 }}>Usar modelo padrão?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Isso irá substituir todos os campos atuais pelo roteiro de entrevista inicial padrão.
                        Esta ação não pode ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button onClick={() => setIsDefaultConfirmOpen(false)}>Cancelar</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={applyDefaultTemplate}
                        autoFocus
                    >
                        Confirmar e Substituir
                    </Button>
                </DialogActions>
            </Dialog>

            <Alert severity="info" variant="outlined">
                Este construtor gera o JSON Schema dinâmico que será usado para renderizar suas anamneses.
            </Alert>

            {/* Basic Info */}
            <Card variant="outlined">
                <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2.5}>
                        <TextField
                            {...register('name', { required: 'Nome é obrigatório' })}
                            label="Nome do Modelo"
                            fullWidth
                            placeholder="Ex: Anamnese Infantil Completa"
                            required
                        />
                        <TextField
                            {...register('description')}
                            label="Descrição"
                            fullWidth
                            multiline
                            rows={2}
                            placeholder="Descreva brevemente a finalidade deste modelo..."
                        />
                    </Stack>
                </CardContent>
            </Card>

            {/* Sections */}
            <Stack spacing={4}>
                {sections.map((section, sectionIndex) => (
                    <SectionBuilder
                        key={section.id}
                        sectionIndex={sectionIndex}
                        control={control}
                        removeSection={removeSection}
                        register={register}
                        watch={watch}
                    />
                ))}
            </Stack>

            <Button
                variant="outlined"
                startIcon={<Plus size={20} />}
                onClick={() => appendSection({ title: 'Nova Seção', fields: [] })}
                fullWidth
                sx={{ py: 2, borderStyle: 'dashed' }}
            >
                Adicionar Nova Seção
            </Button>
        </Stack>
    );
}

// ─── SectionBuilder Component ─────────────────────────────────────────────

interface SectionBuilderProps {
    sectionIndex: number;
    control: any;
    removeSection: (index: number) => void;
    register: any;
    watch: any;
}

function SectionBuilder({ sectionIndex, control, removeSection, register, watch }: SectionBuilderProps) {
    const { fields: fieldsList, append: appendField, remove: removeField } = useFieldArray({
        control,
        name: `schema.sections.${sectionIndex}.fields`
    });

    return (
        <Box>
            <Paper variant="outlined" sx={{ p: 3, borderLeft: 4, borderColor: 'primary.main', position: 'relative' }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <GripVertical size={20} style={{ color: '#ccc' }} />
                    <TextField
                        {...register(`schema.sections.${sectionIndex}.title`, { required: true })}
                        placeholder="Título da Seção (Ex: Histórico Escolar)"
                        variant="standard"
                        fullWidth
                        slotProps={{
                            input: {
                                sx: { fontSize: '1.25rem', fontWeight: 700 }
                            }
                        }}
                    />
                    <Tooltip title="Excluir seção">
                        <IconButton onClick={() => removeSection(sectionIndex)} color="error" size="small">
                            <Trash2 size={18} />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Stack spacing={2}>
                    {fieldsList.map((field, fieldIndex) => (
                        <FieldBuilder
                            key={field.id}
                            fieldIndex={fieldIndex}
                            sectionIndex={sectionIndex}
                            control={control}
                            removeField={removeField}
                            register={register}
                            watch={watch}
                        />
                    ))}

                    {fieldsList.length === 0 && (
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                            Nenhum campo adicionado a esta seção.
                        </Typography>
                    )}

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            size="small"
                            variant="text"
                            startIcon={<Plus size={16} />}
                            onClick={() => appendField({ id: crypto.randomUUID(), type: 'text', label: '', required: false })}
                        >
                            Adicionar Campo
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}

// ─── FieldBuilder Component ───────────────────────────────────────────────

interface FieldBuilderProps {
    sectionIndex: number;
    fieldIndex: number;
    control: any;
    removeField: (index: number) => void;
    register: any;
    watch: any;
}

function FieldBuilder({ sectionIndex, fieldIndex, control, removeField, register, watch }: FieldBuilderProps) {
    const fieldPrefix = `schema.sections.${sectionIndex}.fields.${fieldIndex}`;
    const fieldType = watch(`${fieldPrefix}.type`);

    const showOptions = ['select', 'radio', 'checkbox'].includes(fieldType);

    return (
        <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box sx={{ mt: 1 }}>
                        <Settings2 size={18} style={{ color: '#aaa' }} />
                    </Box>
                    <GridContainer>
                        {/* Label */}
                        <TextField
                            {...register(`${fieldPrefix}.label`, { required: true })}
                            label="Pergunta / Rótulo"
                            size="small"
                            fullWidth
                            placeholder="Ex: Qual o motivo da consulta?"
                        />

                        {/* Type */}
                        <FormControl size="small" fullWidth>
                            <InputLabel>Tipo do Campo</InputLabel>
                            <Controller
                                name={`${fieldPrefix}.type`}
                                control={control}
                                render={({ field }) => (
                                    <Select {...field} label="Tipo do Campo">
                                        {FIELD_TYPES.map((ft) => (
                                            <MenuItem key={ft.type} value={ft.type}>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <ft.icon size={16} />
                                                    <span>{ft.label}</span>
                                                </Stack>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        {/* Options (if multi-choice) */}
                        {showOptions && (
                            <OptionsBuilder
                                sectionIndex={sectionIndex}
                                fieldIndex={fieldIndex}
                                control={control}
                                register={register}
                            />
                        )}

                        {/* Required toggle */}
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Controller
                                name={`${fieldPrefix}.required`}
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Switch {...field} checked={field.value} />}
                                        label="Obrigatório"
                                    />
                                )}
                            />
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton onClick={() => removeField(fieldIndex)} color="error" size="small">
                                <Trash2 size={18} />
                            </IconButton>
                        </Stack>
                    </GridContainer>
                </Stack>
            </Stack>
        </Card>
    );
}

// ─── OptionsBuilder Component (for choice fields) ───────────────────────────

function OptionsBuilder({ sectionIndex, fieldIndex, control, register }: any) {
    const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
        control,
        name: `schema.sections.${sectionIndex}.fields.${fieldIndex}.options`
    });

    // Only seed a default option when the field is brand new (no existing options at mount).
    // Using a ref avoids re-triggering after reset() settles, which would corrupt
    // pre-populated options from "Usar modelo padrão".
    const seeded = useRef(false);
    useEffect(() => {
        if (seeded.current) return;
        seeded.current = true;
        if (optionFields.length === 0) {
            appendOption('Opção 1');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{ mt: 1, pl: 2, borderLeft: 2, borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', fontWeight: 700 }}>
                OPÇÕES DE RESPOSTA
            </Typography>
            <Stack spacing={1}>
                {optionFields.map((opt, optIndex) => (
                    <Stack key={opt.id} direction="row" spacing={1}>
                        <TextField
                            {...register(`schema.sections.${sectionIndex}.fields.${fieldIndex}.options.${optIndex}`, { required: true })}
                            size="small"
                            fullWidth
                            placeholder={`Opção ${optIndex + 1}`}
                        />
                        <IconButton size="small" onClick={() => removeOption(optIndex)} disabled={optionFields.length <= 1}>
                            <Trash2 size={14} />
                        </IconButton>
                    </Stack>
                ))}
                <Button size="small" startIcon={<Plus size={14} />} onClick={() => appendOption('')} sx={{ width: 'fit-content' }}>
                    Adicionar Opção
                </Button>
            </Stack>
        </Box>
    );
}

// Simple Layout Helper
function GridContainer({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
            width: '100%'
        }}>
            {children}
        </Box>
    );
}

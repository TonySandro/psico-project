/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import {
  Controller,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  AlignLeft,
  ArrowLeft,
  CheckSquare,
  CircleDot,
  FileJson,
  GripVertical,
  HelpCircle,
  Plus,
  Save,
  Settings2,
  Trash2,
  type LucideIcon,
} from 'lucide-react';
import { useCreateTeacherReportTemplate, useTeacherReportTemplate } from '@/hooks/useTeacherReport';
import type { TeacherReportQuestionType, TeacherReportTemplateForm } from '@/types/teacherReport';
import {
  DEFAULT_TEACHER_REPORT_TEMPLATE,
  getTeacherReportSchema,
} from '@/utils/teacherReportSchema';

const FIELD_TYPES: { type: TeacherReportQuestionType; label: string; icon: LucideIcon }[] = [
  { type: 'textarea', label: 'Texto longo', icon: AlignLeft },
  { type: 'single_choice', label: 'Escolha única', icon: CircleDot },
  { type: 'multiple_choice', label: 'Múltipla escolha', icon: CheckSquare },
  { type: 'multiple_choice_with_other', label: 'Múltipla escolha com outro', icon: CheckSquare },
  { type: 'boolean', label: 'Sim / Não', icon: HelpCircle },
];

export default function TeacherReportTemplateBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isPreview = !!id;

  const { data: template, isLoading: isLoadingTemplate } = useTeacherReportTemplate(id || '');
  const { mutateAsync: createTemplate, isPending: isCreating } = useCreateTeacherReportTemplate();

  const [isDefaultConfirmOpen, setIsDefaultConfirmOpen] = useState(false);

  const { control, handleSubmit, reset, register, watch } = useForm<TeacherReportTemplateForm>({
    defaultValues: DEFAULT_TEACHER_REPORT_TEMPLATE,
  });

  const { fields: sections, append: appendSection, remove: removeSection } = useFieldArray({
    control,
    name: 'schema.sections',
  });

  useEffect(() => {
    if (template) {
      reset({
        name: template.name,
        description: template.description,
        schema: getTeacherReportSchema(template),
      } as TeacherReportTemplateForm);
    }
  }, [template, reset]);

  const onSave = async (data: TeacherReportTemplateForm) => {
    try {
      await createTemplate(data);
      navigate('/app/teacher-report/templates');
    } catch (error) {
      console.error('Error saving teacher report template:', error);
    }
  };

  const applyDefaultTemplate = () => {
    reset(DEFAULT_TEACHER_REPORT_TEMPLATE);
    setIsDefaultConfirmOpen(false);
  };

  if (isPreview && isLoadingTemplate) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 1000, mx: 'auto', pb: 8 }}>
      <Box>
        <Button
          variant="text"
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate('/app/teacher-report/templates')}
          sx={{ mb: 1, pl: 0 }}
        >
          Voltar aos modelos
        </Button>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Typography variant="h4" fontWeight={700}>
            {isPreview ? 'Visualizar modelo' : 'Novo modelo'}
          </Typography>
          {!isPreview && (
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
                disabled={isCreating}
              >
                {isCreating ? 'Salvando...' : 'Salvar modelo'}
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>

      <Dialog open={isDefaultConfirmOpen} onClose={() => setIsDefaultConfirmOpen(false)} maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 700 }}>Usar modelo padrão?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Isso irá substituir todos os campos atuais pelo roteiro inicial de relatório do professor.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setIsDefaultConfirmOpen(false)}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={applyDefaultTemplate} autoFocus>
            Confirmar e substituir
          </Button>
        </DialogActions>
      </Dialog>

      {isPreview ? (
        <Alert severity="info" variant="outlined">
          Este modelo foi carregado para visualização. A API informada não possui endpoint de edição de modelos.
        </Alert>
      ) : (
        <Alert severity="info" variant="outlined">
          Este construtor cria as perguntas que serão respondidas pelo professor no link público.
        </Alert>
      )}

      <Card variant="outlined">
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            <TextField
              {...register('name', { required: 'Nome é obrigatório' })}
              label="Nome do modelo"
              fullWidth
              placeholder="Ex: Relatório Escolar Inicial"
              required
              disabled={isPreview}
            />
            <TextField
              {...register('description')}
              label="Descrição"
              fullWidth
              multiline
              rows={2}
              placeholder="Descreva brevemente a finalidade deste modelo..."
              disabled={isPreview}
            />
          </Stack>
        </CardContent>
      </Card>

      <Stack spacing={4}>
        {sections.map((section, sectionIndex) => (
          <SectionBuilder
            key={section.id}
            sectionIndex={sectionIndex}
            control={control}
            removeSection={removeSection}
            register={register}
            watch={watch}
            readOnly={isPreview}
          />
        ))}
      </Stack>

      {!isPreview && (
        <Button
          variant="outlined"
          startIcon={<Plus size={20} />}
          onClick={() => appendSection({ title: 'Nova seção', fields: [] })}
          fullWidth
          sx={{ py: 2, borderStyle: 'dashed' }}
        >
          Adicionar nova seção
        </Button>
      )}
    </Stack>
  );
}

interface SectionBuilderProps {
  sectionIndex: number;
  control: any;
  removeSection: (index: number) => void;
  register: any;
  watch: any;
  readOnly?: boolean;
}

function SectionBuilder({ sectionIndex, control, removeSection, register, watch, readOnly }: SectionBuilderProps) {
  const { fields: fieldsList, append: appendField, remove: removeField } = useFieldArray({
    control,
    name: `schema.sections.${sectionIndex}.fields`,
  });

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 3, borderLeft: 4, borderColor: 'primary.main', position: 'relative' }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <GripVertical size={20} style={{ color: '#ccc' }} />
          <TextField
            {...register(`schema.sections.${sectionIndex}.title`, { required: true })}
            placeholder="Título da seção"
            variant="standard"
            fullWidth
            disabled={readOnly}
            slotProps={{
              input: {
                sx: { fontSize: '1.25rem', fontWeight: 700 },
              },
            }}
          />
          {!readOnly && (
            <Tooltip title="Excluir seção">
              <IconButton onClick={() => removeSection(sectionIndex)} color="error" size="small">
                <Trash2 size={18} />
              </IconButton>
            </Tooltip>
          )}
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
              readOnly={readOnly}
            />
          ))}

          {fieldsList.length === 0 && (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              Nenhuma pergunta adicionada a esta seção.
            </Typography>
          )}

          {!readOnly && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button
                size="small"
                variant="text"
                startIcon={<Plus size={16} />}
                onClick={() =>
                  appendField({
                    id: crypto.randomUUID(),
                    type: 'textarea',
                    label: '',
                    required: false,
                    rows: 4,
                  })
                }
              >
                Adicionar pergunta
              </Button>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

interface FieldBuilderProps {
  sectionIndex: number;
  fieldIndex: number;
  control: any;
  removeField: (index: number) => void;
  register: any;
  watch: any;
  readOnly?: boolean;
}

function FieldBuilder({ sectionIndex, fieldIndex, control, removeField, register, watch, readOnly }: FieldBuilderProps) {
  const fieldPrefix = `schema.sections.${sectionIndex}.fields.${fieldIndex}`;
  const fieldType = watch(`${fieldPrefix}.type`);
  const showOptions = ['single_choice', 'multiple_choice', 'multiple_choice_with_other'].includes(fieldType);

  return (
    <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box sx={{ mt: 1 }}>
            <Settings2 size={18} style={{ color: '#aaa' }} />
          </Box>
          <GridContainer>
            <TextField
              {...register(`${fieldPrefix}.label`, { required: true })}
              label="Pergunta"
              size="small"
              fullWidth
              placeholder="Ex: Como está o desempenho em leitura?"
              disabled={readOnly}
            />

            <FormControl size="small" fullWidth>
              <InputLabel>Tipo da pergunta</InputLabel>
              <Controller
                name={`${fieldPrefix}.type`}
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Tipo da pergunta" disabled={readOnly}>
                    {FIELD_TYPES.map((fieldTypeOption) => (
                      <MenuItem key={fieldTypeOption.type} value={fieldTypeOption.type}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <fieldTypeOption.icon size={16} />
                          <span>{fieldTypeOption.label}</span>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            {fieldType === 'textarea' && (
              <TextField
                {...register(`${fieldPrefix}.rows`, { valueAsNumber: true })}
                label="Linhas"
                type="number"
                size="small"
                fullWidth
                disabled={readOnly}
              />
            )}

            {showOptions && (
              <OptionsBuilder
                sectionIndex={sectionIndex}
                fieldIndex={fieldIndex}
                control={control}
                register={register}
                readOnly={readOnly}
              />
            )}

            <Stack direction="row" spacing={2} alignItems="center">
              <Controller
                name={`${fieldPrefix}.required`}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch {...field} checked={!!field.value} disabled={readOnly} />}
                    label="Obrigatório"
                  />
                )}
              />
              <Box sx={{ flexGrow: 1 }} />
              {!readOnly && (
                <IconButton onClick={() => removeField(fieldIndex)} color="error" size="small">
                  <Trash2 size={18} />
                </IconButton>
              )}
            </Stack>
          </GridContainer>
        </Stack>
      </Stack>
    </Card>
  );
}

interface OptionsBuilderProps {
  sectionIndex: number;
  fieldIndex: number;
  control: any;
  register: any;
  readOnly?: boolean;
}

function OptionsBuilder({ sectionIndex, fieldIndex, control, register, readOnly }: OptionsBuilderProps) {
  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: `schema.sections.${sectionIndex}.fields.${fieldIndex}.options`,
  });

  const seeded = useRef(false);
  useEffect(() => {
    if (seeded.current) return;
    seeded.current = true;
    if (optionFields.length === 0) {
      appendOption('Opção 1');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ mt: 1, pl: 2, borderLeft: 2, borderColor: 'divider' }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', fontWeight: 700 }}>
        OPÇÕES DE RESPOSTA
      </Typography>
      <Stack spacing={1}>
        {optionFields.map((option, optionIndex) => (
          <Stack key={option.id} direction="row" spacing={1}>
            <TextField
              {...register(`schema.sections.${sectionIndex}.fields.${fieldIndex}.options.${optionIndex}`, { required: true })}
              size="small"
              fullWidth
              placeholder={`Opção ${optionIndex + 1}`}
              disabled={readOnly}
            />
            {!readOnly && (
              <IconButton size="small" onClick={() => removeOption(optionIndex)} disabled={optionFields.length <= 1}>
                <Trash2 size={14} />
              </IconButton>
            )}
          </Stack>
        ))}
        {!readOnly && (
          <Button size="small" startIcon={<Plus size={14} />} onClick={() => appendOption('')} sx={{ width: 'fit-content' }}>
            Adicionar opção
          </Button>
        )}
      </Stack>
    </Box>
  );
}

function GridContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 2,
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
}

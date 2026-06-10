import type { AnamnesisSchema, FieldType, SchemaField } from '@/types/anamnesis';
import type {
  PublicTeacherReportData,
  TeacherReportQuestion,
  TeacherReportQuestionType,
  TeacherReportResponse,
  TeacherReportTemplate,
  TeacherReportTemplateForm,
} from '@/types/teacherReport';

type SourceWithQuestions =
  | TeacherReportTemplate
  | TeacherReportResponse
  | PublicTeacherReportData
  | null
  | undefined;

const teacherReportTypes = new Set<string>([
  'textarea',
  'single_choice',
  'multiple_choice',
  'multiple_choice_with_other',
  'boolean',
]);

export const DEFAULT_TEACHER_REPORT_TEMPLATE: TeacherReportTemplateForm = {
  name: 'Relatorio do Professor - Modelo Padrao',
  description: 'Modelo inicial para coleta de observacoes escolares respondidas pelo professor.',
  schema: {
    sections: [
      {
        title: 'Observacoes do professor',
        fields: [
          {
            id: 'teacher_learning_observations',
            type: 'textarea',
            label: 'Quais sao as principais observacoes sobre aprendizagem, atencao e desempenho escolar?',
            required: true,
            rows: 5,
          },
          {
            id: 'teacher_social_interaction',
            type: 'single_choice',
            label: 'Como voce avalia a interacao social do aluno em sala?',
            required: true,
            options: ['Adequada', 'Parcialmente adequada', 'Com dificuldades importantes'],
          },
          {
            id: 'teacher_behavior_indicators',
            type: 'multiple_choice_with_other',
            label: 'Quais comportamentos sao observados com frequencia?',
            options: ['Desatencao', 'Agitacao', 'Impulsividade', 'Isolamento', 'Ansiedade'],
          },
          {
            id: 'teacher_needs_support',
            type: 'boolean',
            label: 'O aluno necessita de adaptacoes ou apoio escolar especifico?',
          },
        ],
      },
    ],
  },
};

const normalizeQuestionType = (type: string | undefined): FieldType => {
  if (type === 'single_choice') return 'single_choice';
  if (type === 'multiple_choice') return 'multiple_choice';
  if (type === 'multiple_choice_with_other') return 'multiple_choice_with_other';
  if (type === 'boolean') return 'boolean';
  if (type === 'textarea') return 'textarea';
  if (type === 'radio') return 'single_choice';
  if (type === 'checkbox') return 'multiple_choice';
  return 'textarea';
};

export const questionsToSchema = (
  questions: TeacherReportQuestion[] = [],
  sectionTitle = 'Perguntas',
): AnamnesisSchema => ({
  sections: [
    {
      title: sectionTitle,
      fields: questions.map<SchemaField>((question) => ({
        id: question.id,
        type: normalizeQuestionType(question.type),
        label: question.label || question.question || 'Pergunta',
        placeholder: question.placeholder,
        required: question.required,
        options: question.options,
        rows: question.rows,
      })),
    },
  ],
});

export const getTeacherReportSchema = (source: SourceWithQuestions): AnamnesisSchema => {
  if (source?.schema?.sections?.length) return source.schema;
  return questionsToSchema(source?.questions ?? []);
};

export const schemaToQuestions = (schema: AnamnesisSchema): TeacherReportQuestion[] =>
  schema.sections.flatMap((section) =>
    section.fields.map<TeacherReportQuestion>((field) => ({
      id: field.id,
      type: teacherReportTypes.has(field.type)
        ? (field.type as TeacherReportQuestionType)
        : field.type === 'radio'
          ? 'single_choice'
          : field.type === 'checkbox'
            ? 'multiple_choice'
            : 'textarea',
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      options: field.options,
      rows: field.rows,
    })),
  );

export const countTeacherReportFields = (source: SourceWithQuestions) => {
  const schema = getTeacherReportSchema(source);
  const sectionCount = schema.sections.length;
  const fieldCount = schema.sections.reduce((acc, section) => acc + section.fields.length, 0);
  return { sectionCount, fieldCount };
};

export const toTeacherReportTemplatePayload = (data: TeacherReportTemplateForm) => ({
  name: data.name,
  description: data.description,
  questions: schemaToQuestions(data.schema),
});

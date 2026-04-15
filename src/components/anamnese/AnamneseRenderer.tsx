import { useEffect, useMemo } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useForm, type FieldValues } from 'react-hook-form';
import type { AnamnesisSchema } from '@/types/anamnesis';
import SectionRenderer from './SectionRenderer';

interface AnamneseRendererProps {
  schema: AnamnesisSchema;
  defaultValues?: Record<string, unknown>;
  readOnly?: boolean;
  /** Called whenever the form values change (for autosave). Receives current form values. */
  onValuesChange?: (values: Record<string, unknown>) => void;
  /** Render prop: children receive { handleSubmit, isValid, isDirty } so the parent can place the submit button */
  children?: (bag: {
    handleSubmit: (
      onValid: (values: Record<string, unknown>) => void,
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    isValid: boolean;
    isDirty: boolean;
  }) => React.ReactNode;
}

/**
 * Core schema-driven form renderer.
 * Walks sections → fields and delegates all MUI+RHF logic to child components.
 * This component owns the `useForm` instance so the parent only needs to wire the submit handler.
 */
export default function AnamneseRenderer({
  schema,
  defaultValues = {},
  readOnly = false,
  onValuesChange,
  children,
}: AnamneseRendererProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<Record<string, unknown>>({
    defaultValues,
    mode: 'onChange',
  });

  // ── Progress calculation ─────────────────────────────────────────────────
  const allFields = useMemo(
    () => schema.sections.flatMap((s) => s.fields),
    [schema],
  );

  const formValues: FieldValues = watch();

  const progress = useMemo(() => {
    if (allFields.length === 0) return 0;
    const answeredCount = allFields.filter((f) => {
      const val = formValues[f.id];
      if (Array.isArray(val)) return val.length > 0;
      return val !== undefined && val !== '' && val !== null;
    }).length;
    return Math.round((answeredCount / allFields.length) * 100);
  }, [allFields, formValues]);

  // ── Notify parent of changes (autosave) via subscription, not inline ────
  useEffect(() => {
    if (!onValuesChange) return;
    const subscription = watch((values) => {
      onValuesChange(values as Record<string, unknown>);
    });
    return () => subscription.unsubscribe();
  }, [watch, onValuesChange]);

  return (
    <>
      {/* Progress bar */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            Progresso
          </Typography>
          <Typography variant="caption" fontWeight={600} color="primary">
            {progress}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>

      {/* Sections */}
      <Box>
        {schema.sections.map((section, idx) => (
          <SectionRenderer
            key={idx}
            section={section}
            sectionIndex={idx}
            control={control as unknown as import('react-hook-form').Control<Record<string, unknown>>}
            errors={errors as Record<string, { message?: string } | undefined>}
            readOnly={readOnly}
          />
        ))}
      </Box>

      {/* Submit slot via render props */}
      {children?.({ handleSubmit, isValid, isDirty })}
    </>
  );
}

import { Box, Typography, Divider, Stack } from '@mui/material';
import type { Control } from 'react-hook-form';
import type { SchemaSection } from '@/types/anamnesis';
import FieldRenderer from './FieldRenderer';

interface SectionRendererProps {
  section: SchemaSection;
  sectionIndex: number;
  control: Control<Record<string, unknown>>;
  errors: Record<string, { message?: string } | undefined>;
  readOnly?: boolean;
  lockedFieldIds?: Set<string>;
}

export default function SectionRenderer({
  section,
  control,
  errors,
  readOnly,
  lockedFieldIds,
}: SectionRendererProps) {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      {/* Section header */}
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ color: 'primary.main', mb: 0.5, letterSpacing: 0.2 }}
      >
        {section.title}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Fields */}
      <Stack spacing={3}>
        {section.fields.map((field) => (
          <FieldRenderer
            key={field.id}
            field={field}
            control={control}
            errors={errors}
            readOnly={readOnly || lockedFieldIds?.has(field.id)}
          />
        ))}
      </Stack>
    </Box>
  );
}

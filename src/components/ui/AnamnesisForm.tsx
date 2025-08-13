import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
} from '@mui/material';

interface AnamnesisFormProps {
  patientId: string;
  patientName?: string;
  age?: number;
  schoolYear?: string;
  onSuccess: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

export default function AnamnesisForm({
  patientId,
  patientName,
  age,
  schoolYear,
  onSuccess,
  onCancel,
}: AnamnesisFormProps) {
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSuccess({ description });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      <Typography variant="h5" mb={2}>
        Nova Anamnese{patientName ? ` - ${patientName}` : ''}
      </Typography>

      {(age !== undefined || schoolYear) && (
        <Typography variant="body2" color="text.secondary" mb={1}>
          {age !== undefined ? `Idade: ${age} anos` : ''} {age !== undefined && schoolYear ? ' | ' : ''}
          {schoolYear ? `Ano Escolar: ${schoolYear}` : ''}
        </Typography>
      )}

      <Stack spacing={2}>
        <TextField
          label="Descrição da Anamnese"
          multiline
          minRows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Salvando...' : 'Salvar Anamnese'}
          </Button>
          <Button onClick={onCancel} variant="outlined" disabled={submitting}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

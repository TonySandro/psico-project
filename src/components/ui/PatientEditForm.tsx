import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { Patient } from '../../types/patient';

interface PatientEditFormProps {
  patient: Patient;
  onSuccess: (data: Partial<Patient>) => Promise<void>;
  onCancel: () => void;
}

export default function PatientEditForm({
  patient,
  onSuccess,
  onCancel,
}: PatientEditFormProps) {
  const [name, setName] = useState(patient.name);
  const [age, setAge] = useState<number>(patient.age);
  const [schoolYear, setSchoolYear] = useState(patient.schoolYear);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSuccess({ name, age, schoolYear });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      <Typography variant="h5" mb={2}>Editar Paciente</Typography>
      <Stack spacing={2}>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Idade"
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          required
          inputProps={{ min: 0 }}
        />
        <TextField
          label="Ano Escolar"
          value={schoolYear ?? ''}
          onChange={(e) => setSchoolYear(e.target.value)}
        />
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
          <Button onClick={onCancel} variant="outlined" disabled={submitting}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

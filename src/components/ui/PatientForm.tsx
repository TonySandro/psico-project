import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
} from '@mui/material';

interface PatientFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PatientForm({ onSuccess, onCancel }: PatientFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [schoolYear, setSchoolYear] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Paciente cadastrado:', { name, age, schoolYear });
    onSuccess();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      <Typography variant="h5" mb={2}>Adicionar Paciente</Typography>
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
        />
        <TextField
          label="Ano Escolar"
          value={schoolYear}
          onChange={(e) => setSchoolYear(e.target.value)}
        />
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
          <Button onClick={onCancel} variant="outlined">
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

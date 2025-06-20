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
  patientName: string;
  age: number;
  schoolYear: string;
  onSuccess: () => void;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova Anamnese para:', patientId, description);
    onSuccess();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      <Typography variant="h5" mb={2}>
        Nova Anamnese - {patientName}
      </Typography>
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Idade: {age} anos | Ano Escolar: {schoolYear}
        </Typography>
        <TextField
          label="Descrição da Anamnese"
          multiline
          minRows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained" color="primary">
            Salvar Anamnese
          </Button>
          <Button onClick={onCancel} variant="outlined">
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

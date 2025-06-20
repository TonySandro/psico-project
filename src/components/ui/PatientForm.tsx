import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { createPatient } from '../../services/patientService';
import { PatientRequestDto } from '../../types/patient-request-dto';

interface PatientFormProps {
  onSuccess: (data: PatientRequestDto) => void;
  onCancel: () => void;
}

export default function PatientForm({ onSuccess, onCancel }: PatientFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [schoolYear, setSchoolYear] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [motherName, setMotherName] = useState('');
  const [fatherName, setFatherName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const patientData = { name, age: Number(age), schoolYear, dateOfBirth, gender, address, phoneNumber, motherName, fatherName };
      onSuccess(patientData);
    } catch {
      console.error('Erro ao criar paciente.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
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
        <TextField
          label="Data de Nascimento"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Gênero"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <TextField
          label="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="Telefone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          label="Nome da Mãe"
          value={motherName}
          onChange={(e) => setMotherName(e.target.value)}
        />
        <TextField
          label="Nome do Pai"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
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

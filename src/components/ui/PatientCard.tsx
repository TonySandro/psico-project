import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Paper,
} from '@mui/material';
import { Patient } from '../../types/patient';

interface PatientCardProps {
  patient: Patient;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onAddAnamnesis: () => void;
  onDelete: () => void;
}

export default function PatientCard({
  patient,
  isSelected,
  onSelect,
  onEdit,
  onAddAnamnesis,
  onDelete,
}: PatientCardProps) {
  return (
    <Paper
      onClick={onSelect}
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: isSelected ? '#f0f7ff' : 'white',
        transition: 'background-color 0.2s',
        '&:hover': { backgroundColor: '#f0f7ff' },
      }}
    >
      <Box>
        <Typography variant="h6">{patient.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {patient.age} anos | {patient.schoolYear}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} flexWrap="wrap">
        <Button
          size="small"
          variant="contained"
          color="warning"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Editar
        </Button>

        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={(e) => {
            e.stopPropagation();
            onAddAnamnesis();
          }}
        >
          Visualizar
        </Button>

        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Excluir
        </Button>
      </Stack>
    </Paper>
  );
}

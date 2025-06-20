import React from 'react';
import { Grid } from '@mui/material';
import PatientCard from './PatientCard';
import { Patient } from '../../types/patient';

interface PatientListProps {
  patients: Patient[];
  isListView: boolean;
  selectedPatientId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (patient: Patient) => void;
  onAddAnamnesis: (patient: Patient) => void;
}

export default function PatientList({
  patients,
  isListView,
  selectedPatientId,
  onSelect,
  onDelete,
  onEdit,
  onAddAnamnesis,
}: PatientListProps) {
  return (
    <Grid container spacing={2}>
      {patients.map((patient) => (
        <Grid key={patient.id} item xs={12} md={isListView ? 12 : 4}>
          <PatientCard
            patient={patient}
            isSelected={selectedPatientId === patient.id}
            onSelect={() => onSelect(patient.id)}
            onDelete={() => onDelete(patient.id)}
            onEdit={() => onEdit(patient)}
            onAddAnamnesis={() => onAddAnamnesis(patient)}
          />
        </Grid>
      ))}
    </Grid>
  );
} 
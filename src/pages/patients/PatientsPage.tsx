import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Patient } from '../../types/patient';
import {
  getPatients,
  deletePatient,
  createPatient,
  updatePatient,
  addAnamnesis,
} from '../../services/patientService';
import ConfirmDeleteModal from '../../components/ui/ConfirmDeleteModal';
import AnamnesisForm from '../../components/ui/AnamnesisForm';
import PatientEditForm from '../../components/ui/PatientEditForm';
import PatientForm from '../../components/ui/PatientForm';
import PatientCard from '../../components/ui/PatientCard';
import { PatientRequestDto } from '../../types/patient-request-dto';

type ViewMode = 'list' | 'create' | 'edit' | 'anamnesis';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch {
      setError('Erro ao carregar pacientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleCreatePatient = async (data: PatientRequestDto) => {
    try {
      await createPatient(data);
      handleBackToList();
    } catch {
      setError('Erro ao adicionar paciente.');
    }
  };

  const handleUpdatePatient = async (id: string, data: Partial<Patient>) => {
    try {
      await updatePatient(id, data);
      handleBackToList();
    } catch {
      setError('Erro ao editar paciente.');
    }
  };

  const handleAddAnamnesis = async (patientId: string, anamnesisData: any) => {
    try {
      await addAnamnesis(patientId, anamnesisData);
      handleBackToList();
    } catch {
      setError('Erro ao adicionar anamnese.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      try {
        await deletePatient(deleteTargetId);
        setDeleteTargetId(null);
        loadPatients();
      } catch {
        setError('Erro ao excluir paciente.');
      }
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setEditingPatient(null);
    setSelectedPatientId(null);
    loadPatients();
  };

  return (
    <Box sx={{ p: 3 }}>
      {viewMode === 'list' && (
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">Meus Pacientes</Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setViewMode('create')}
            >
              Adicionar Paciente
            </Button>
          </Stack>

          {loading && <CircularProgress />}

          {error && <Alert severity="error">{error}</Alert>}

          {!loading && !error && patients.length === 0 && (
            <Alert severity="info">Nenhum paciente encontrado.</Alert>
          )}

          {!loading && !error && patients.length > 0 && (
            <Stack divider={<Divider />} spacing={1}>
              {patients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  isSelected={selectedPatientId === patient.id}
                  onSelect={() =>
                    setSelectedPatientId((prev) => (prev === patient.id ? null : patient.id))
                  }
                  onEdit={() => {
                    setEditingPatient(patient);
                    setViewMode('edit');
                  }}
                  onAddAnamnesis={() => {
                    setEditingPatient(patient);
                    setViewMode('anamnesis');
                  }}
                  onDelete={() => setDeleteTargetId(patient.id)}
                />
              ))}
            </Stack>
          )}
        </>
      )}

      {viewMode === 'create' && (
        <PatientForm
          onSuccess={handleCreatePatient}
          onCancel={handleBackToList}
        />
      )}

      {viewMode === 'edit' && editingPatient && (
        <PatientEditForm
          patient={editingPatient}
          onSuccess={handleUpdatePatient}
          onCancel={handleBackToList}
        />
      )}

      {viewMode === 'anamnesis' && editingPatient && (
        <AnamnesisForm
          patientId={editingPatient.id}
          onSuccess={handleAddAnamnesis}
          onCancel={handleBackToList}
        />
      )}

      <ConfirmDeleteModal
        isOpen={deleteTargetId !== null}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </Box>
  );
}

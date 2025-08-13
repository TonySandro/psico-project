import React, { useCallback, useEffect, useState } from 'react';
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
import { jwtDecode } from 'jwt-decode';

import { Patient } from '../../types/patient';
import { PatientRequestDto } from '../../types/patient-request-dto';

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

type ViewMode = 'list' | 'create' | 'edit' | 'anamnesis';

interface TokenPayload {
  id?: string;
}

const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [accountId, setAccountId] = useState<string | null>(null);

  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setAccountId(null);
      setLoading(false);
      return;
    }


    try {
      const decoded = jwtDecode<TokenPayload>(token);

      if (decoded?.id) {
        setAccountId(decoded.id);
      } else {
        setError('Token sem accountId. Faça login novamente.');
        setAccountId(null);
      }
    } catch (e) {
      console.error('Erro ao decodificar JWT:', e);
      setError('Sessão inválida. Faça login novamente.');
      setAccountId(null);
    } finally {
      if (!accountId) {
        setLoading(false);
      }
    }
  }, []);

  const loadPatients = useCallback(async () => {
    if (!accountId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await getPatients(accountId);

      const data = Array.isArray(response) ? response : response?.data;
      setPatients(data ?? []);
    } catch (e) {
      console.error('Erro ao carregar pacientes:', e);
      setError('Erro ao carregar pacientes.');
    } finally {
      setLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    if (accountId) loadPatients();
  }, [accountId, loadPatients]);

  const handleBackToList = useCallback(() => {
    setViewMode('list');
    setEditingPatient(null);
    setSelectedPatientId(null);
    loadPatients();
  }, [loadPatients]);

  const handleCreatePatient = useCallback(
    async (data: PatientRequestDto) => {
      if (!accountId) {
        setError('Sessão expirada. Faça login novamente.');
        return;
      }
      try {
        const { accountId: _ignore, ...rest } = data;
        await createPatient({ ...rest, accountId });
        handleBackToList();
      } catch (e) {
        console.error('Erro ao adicionar paciente:', e);
        setError('Erro ao adicionar paciente.');
      }
    },
    [accountId, handleBackToList]
  );

  const handleUpdatePatient = useCallback(
    async (id: string, data: Partial<Patient>) => {
      try {
        await updatePatient(id, data);
        handleBackToList();
      } catch (e) {
        console.error('Erro ao editar paciente:', e);
        setError('Erro ao editar paciente.');
      }
    },
    [handleBackToList]
  );

  const handleAddAnamnesis = useCallback(
    async (patientId: string, anamnesisData: Record<string, unknown>) => {
      try {
        await addAnamnesis(patientId, anamnesisData);
        handleBackToList();
      } catch (e) {
        console.error('Erro ao adicionar anamnese:', e);
        setError('Erro ao adicionar anamnese.');
      }
    },
    [handleBackToList]
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTargetId) return;
    try {
      await deletePatient(deleteTargetId);

      setPatients((prev) => prev.filter((p) => p.id !== deleteTargetId));
      setDeleteTargetId(null);
    } catch (e) {
      console.error('Erro ao excluir paciente:', e);
      setError('Erro ao excluir paciente.');
    }
  }, [deleteTargetId]);

  const isList = viewMode === 'list';

  return (
    <Box sx={{ p: 3 }}>
      {isList && (
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">Meus Pacientes</Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={loadPatients}
                disabled={loading || !accountId}
              >
                Recarregar
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => setViewMode('create')}
                disabled={!accountId}
              >
                Adicionar Paciente
              </Button>
            </Stack>
          </Stack>

          {loading && (
            <Stack alignItems="center" mt={4}>
              <CircularProgress />
            </Stack>
          )}

          {!loading && error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {!loading && !error && !accountId && (
            <Alert severity="warning">
              Você não está autenticado. Faça login para visualizar seus pacientes.
            </Alert>
          )}

          {!loading && !error && accountId && patients.length === 0 && (
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
        <PatientForm onSuccess={handleCreatePatient} onCancel={handleBackToList} />
      )}

      {viewMode === 'edit' && editingPatient && (
        <PatientEditForm
          patient={editingPatient}
          onSuccess={(data) => handleUpdatePatient(editingPatient.id, data)}
          onCancel={handleBackToList}
        />
      )}

      {viewMode === 'anamnesis' && editingPatient && (
        <AnamnesisForm
          patientId={editingPatient.id}
          patientName={editingPatient.name}
          age={editingPatient.age}
          schoolYear={editingPatient.schoolYear}
          onSuccess={(data) => handleAddAnamnesis(editingPatient.id, data)}
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
};

export default PatientsPage;

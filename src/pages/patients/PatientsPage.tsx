import React, { useEffect, useState } from 'react';
import styles from './PatientsPage.module.scss';
import { deletePatient, getPatients } from '../../services/patientService';
import AddPatientButton from '../../components/patient/PatientButton/AddPatientButton';
import PatientCard from '../../components/patient/PatientCard/PatientCard';
import PatientForm from '../../components/patient/PatientForm/PatientForm';
import PatientEditForm from '../../components/patient/PatientEditForm/PatientEditForm';
import AnamnesisForm from '../../components/patient/AnamnesisForm/AnamnesisForm';
import ConfirmDeleteModal from '../../components/patient/ConfirmDeleteModal/ConfirmDeleteModal';

interface Patient {
  id: string;
  name: string;
  age: number;
  schoolYear: string;
  gender: string;
  address?: string;
  phoneNumber?: string;
  motherName?: string;
  fatherName?: string;
  dateOfBirth?: string;
}

type ViewMode = 'list' | 'create' | 'edit' | 'anamnesis';

const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isListView, setIsListView] = useState(true);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (err) {
      if (patients.length === 0) {
        setError('Nenhum paciente encontrado.');
      }
      
      setError('Erro ao carregar pacientes. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deletePatient(deleteTargetId);
      setDeleteTargetId(null);
      loadPatients();
    }
  };

  const handleAddPatient = () => {
    setViewMode('create');
    setSelectedPatientId(null);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setViewMode('edit');
    setSelectedPatientId(null);
  };

  const handleAddAnamnesis = (patient: Patient) => {
    setEditingPatient(patient);
    setViewMode('anamnesis');
    setSelectedPatientId(null);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setEditingPatient(null);
    setSelectedPatientId(null);
    loadPatients();
  };

  return (
    <div className={styles.container}>
      {viewMode === 'list' && (
        <>
          <div className={styles.header}>
            <h1>Meus Pacientes</h1>
            <div>
              <button onClick={() => setIsListView(!isListView)}>
                {isListView ? 'Modo Grade' : 'Modo Lista'}
              </button>
              <AddPatientButton onClick={handleAddPatient} />
            </div>
          </div>

          {loading && <p>Carregando pacientes...</p>}

          {error && <p className={styles.error}>{error}</p>}

          {!loading && !error && patients.length === 0 && (
            <p className={styles.empty}>Nenhum paciente encontrado.</p>
          )}

          {!loading && !error && patients.length > 0 && (
            <div className={styles.cardGrid}>
              {patients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  isExpanded={selectedPatientId === patient.id}
                  isListView={isListView}
                  onSelect={() => setSelectedPatientId(patient.id === selectedPatientId ? null : patient.id)}
                  onEdit={() => handleEditPatient(patient)}
                  onAddAnamnesis={() => handleAddAnamnesis(patient)}
                  onDelete={() => setDeleteTargetId(patient.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {viewMode === 'create' && (
        <PatientForm onSuccess={handleBackToList} onCancel={handleBackToList} />
      )}

      {viewMode === 'edit' && editingPatient && (
        <PatientEditForm
          patient={editingPatient}
          onSuccess={handleBackToList}
          onCancel={handleBackToList}
        />
      )}

      {viewMode === 'anamnesis' && editingPatient && (
        <AnamnesisForm
          patientId={editingPatient.id}
          patientName={editingPatient.name}
          age={editingPatient.age}
          schoolYear={editingPatient.schoolYear}
          onSuccess={handleBackToList}
          onCancel={handleBackToList}
        />
      )}

      <ConfirmDeleteModal
        isOpen={deleteTargetId !== null}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default PatientsPage;

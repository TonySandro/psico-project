import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Stack, Button, TextField, InputAdornment, Box, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Plus, Search } from 'lucide-react';
import { usePatients, useDeletePatient } from '@/hooks/usePatients';
import { useAuthStore } from '@/stores/authStore';
import PatientForm from '@/components/PatientForm';
import type { Patient } from '@/types/schema';

import PatientRow from '@/components/PatientRow';

export default function PatientsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { data: patients, isLoading, error } = usePatients(user?.id || '');
  const deletePatient = useDeletePatient();
  const [searchQuery, setSearchQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);


  const filteredPatients = patients?.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setPatientToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleAnamnesis = (id: string) => {
    navigate(`/patients/${id}/anamnesis/new`);
  };



  const confirmDelete = () => {
    if (patientToDelete) {
      deletePatient.mutate(patientToDelete, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setPatientToDelete(null);
        }
      });
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedPatient(undefined);
  };

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center min-h-[400px]">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Erro ao carregar pacientes: {(error as Error).message}
        <br />
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </Alert>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={700}>
          Pacientes
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setFormOpen(true)}
        >
          Adicionar Paciente
        </Button>
      </Stack>

      <TextField
        placeholder="Buscar pacientes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            )
          }
        }}
        sx={{ maxWidth: 400 }}
      />

      {filteredPatients.length === 0 ? (
        <Box className="text-center py-12">
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhum paciente encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchQuery ? 'Tente uma busca diferente' : 'Comece adicionando seu primeiro paciente'}
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>Idade</strong></TableCell>
                <TableCell><strong>Escolaridade</strong></TableCell>
                <TableCell><strong>Gênero</strong></TableCell>
                <TableCell><strong>Data de Nascimento</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="right"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.map((patient) => (
                <PatientRow
                  key={patient.id}
                  patient={patient}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAnamnesis={handleAnamnesis}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Patient Form Dialog */}
      <Dialog
        open={formOpen}
        onClose={handleFormClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedPatient ? 'Editar Paciente' : 'Adicionar Paciente'}
        </DialogTitle>
        <PatientForm
          patient={selectedPatient}
          onClose={handleFormClose}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir este paciente? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            disabled={deletePatient.isPending}
          >
            {deletePatient.isPending ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
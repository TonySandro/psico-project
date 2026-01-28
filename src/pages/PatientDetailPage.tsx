import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Button, Grid, Box, CircularProgress, Alert, Typography, Dialog, DialogTitle } from '@mui/material';
import { Edit, Plus } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { usePatient } from '@/hooks/usePatients';
import PatientForm from '@/components/PatientForm';
import PatientProfileCard from '@/components/patient/PatientProfileCard';
import AnamnesisCard from '@/components/patient/AnamnesisCard';
import AssessmentListCard from '@/components/patient/AssessmentListCard';
import ReportListCard from '@/components/patient/ReportListCard';

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: patient, isLoading, error } = usePatient(id || '');

  const [isEditOpen, setIsEditOpen] = useState(false);

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center min-h-[400px]">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !patient) {
    return (
      <Alert severity="error">
        Erro ao carregar paciente. Tente novamente.
      </Alert>
    );
  }

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <BackButton to="/app/patients" />
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                onClick={() => navigate('/app/patients')}
              >
                Pacientes
              </Typography>
              <Typography variant="caption" color="text.secondary">
                &gt;
              </Typography>
              <Typography variant="caption" color="text.primary" fontWeight={600}>
                {patient.name}
              </Typography>
            </Stack>
            <Typography variant="h4" fontWeight={700}>
              {patient.name}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Edit size={18} />}
            sx={{ bgcolor: 'white', color: 'text.primary', borderColor: 'divider' }}
            onClick={() => setIsEditOpen(true)}
          >
            Editar Perfil
          </Button>
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            color="secondary"
            onClick={() => navigate('/app/tests')}
          >
            Novo Teste
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {/* Left Column - Profile */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <PatientProfileCard patient={patient} />
        </Grid>

        {/* Right Column - Data */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            <AnamnesisCard patientId={patient.id} />
            <AssessmentListCard protocols={patient.protocols} />
            <ReportListCard patientId={patient.id} />
          </Stack>
        </Grid>
      </Grid>

      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Editar Paciente</DialogTitle>
        <PatientForm patient={patient} onClose={() => setIsEditOpen(false)} />
      </Dialog>
    </Stack>
  );
}
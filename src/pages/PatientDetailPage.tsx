import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Stack, Button, Card, CardContent, Grid, Chip, Box, CircularProgress, Alert } from '@mui/material';
import { ArrowLeft, Edit } from 'lucide-react';
import { usePatient } from '@/hooks/usePatients';
import { formatDate } from '@/utils/formatters';

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: patient, isLoading, error } = usePatient(id || '');

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
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => navigate('/patients')}
          variant="outlined"
        >
          Voltar
        </Button>
        <Typography variant="h4" fontWeight={700} sx={{ flexGrow: 1 }}>
          {patient.name}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Edit size={20} />}
        >
          Editar
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h6">Informações Pessoais</Typography>
              <Chip
                label={patient.status === 'Active' ? 'Ativo' : 'Inativo'}
                color={patient.status === 'Active' ? 'success' : 'default'}
                size="small"
              />
            </Stack>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    IDADE
                  </Typography>
                  <Typography variant="body1">
                    {patient.age} anos
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    DATA DE NASCIMENTO
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(patient.dateOfBirth)}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    GÊNERO
                  </Typography>
                  <Typography variant="body1">
                    {patient.gender === 'Masculino' ? 'Masculino' : patient.gender === 'Feminino' ? 'Feminino' : 'Outro'}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    ESCOLARIDADE
                  </Typography>
                  <Typography variant="body1">
                    {patient.schoolYear}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    TELEFONE
                  </Typography>
                  <Typography variant="body1">
                    {patient.phoneNumber || '-'}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    ENDEREÇO
                  </Typography>
                  <Typography variant="body1">
                    {patient.address || '-'}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    NOME DA MÃE
                  </Typography>
                  <Typography variant="body1">
                    {patient.motherName || '-'}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    NOME DO PAI
                  </Typography>
                  <Typography variant="body1">
                    {patient.fatherName || '-'}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Histórico de Avaliações
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Nenhuma avaliação registrada ainda.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
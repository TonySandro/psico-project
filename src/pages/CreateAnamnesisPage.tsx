import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, Stack, CircularProgress, Alert } from '@mui/material';
import { usePatient } from '@/hooks/usePatients';
import { ArrowLeft } from 'lucide-react';

export default function CreateAnamnesisPage() {
    const { patientId } = useParams<{ patientId: string }>();
    const navigate = useNavigate();

    const { data: patient, isLoading: isLoadingPatient, error: patientError } = usePatient(patientId || '');

    if (isLoadingPatient) {
        return (
            <Box className="flex items-center justify-center min-h-[400px]">
                <CircularProgress />
            </Box>
        );
    }

    if (patientError || !patient) {
        return (
            <Alert severity="error">
                Erro ao carregar dados do paciente.
            </Alert>
        );
    }

    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={2} className="mb-6">
                <Button
                    startIcon={<ArrowLeft size={20} />}
                    onClick={() => navigate('/app/patients')}
                    color="inherit"
                >
                    Voltar
                </Button>
                <Typography variant="h4" fontWeight={700}>
                    Nova Anamnese: {patient.name}
                </Typography>
            </Stack>

            <Alert severity="warning" variant="filled">
                A funcionalidade de criação de nova anamnese está temporariamente indisponível.
                <br />
                Por favor, tente novamente mais tarde ou entre em contato com o suporte.
            </Alert>
        </Box>
    );
}

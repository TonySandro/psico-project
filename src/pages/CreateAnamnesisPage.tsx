import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, Stack, CircularProgress, Alert } from '@mui/material';
import { useAuthStore } from '@/stores/authStore';
import { usePatient } from '@/hooks/usePatients';
import { useCreateAnamnesis } from '@/hooks/useAnamnesis';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateAnamnesisPage() {
    const { patientId } = useParams<{ patientId: string }>();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    const { data: patient, isLoading: isLoadingPatient, error: patientError } = usePatient(patientId || '');
    const { mutate: createAnamnesis, isPending: isSaving, error: saveError } = useCreateAnamnesis();

    const [formData, setFormData] = useState({
        reasonForReferral: '',
        developmentalHistory: '',
        schoolHistory: '',
        familyHistory: '',
        healthHistory: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!patient || !user) return;

        createAnamnesis({
            accountId: user.id || '',
            patientId: patient.id,
            patientName: patient.name,
            age: patient.age,
            schoolYear: patient.schoolYear,
            ...formData
        }, {
            onSuccess: () => {
                navigate('/app/patients');
            }
        });
    };

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

            {saveError && (
                <Alert severity="error" className="mb-4">
                    Erro ao salvar anamnese. Tente novamente.
                </Alert>
            )}

            <Paper className="p-6">
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="Motivo do Encaminhamento"
                            name="reasonForReferral"
                            value={formData.reasonForReferral}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Histórico de Desenvolvimento"
                            name="developmentalHistory"
                            value={formData.developmentalHistory}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Histórico Escolar"
                            name="schoolHistory"
                            value={formData.schoolHistory}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Histórico Familiar"
                            name="familyHistory"
                            value={formData.familyHistory}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Histórico de Saúde"
                            name="healthHistory"
                            value={formData.healthHistory}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                            required
                        />

                        <Box className="flex justify-end gap-2 mt-4">
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/app/patients')}
                                disabled={isSaving}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<Save size={20} />}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Salvando...' : 'Salvar Anamnese'}
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}

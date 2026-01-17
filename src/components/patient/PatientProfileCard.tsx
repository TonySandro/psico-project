import { Card, CardContent, Typography, Avatar, Stack, Box, Chip, Divider } from '@mui/material';
import { Phone, User, MapPin, GraduationCap, FileText } from 'lucide-react';
import type { Patient } from '@/types/schema';

interface PatientProfileCardProps {
    patient: Patient;
}

export default function PatientProfileCard({ patient }: PatientProfileCardProps) {
    return (
        <Card sx={{ height: '100%', mb: 2 }}>
            <CardContent>
                <Stack spacing={3} alignItems="center" sx={{ mb: 3 }}>
                    <Avatar
                        sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: '2.5rem' }}
                    >
                        {patient.name.charAt(0)}
                    </Avatar>

                    <Box textAlign="center">
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            {patient.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {patient.age} anos
                        </Typography>
                        <Typography variant="caption" display="block" color="text.disabled" sx={{ mt: 0.5 }}>
                            Código: #{patient.id.slice(0, 6).toUpperCase()}
                        </Typography>
                    </Box>

                    <Chip
                        label={patient.status === 'active' ? 'Ativo' : 'Inativo'}
                        color={patient.status === 'active' ? 'success' : 'default'}
                        size="small"
                        sx={{
                            bgcolor: patient.status === 'active' ? 'rgba(76, 175, 80, 0.1)' : undefined,
                            color: patient.status === 'active' ? 'success.main' : undefined,
                            fontWeight: 600
                        }}
                    />

                    <Box sx={{ width: '100%', bgcolor: 'background.default', p: 2, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={700} gutterBottom display="block">
                            DIAGNÓSTICO / HIPÓTESE
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            <Chip label="Em avaliação" size="small" sx={{ bgcolor: 'secondary.main', color: 'white', fontWeight: 600, opacity: 0.8 }} />
                            {/* Placeholder for future tags */}
                        </Stack>
                    </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Box sx={{ p: 1, bgcolor: 'primary.50', borderRadius: 1, color: 'primary.main' }}>
                            <User size={20} />
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                RESPONSÁVEIS
                            </Typography>
                            <Typography variant="body2">
                                {patient.motherName} {patient.fatherName ? `& ${patient.fatherName}` : ''}
                            </Typography>
                        </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap={2}>
                        <Box sx={{ p: 1, bgcolor: 'primary.50', borderRadius: 1, color: 'primary.main' }}>
                            <Phone size={20} />
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                TELEFONE
                            </Typography>
                            <Typography variant="body2">
                                {patient.phoneNumber}
                            </Typography>
                        </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap={2}>
                        <Box sx={{ p: 1, bgcolor: 'primary.50', borderRadius: 1, color: 'primary.main' }}>
                            <GraduationCap size={20} />
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                ESCOLARIDADE
                            </Typography>
                            <Typography variant="body2">
                                {patient.schoolYear}
                            </Typography>
                        </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap={2}>
                        <Box sx={{ p: 1, bgcolor: 'primary.50', borderRadius: 1, color: 'primary.main' }}>
                            <MapPin size={20} />
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                ENDEREÇO
                            </Typography>
                            <Typography variant="body2">
                                {patient.address}
                            </Typography>
                        </Box>
                    </Box>
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Box>
                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                        <Box sx={{ p: 0.5, bgcolor: 'secondary.main', borderRadius: 0.5, color: 'white' }}>
                            <FileText size={16} />
                        </Box>
                        <Typography variant="subtitle2" fontWeight={700}>
                            Notas Rápidas
                        </Typography>
                    </Stack>
                    <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Typography variant="body2" color="text.secondary" fontStyle="italic">
                            Nenhuma nota registrada.
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

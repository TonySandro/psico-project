import {
    TableRow, TableCell, Collapse, Box, Typography, Grid, Button, IconButton, Chip, Tooltip, Stack
} from '@mui/material';
import { Edit, Trash2, FileText, ChevronDown, ChevronUp, Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Patient } from '@/types/schema';
import { formatDate } from '@/utils/formatters';
import { useGetAnamnesis } from '@/hooks/useAnamnesis';
import { useGetProtocols } from '@/hooks/useTests';

interface PatientRowProps {
    patient: Patient;
    expanded: boolean;
    onToggle: () => void;
    onEdit: (patient: Patient) => void;
    onDelete: (id: string) => void;
    onAnamnesis: (id: string) => void;
}

export default function PatientRow({
    patient, expanded, onToggle, onEdit, onDelete, onAnamnesis
}: PatientRowProps) {
    const navigate = useNavigate();

    // Fetch details conditionally when expanded
    // Note: hooks run unconditionally, but we can use 'enabled' to skip fetch until needed.
    // However, for immediate responsiveness, we might want to fetch. 
    // But to save resources, 'enabled: expanded' is better.
    const { data: anamnesis } = useGetAnamnesis(patient.id);
    const { data: protocols } = useGetProtocols(patient.id);

    // Derive "Reports" existence from protocols or another source. 
    // For now, checks if any existing protocols are marked as 'Report' or just assume separate.
    // Since we don't have a reports endpoint, we'll assume protocols cover evaluations.
    // We'll leave Reports inactive or based on protocols for now.
    const hasAnamnesis = !!anamnesis;
    // const hasEvaluations = protocols && protocols.length > 0;

    // Mock logic for Reports - assuming if evaluations exist, reports might exist
    const hasReports = false;

    return (
        <>
            <TableRow
                hover
                onClick={onToggle}
                sx={{ cursor: 'pointer', '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age} anos</TableCell>
                <TableCell>{patient.schoolYear}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{formatDate(patient.dateOfBirth)}</TableCell>
                <TableCell>
                    <Chip
                        label={patient.status === 'Active' ? 'Ativo' : 'Inativo'}
                        size="small"
                        color={patient.status === 'Active' ? 'success' : 'default'}
                    />
                </TableCell>
                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Tooltip title={expanded ? "Minimizar" : "Detalhes"}>
                            <IconButton size="small" onClick={onToggle}>
                                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Nova Anamnese">
                            <IconButton size="small" onClick={() => onAnamnesis(patient.id)} color="primary">
                                <FileText size={18} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Editar">
                            <IconButton size="small" onClick={() => onEdit(patient)} color="warning">
                                <Edit size={18} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Excluir">
                            <IconButton size="small" onClick={() => onDelete(patient.id)} color="error">
                                <Trash2 size={18} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2, padding: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" color="primary">
                                Detalhes do Paciente
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle2" color="text.secondary">Dados Gerais</Typography>
                                        <Grid container spacing={1} sx={{ mt: 0.5 }}>
                                            <Grid size={{ xs: 6 }}>
                                                <Typography variant="caption" display="block" color="text.secondary">Telefone</Typography>
                                                <Typography variant="body2">{patient.phoneNumber || '-'}</Typography>
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <Typography variant="caption" display="block" color="text.secondary">Endereço</Typography>
                                                <Typography variant="body2">{patient.address || '-'}</Typography>
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <Typography variant="caption" display="block" color="text.secondary">Mãe</Typography>
                                                <Typography variant="body2">{patient.motherName || '-'}</Typography>
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <Typography variant="caption" display="block" color="text.secondary">Pai</Typography>
                                                <Typography variant="body2">{patient.fatherName || '-'}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Stack spacing={1}>
                                        {/* Anamnesis Section */}
                                        <Box sx={{ p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Typography variant="subtitle2">Anamnese</Typography>
                                                {hasAnamnesis ? (
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        startIcon={<Eye size={16} />}
                                                        onClick={() => alert('Visualização de Anamnese em desenvolvimento')}
                                                    >
                                                        Visualizar
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        startIcon={<Plus size={16} />}
                                                        onClick={() => onAnamnesis(patient.id)}
                                                    >
                                                        Adicionar
                                                    </Button>
                                                )}
                                            </Stack>
                                        </Box>

                                        {/* Reports Section */}
                                        <Box sx={{ p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Typography variant="subtitle2">Relatórios</Typography>
                                                {hasReports ? (
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        startIcon={<Eye size={16} />}
                                                        onClick={() => { }}
                                                    >
                                                        Visualizar
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        startIcon={<Plus size={16} />}
                                                        onClick={() => alert('Funcionalidade de Relatório em desenvolvimento')}
                                                    >
                                                        Adicionar
                                                    </Button>
                                                )}
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

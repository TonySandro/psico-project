import {
    TableRow, TableCell, IconButton, Chip, Tooltip, Stack, Typography
} from '@mui/material';
import { Edit, Trash2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Patient } from '@/types/schema';
import { formatDate } from '@/utils/formatters';

interface PatientRowProps {
    patient: Patient;
    onEdit: (patient: Patient) => void;
    onDelete: (id: string) => void;
    onAnamnesis: (id: string) => void;
}

export default function PatientRow({
    patient, onEdit, onDelete, onAnamnesis
}: PatientRowProps) {
    const navigate = useNavigate();

    return (
        <TableRow
            hover
            onClick={() => navigate(`/patients/${patient.id}`)}
            sx={{ cursor: 'pointer' }}
        >
            <TableCell>
                <Typography
                    component="span"
                    sx={{
                        fontWeight: 600,
                        color: 'primary.main',
                    }}
                >
                    {patient.name}
                </Typography>
            </TableCell>
            <TableCell>{patient.age} anos</TableCell>
            <TableCell>{patient.schoolYear}</TableCell>
            <TableCell>{patient.gender}</TableCell>
            <TableCell>{formatDate(patient.dateOfBirth)}</TableCell>
            <TableCell>
                <Chip
                    label={patient.status === 'active' ? 'Ativo' : 'Inativo'}
                    size="small"
                    color={patient.status === 'active' ? 'success' : 'default'}
                />
            </TableCell>
            <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
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
    );
}

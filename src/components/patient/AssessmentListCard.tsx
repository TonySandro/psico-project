import { useState } from 'react';
import {
    Card, CardContent, Typography, Button, Stack, Box, List, ListItem,
    ListItemText, ListItemIcon, IconButton, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Plus, HelpCircle, Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import type { Protocol } from '@/types/schema';
import TestResultDialog from './TestResultDialog';
import { useDeleteProtocol } from '@/hooks/useTests';

interface AssessmentListCardProps {
    protocols?: Protocol[];
    patientId: string;
    accountId: string;
}

/** Returns the human-readable display name for a protocol, including the subtest when applicable. */
export function getProtocolDisplayName(protocol: Protocol): string {
    const name = protocol.name as string;

    if (name === 'TDE-II' || name === 'tde2') {
        const data = protocol.data as Record<string, unknown>;
        const subteste = data?.subteste as string | undefined;
        const subtesteMap: Record<string, string> = {
            ESCRITA: 'Escrita',
            LEITURA: 'Leitura',
            ARITMETICA: 'Aritmética',
        };
        const subtesteLabel = subteste ? subtesteMap[subteste] : undefined;
        return subtesteLabel ? `TDE-II – ${subtesteLabel}` : 'TDE-II';
    }

    return name;
}

export default function AssessmentListCard({ protocols = [], patientId, accountId }: AssessmentListCardProps) {
    const navigate = useNavigate();
    const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [protocolToDelete, setProtocolToDelete] = useState<Protocol | null>(null);

    const { mutate: deleteProtocol, isPending: isDeleting } = useDeleteProtocol();

    const handleProtocolClick = (protocol: Protocol) => {
        setSelectedProtocol(protocol);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (e: React.MouseEvent, protocol: Protocol) => {
        e.stopPropagation();
        setProtocolToDelete(protocol);
    };

    const handleConfirmDelete = () => {
        if (!protocolToDelete) return;
        deleteProtocol(
            { patientId, accountId, protocolId: protocolToDelete.id },
            { onSettled: () => setProtocolToDelete(null) }
        );
    };

    return (
        <>
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Box sx={{ p: 1, bgcolor: 'primary.50', borderRadius: 1, color: 'primary.main' }}>
                                <ClipboardList size={24} />
                            </Box>
                            <Typography variant="h6" fontWeight={700}>
                                Testes
                            </Typography>
                        </Stack>
                        <Button
                            variant="text"
                            disableElevation
                            startIcon={<Plus size={18} />}
                            sx={{ 
                                bgcolor: 'primary.50', 
                                color: 'primary.main', 
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 2,
                                transition: 'all 0.2s ease',
                                '&:hover': { 
                                    bgcolor: 'primary.100',
                                    transform: 'translateY(-1px)'
                                } 
                            }}
                            onClick={() => navigate('/app/tests')}
                        >
                            Novo Teste
                        </Button>
                    </Stack>

                    <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 0 }}>
                        {protocols && protocols.length > 0 ? (
                            protocols.map((protocol) => (
                                <ListItem
                                    key={protocol.id}
                                    onClick={() => handleProtocolClick(protocol)}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        px: 2.5,
                                        py: 1.5,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        bgcolor: 'background.paper',
                                        display: 'flex',
                                        alignItems: 'center',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            bgcolor: '#f8fafc',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 48 }}>
                                        <Box sx={{ 
                                            p: 1, 
                                            bgcolor: 'white', 
                                            border: '1px solid', 
                                            borderColor: 'divider', 
                                            borderRadius: 1.5, 
                                            display: 'flex', 
                                            color: 'primary.main',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                                        }}>
                                            <ClipboardList size={18} />
                                        </Box>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                                                {getProtocolDisplayName(protocol)}
                                            </Typography>
                                        }
                                    />
                                    
                                    <Stack direction="row" alignItems="center" spacing={3}>
                                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                            {protocol.createdAt ? formatDate(protocol.createdAt) : '-'}
                                        </Typography>
                                        
                                        <IconButton
                                            aria-label="excluir teste"
                                            onClick={(e) => handleDeleteClick(e, protocol)}
                                            size="small"
                                            sx={{
                                                color: 'error.main',
                                                opacity: 0.5,
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    opacity: 1,
                                                    bgcolor: 'error.50',
                                                    transform: 'scale(1.05)'
                                                }
                                            }}
                                        >
                                            <Trash2 size={18} />
                                        </IconButton>
                                    </Stack>
                                </ListItem>
                            ))
                        ) : (
                            <Box sx={{ py: 6, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 2, border: '1px dashed', borderColor: 'divider' }}>
                                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                    Nenhum teste registrado.
                                </Typography>
                            </Box>
                        )}
                    </List>
                </CardContent>

                <TestResultDialog
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    protocol={selectedProtocol}
                />
            </Card>

            {/* Delete confirmation dialog */}
            <Dialog
                open={!!protocolToDelete}
                onClose={() => !isDeleting && setProtocolToDelete(null)}
                maxWidth="xs"
                fullWidth
                PaperProps={{ sx: { borderRadius: 3 } }}
            >
                <DialogTitle sx={{ fontWeight: 700 }}>
                    Excluir Teste
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja excluir o teste{' '}
                        <strong>{protocolToDelete ? getProtocolDisplayName(protocolToDelete) : ''}</strong>?
                        Essa ação não pode ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
                    <Button
                        onClick={() => setProtocolToDelete(null)}
                        disabled={isDeleting}
                        variant="outlined"
                        sx={{ borderRadius: 2, fontWeight: 600 }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        disabled={isDeleting}
                        variant="contained"
                        color="error"
                        startIcon={isDeleting ? <CircularProgress size={16} color="inherit" /> : <Trash2 size={16} />}
                        sx={{ borderRadius: 2, fontWeight: 700 }}
                    >
                        {isDeleting ? 'Excluindo...' : 'Excluir'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

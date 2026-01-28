import { useState } from 'react';
import { Card, CardContent, Typography, Button, Stack, Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Plus, HelpCircle } from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import type { Protocol } from '@/types/schema';
import TestResultDialog from './TestResultDialog';

interface AssessmentListCardProps {
    protocols?: Protocol[];
}

export default function AssessmentListCard({ protocols = [] }: AssessmentListCardProps) {
    const navigate = useNavigate();
    const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProtocolClick = (protocol: Protocol) => {
        setSelectedProtocol(protocol);
        setIsModalOpen(true);
    };

    return (
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
                        startIcon={<Plus size={18} />}
                        sx={{ bgcolor: 'primary.50', color: 'primary.main', fontWeight: 600, '&:hover': { bgcolor: 'primary.100' } }}
                        onClick={() => navigate('/app/tests')}
                    >
                        Novo Teste
                    </Button>
                </Stack>

                <List>
                    {protocols && protocols.length > 0 ? (
                        protocols.map((protocol) => (
                            <ListItem
                                key={protocol.id}
                                onClick={() => handleProtocolClick(protocol)}
                                sx={{
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                    '&:last-child': { borderBottom: 'none' },
                                    px: 1,
                                    py: 1,
                                    cursor: 'pointer',
                                    borderRadius: 1,
                                    transition: 'background-color 0.2s',
                                    '&:hover': {
                                        bgcolor: 'primary.50'
                                    }
                                }}
                            >
                                <ListItemIcon>
                                    <Box sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                                        <HelpCircle size={20} className="text-gray-500" />
                                    </Box>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {protocol.name}
                                        </Typography>
                                    }
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                                    {protocol.createdAt ? formatDate(protocol.createdAt) : '-'}
                                </Typography>
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                            Nenhum teste registrado.
                        </Typography>
                    )}
                </List>
            </CardContent>

            <TestResultDialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                protocol={selectedProtocol}
            />
        </Card >
    );
}

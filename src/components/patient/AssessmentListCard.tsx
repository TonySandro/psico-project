import { Card, CardContent, Typography, Button, Stack, Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { ClipboardList, Plus, HelpCircle } from 'lucide-react';
import { useGetProtocols } from '@/hooks/useTests';
import { formatDate } from '@/utils/formatters';

interface AssessmentListCardProps {
    patientId: string;
}

export default function AssessmentListCard({ patientId }: AssessmentListCardProps) {
    const { data: protocols } = useGetProtocols(patientId);

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Box sx={{ p: 1, bgcolor: 'primary.50', borderRadius: 1, color: 'primary.main' }}>
                            <ClipboardList size={24} />
                        </Box>
                        <Typography variant="h6" fontWeight={700}>
                            Avaliações
                        </Typography>
                    </Stack>
                    <Button
                        variant="text"
                        startIcon={<Plus size={18} />}
                        sx={{ bgcolor: 'primary.50', color: 'primary.main', fontWeight: 600, '&:hover': { bgcolor: 'primary.100' } }}
                    >
                        Nova Avaliação
                    </Button>
                </Stack>

                <List>
                    {protocols && protocols.length > 0 ? (
                        protocols.map((protocol) => (
                            <ListItem
                                key={protocol.id}
                                sx={{
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                    '&:last-child': { borderBottom: 'none' },
                                    px: 0
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
                                    secondary={
                                        <Typography variant="caption" color="text.secondary">
                                            {protocol.type.toUpperCase()}
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
                            Nenhuma avaliação registrada.
                        </Typography>
                    )}
                </List>
            </CardContent>
        </Card>
    );
}

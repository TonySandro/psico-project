import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PaymentPendingPage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Card sx={{ textAlign: 'center', p: 4, borderRadius: 4, boxShadow: '0px 10px 40px rgba(0,0,0,0.1)' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Clock size={80} color="#F59E0B" />
                    </Box>
                    <Typography variant="h4" fontWeight={800} gutterBottom>
                        Pagamento em análise
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Seu pagamento está sendo processado. Assim que confirmado, seu acesso será liberado.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/app/dashboard')}
                        sx={{
                            bgcolor: '#F59E0B',
                            '&:hover': { bgcolor: '#D97706' },
                            borderRadius: 2,
                            px: 4
                        }}
                    >
                        Voltar ao Dashboard
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}

import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useAccount } from '@/hooks/useAccount';

export default function PaymentSuccessPage() {
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);
    useAccount(user?.id);

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Card sx={{ textAlign: 'center', p: 4, borderRadius: 4, boxShadow: '0px 10px 40px rgba(0,0,0,0.1)' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <CheckCircle size={80} color="#10B981" />
                    </Box>
                    <Typography variant="h4" fontWeight={800} gutterBottom>
                        Pagamento realizado!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Sua assinatura foi confirmada. Seu acesso será liberado em instantes.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/app/dashboard')}
                        sx={{
                            bgcolor: '#10B981',
                            '&:hover': { bgcolor: '#059669' },
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

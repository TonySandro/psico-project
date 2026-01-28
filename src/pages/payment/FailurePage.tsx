import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import { XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PaymentFailurePage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Card sx={{ textAlign: 'center', p: 4, borderRadius: 4, boxShadow: '0px 10px 40px rgba(0,0,0,0.1)' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <XCircle size={80} color="#EF4444" />
                    </Box>
                    <Typography variant="h4" fontWeight={800} gutterBottom>
                        Pagamento falhou
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Houve um problema com o pagamento. Por favor, tente novamente.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/app/profile')}
                        sx={{
                            bgcolor: '#EF4444',
                            '&:hover': { bgcolor: '#DC2626' },
                            borderRadius: 2,
                            px: 4
                        }}
                    >
                        Tentar Novamente
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}

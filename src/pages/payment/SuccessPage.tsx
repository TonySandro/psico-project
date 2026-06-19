import { Box, Typography, Button, Container, Card, CardContent, CircularProgress } from '@mui/material';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { useEffect, useState } from 'react';

export default function PaymentSuccessPage() {
    const navigate = useNavigate();
    const { checkStatus } = useSubscription();
    const [verifying, setVerifying] = useState(true);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const verifyPayment = async () => {
            // Wait 3 seconds for webhook processing
            await new Promise((resolve) => setTimeout(resolve, 3000));

            const params = new URLSearchParams(window.location.search);
            const paymentId = params.get('payment_id') || params.get('collection_id');

            try {
                const subStatus = await checkStatus(paymentId || undefined);
                if (isMounted) {
                    if (subStatus.status === 'active') {
                        setVerified(true);
                    }
                    setVerifying(false);
                }
            } catch (err) {
                console.error('Error verifying payment status:', err);
                if (isMounted) {
                    setVerifying(false);
                }
            }
        };

        verifyPayment();
        return () => {
            isMounted = false;
        };
    }, [checkStatus]);

    const handleContinue = () => {
        const redirectPath = sessionStorage.getItem('redirectAfterPayment') || '/app/dashboard';
        sessionStorage.removeItem('redirectAfterPayment');
        navigate(redirectPath);
    };

    // Auto-redirect if verified
    useEffect(() => {
        if (verified) {
            const timer = setTimeout(() => {
                handleContinue();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [verified]);

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Card sx={{ textAlign: 'center', p: 4, borderRadius: 4, boxShadow: '0px 10px 40px rgba(0,0,0,0.1)' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        {verifying ? (
                            <CircularProgress size={80} sx={{ color: '#10B981' }} />
                        ) : (
                            <CheckCircle size={80} color="#10B981" />
                        )}
                    </Box>
                    <Typography variant="h4" fontWeight={800} gutterBottom>
                        {verifying ? 'Confirmando Pagamento...' : 'Pagamento realizado!'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        {verifying
                            ? 'Estamos verificando a confirmação do pagamento com o Mercado Pago. Isso pode levar alguns segundos.'
                            : verified
                            ? 'Sua assinatura Premium foi confirmada com sucesso! Redirecionando em instantes...'
                            : 'Seu pagamento está sendo processado. Você já pode acessar a plataforma.'}
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleContinue}
                        disabled={verifying}
                        sx={{
                            bgcolor: '#10B981',
                            '&:hover': { bgcolor: '#059669' },
                            borderRadius: 2,
                            px: 4,
                            textTransform: 'none',
                            fontWeight: 700
                        }}
                    >
                        {verifying ? 'Aguardando...' : 'Ir para o App'}
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}

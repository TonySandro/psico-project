import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Link,
  Slide,
} from '@mui/material';
import { Cookie, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import {
  getStoredConsent,
  setStoredConsent,
  updateGtagConsent,
} from '@/utils/analytics';

export default function CookieConsentBanner() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    // Regra LGPD: Se o usuário estiver logado, não precisa apresentar o banner
    if (isAuthenticated) {
      setVisible(false);
      updateGtagConsent(true);
      return;
    }

    // Para usuários não logados, verifica a preferência de consentimento prévia
    const storedConsent = getStoredConsent();

    if (storedConsent === null) {
      // Nenhum consentimento salvo ainda: exibe o banner LGPD
      setVisible(true);
      updateGtagConsent(false);
    } else {
      // Já respondeu anteriormente
      setVisible(false);
      updateGtagConsent(storedConsent === 'granted');
    }
  }, [isAuthenticated]);

  // Listener para atualizações de preferência (ex: clique no botão da Política de Cookies)
  useEffect(() => {
    const handleConsentChange = () => {
      if (isAuthenticated) return;
      const stored = getStoredConsent();
      if (stored === null) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('lgpd_consent_reset', handleConsentChange);
    return () => {
      window.removeEventListener('lgpd_consent_reset', handleConsentChange);
    };
  }, [isAuthenticated]);

  const handleAcceptAll = () => {
    setStoredConsent('granted');
    setVisible(false);
  };

  const handleRejectOptional = () => {
    setStoredConsent('denied');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Box
        role="region"
        aria-label="Consentimento de Cookies e Privacidade"
        sx={{
          position: 'fixed',
          bottom: { xs: 12, md: 20 },
          left: { xs: 12, md: 24 },
          right: { xs: 12, md: 'auto' },
          maxWidth: { md: 540 },
          zIndex: 1400,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 2.5, sm: 3 },
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: 'primary.50',
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Cookie size={22} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                  Sua privacidade é importante
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    Conformidade com a LGPD (Lei 13.709/2018)
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Utilizamos cookies essenciais para o funcionamento seguro da plataforma e cookies de análise
              anônima para melhorar nossos serviços. Você pode personalizar ou aceitar o uso de cookies.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              alignItems="stretch"
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                color="inherit"
                size="medium"
                onClick={handleRejectOptional}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: 'grey.300',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    borderColor: 'grey.400',
                  },
                }}
              >
                Apenas essenciais
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleAcceptAll}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                }}
              >
                Aceitar todos
              </Button>
            </Stack>

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', pt: 0.5 }}>
              <Link
                component={RouterLink}
                to="/politica-de-cookies"
                variant="caption"
                color="text.secondary"
                underline="hover"
              >
                Política de Cookies
              </Link>
              <Typography variant="caption" color="text.disabled">
                •
              </Typography>
              <Link
                component={RouterLink}
                to="/politica-de-privacidade"
                variant="caption"
                color="text.secondary"
                underline="hover"
              >
                Política de Privacidade
              </Link>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Slide>
  );
}

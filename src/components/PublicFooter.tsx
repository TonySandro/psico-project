import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Stack, Typography, Button, Divider } from '@mui/material';
import { HeartPulse } from 'lucide-react';

const institutionalLinks = [
  { label: 'Plataforma', path: '/plataforma' },
  { label: 'Quem Somos', path: '/quem-somos' },
  { label: 'Política de Privacidade', path: '/politica-de-privacidade' },
  { label: 'Termos de Uso', path: '/termos-de-uso' },
  { label: 'Política de Cookies', path: '/politica-de-cookies' },
];

const resourceLinks = [
  { label: 'Gestão de Pacientes', path: '/recursos/pacientes' },
  { label: 'Prontuário Digital', path: '/recursos/prontuario' },
  { label: 'Anamnese Online', path: '/recursos/anamnese' },
  { label: 'Testes Psicopedagógicos', path: '/recursos/testes' },
  { label: 'Relatórios', path: '/recursos/relatorios' },
];

export default function PublicFooter() {
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'grey.900', color: 'white', pt: 8, pb: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Brand column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2, cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '8px',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <HeartPulse size={20} color="white" />
              </Box>
              <Typography variant="h6" fontWeight={700}>NPPAvalia</Typography>
            </Stack>
            <Typography variant="body2" sx={{ opacity: 0.7, lineHeight: 1.7, mb: 2, maxWidth: 320 }}>
              Plataforma de apoio à rotina clínica de psicopedagogos e neuropsicopedagogos.
              Organização de pacientes, anamneses, testes e relatórios em um só lugar.
            </Typography>
            <Typography variant="caption" sx={{ color: 'success.light', display: 'block' }}>
              ✓ Ambiente profissional em conformidade com a LGPD.
            </Typography>
          </Grid>

          {/* Institutional links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.5, fontSize: '0.7rem' }}>
              Institucional
            </Typography>
            <Stack spacing={0.5}>
              {institutionalLinks.map((link) => (
                <Button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  sx={{ color: 'grey.400', justifyContent: 'flex-start', p: 0, textTransform: 'none', fontWeight: 400, fontSize: '0.875rem', '&:hover': { color: 'white' }, minWidth: 0 }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          </Grid>

          {/* Resources links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.5, fontSize: '0.7rem' }}>
              Recursos
            </Typography>
            <Stack spacing={0.5}>
              {resourceLinks.map((link) => (
                <Button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  sx={{ color: 'grey.400', justifyContent: 'flex-start', p: 0, textTransform: 'none', fontWeight: 400, fontSize: '0.875rem', '&:hover': { color: 'white' }, minWidth: 0 }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.5, fontSize: '0.7rem' }}>
                Contato & Suporte
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                suporte@nppavalia.com.br
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mt: 6, mb: 3 }} />
        <Typography variant="body2" sx={{ opacity: 0.4, textAlign: 'center' }}>
          © {new Date().getFullYear()} NPPAvalia. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
}

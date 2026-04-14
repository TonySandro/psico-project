import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  TextField,
  IconButton,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { Copy, MessageCircle, Mail, CheckCircle2 } from 'lucide-react';
import { useGenerateAnamnesisLink } from '@/hooks/useAnamnesis';
import { formatDate } from '@/utils/formatters';

interface AnamnesisLinkModalProps {
  open: boolean;
  onClose: () => void;
  patientId: string;
}

export default function AnamnesisLinkModal({ open, onClose, patientId }: AnamnesisLinkModalProps) {
  const { mutate: generateLink, isPending, error, data } = useGenerateAnamnesisLink();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setCopied(false);
      generateLink(patientId);
    }
  }, [open, patientId, generateLink]);

  const handleCopy = () => {
    if (fullUrl) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fullUrl = data?.token ? `${window.location.origin}/anamnese/responder/${data.token}` : '';

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Olá! Segue o link para preencher a anamnese: ${fullUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent('Link de Anamnese');
    const body = encodeURIComponent(`Olá!\n\nSegue o link para preencher a anamnese:\n${fullUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <Dialog open={open} onClose={isPending ? undefined : onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Link de Anamnese</DialogTitle>
      <DialogContent>
        {isPending && (
          <Box className="flex flex-col items-center justify-center py-8">
            <CircularProgress size={32} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Gerando link...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Erro ao gerar o link. Tente novamente ou verifique se o modelo já está pronto no sistema.
          </Alert>
        )}

        {data && !isPending && (
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Este link pode ser enviado ao responsável para responder a anamnese. Ele não requer login para ser acessado.
            </Typography>

            <Box>
              <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                STATUS
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: data.status === 'ANSWERED' ? 'success.main' : 'warning.main'
                  }}
                />
                <Typography variant="body2" fontWeight={600}>
                  {data.status === 'ANSWERED' ? 'Respondida' : 'Pendente'}
                </Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                EXPIRA EM
              </Typography>
              <Typography variant="body2">
                {formatDate(data.expiresAt)}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                size="small"
                value={fullUrl}
                slotProps={{
                  input: {
                    readOnly: true,
                  }
                }}
              />
              <IconButton 
                color={copied ? "success" : "primary"} 
                onClick={handleCopy}
                title="Copiar Link"
                sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}
              >
                {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
              </IconButton>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<MessageCircle size={18} />}
                onClick={handleWhatsApp}
                fullWidth
                sx={{ 
                  color: '#25D366', 
                  borderColor: '#25D366',
                  '&:hover': {
                    borderColor: '#128C7E',
                    bgcolor: 'rgba(37, 211, 102, 0.04)'
                  }
                }}
              >
                WhatsApp
              </Button>
              <Button
                variant="outlined"
                startIcon={<Mail size={18} />}
                onClick={handleEmail}
                fullWidth
              >
                E-mail
              </Button>
            </Stack>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          {data ? 'Fechar' : 'Cancelar'}
        </Button>
        {data && (
          <Button 
            variant="contained" 
            onClick={() => window.open(fullUrl, '_blank')}
          >
            Abrir link
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { CheckCircle2, Copy, Mail, MessageCircle } from 'lucide-react';
import { useGenerateTeacherReportLink, useTeacherReportTemplates } from '@/hooks/useTeacherReport';
import { formatDate } from '@/utils/formatters';

interface TeacherReportLinkModalProps {
  open: boolean;
  onClose: () => void;
  patientId: string;
}

export default function TeacherReportLinkModal({ open, onClose, patientId }: TeacherReportLinkModalProps) {
  const { data: templates, isLoading: isLoadingTemplates } = useTeacherReportTemplates();
  const { mutate: generateLink, isPending, error, data, reset } = useGenerateTeacherReportLink();

  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [copied, setCopied] = useState(false);

  const firstTemplateId = templates?.[0]?.id ?? '';
  const activeTemplateName = useMemo(
    () => templates?.find((template) => template.id === selectedTemplateId)?.name || templates?.[0]?.name || '',
    [selectedTemplateId, templates],
  );

  useEffect(() => {
    if (open) {
      setCopied(false);
      reset();
      setSelectedTemplateId(firstTemplateId);
    }
  }, [firstTemplateId, open, reset]);

  const fullUrl = data?.link || (data?.token ? `${window.location.origin}/teacher-report/responder/${data.token}` : '');

  const handleGenerate = () => {
    generateLink({
      patientId,
      templateId: selectedTemplateId || undefined,
    });
  };

  const handleCopy = () => {
    if (fullUrl) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Olá! Segue o link para preencher o relatório do professor: ${fullUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent('Link do Relatório do Professor');
    const body = encodeURIComponent(`Olá!\n\nSegue o link para preencher o relatório do professor:\n${fullUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <Dialog open={open} onClose={isPending ? undefined : onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Link do Relatório do Professor</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Este link pode ser enviado ao professor para responder o relatório sem precisar acessar o sistema.
          </Typography>

          {isLoadingTemplates ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : templates?.length ? (
            <FormControl fullWidth size="small">
              <InputLabel>Modelo</InputLabel>
              <Select
                value={selectedTemplateId}
                label="Modelo"
                onChange={(event) => setSelectedTemplateId(event.target.value)}
                disabled={isPending}
              >
                {templates.map((template) => (
                  <MenuItem key={template.id} value={template.id}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Alert severity="warning">
              Cadastre um modelo de relatório do professor antes de gerar o link público.
            </Alert>
          )}

          {error && (
            <Alert severity="error">
              Erro ao gerar o link. Tente novamente ou verifique se o modelo já está pronto no sistema.
            </Alert>
          )}

          {data && !isPending && (
            <>
              <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2, border: '1px solid', borderColor: 'primary.100' }}>
                <Typography variant="caption" fontWeight={700} color="primary.main" sx={{ mb: 0.5, display: 'block' }}>
                  MODELO DO LINK
                </Typography>
                <Typography variant="body2" fontWeight={600} color="primary.dark">
                  {activeTemplateName || 'Modelo selecionado'}
                </Typography>
              </Box>

              {data.expiresAt && (
                <Box>
                  <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    EXPIRA EM
                  </Typography>
                  <Typography variant="body2">{formatDate(data.expiresAt)}</Typography>
                </Box>
              )}

              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  size="small"
                  value={fullUrl}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
                <IconButton
                  color={copied ? 'success' : 'primary'}
                  onClick={handleCopy}
                  title="Copiar link"
                  sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}
                >
                  {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                </IconButton>
              </Stack>

              <Stack direction="row" spacing={2}>
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
                      bgcolor: 'rgba(37, 211, 102, 0.04)',
                    },
                  }}
                >
                  WhatsApp
                </Button>
                <Button variant="outlined" startIcon={<Mail size={18} />} onClick={handleEmail} fullWidth>
                  E-mail
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          {data ? 'Fechar' : 'Cancelar'}
        </Button>
        {data ? (
          <Button variant="contained" onClick={() => window.open(fullUrl, '_blank')}>
            Abrir link
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={isPending || !templates?.length}
            startIcon={isPending ? <CircularProgress size={16} color="inherit" /> : undefined}
          >
            {isPending ? 'Gerando...' : 'Gerar link'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
